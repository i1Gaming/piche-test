import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import 'react-responsive-modal/styles.css';
import { useThisDayWiki } from './hooks/useThisDayWiki';
import Modal from 'react-responsive-modal';


function App() {
  const [getData, setGetData] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoading, error, data } = useThisDayWiki(getData);

  const handleClick = () => {
    setGetData(true);
  };

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (error?.message) {
      openModal();
    }
  }, [error]);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>What happened on this day?</h1>
      </header>
      <main className={styles.main}>
        <button className={styles.btn} onClick={handleClick}>Find out</button>
        {isLoading && 
          <div>
            <span>Loading...</span>
          </div>}
        {error && 
          <Modal open={modalIsOpen} onClose={closeModal}>
            <div className={styles.errorWrapper}>
              <span className={styles.errorTitle}>{error.message}</span>
            </div>
          </Modal>}
        {data && 
          <ul className={styles.list}>
            {data.map((item)=>{
              return (
                <li key={item.title} className={styles.listItem}>
                  <span className={styles.itemYear}>{item.year} - </span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </li>
              )
            })}
          </ul>}
      </main>
    </div>
  );
}

export default App;
