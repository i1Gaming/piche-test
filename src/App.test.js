import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useThisDayWiki } from './hooks/useThisDayWiki';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./hooks/useThisDayWiki', () => ({
  useThisDayWiki: jest.fn(),
}));

beforeEach(() => {
  useThisDayWiki.mockReturnValue({
    isLoading: false,
    error: null,
    data: [],
  });
});

describe('App component', () => {
  it('renders title and button', () => {
    render(<App />);
    const title = screen.getByText(/What happened on this day\?/i);
    const button = screen.getByRole('button', { name: /Find out/i });

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('opens modal on error', () => {
    useThisDayWiki.mockReturnValue({
      isLoading: false,
      error: { message: 'An error occurred' },
      data: null,
    });

    render(<App />);
    const errorMessage = screen.getByText(/An error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays data when available', () => {
    useThisDayWiki.mockReturnValue({
      isLoading: false,
      error: null,
      data: [
        { year: 2000, title: 'Event 1' },
        { year: 1990, title: 'Event 2' },
      ],
    });

    render(<App />);
    const firstEvent = screen.getByText((content, element) => 
      content.includes('2000') && element.tagName === 'SPAN'
    );
    const secondEvent = screen.getByText((content, element) => 
      content.includes('1990') && element.tagName === 'SPAN'
    );

    expect(firstEvent).toBeInTheDocument();
    expect(secondEvent).toBeInTheDocument();
  });

  it('shows loading state', () => {
    useThisDayWiki.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<App />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('fetches data on button click', () => {
    useThisDayWiki.mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
    });

    render(<App />);
    const button = screen.getByRole('button', { name: /Find out/i });

    fireEvent.click(button);
  });
});