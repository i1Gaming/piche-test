type Namespace = {
    id: number;
    text: string;
};
  
type Titles = {
    canonical: string;
    normalized: string;
    display: string;
};
  
type Image = {
    source: string;
    width: number;
    height: number;
};
  
type ContentUrls = {
    desktop: {
        page: string;
        revisions: string;
        edit: string;
        talk: string;
    };
    mobile: {
        page: string;
        revisions: string;
        edit: string;
        talk: string;
    };
};
  
type Coordinates = {
    lat: number;
    lon: number;
};
  
type Page = {
    type: string;
    title: string;
    displaytitle: string;
    namespace: Namespace;
    wikibase_item: string;
    titles: Titles;
    pageid: number;
    thumbnail?: Image;
    originalimage?: Image;
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: string;
    description: string;
    description_source: string;
    content_urls: ContentUrls;
    extract: string;
    extract_html: string;
    normalizedtitle: string;
    coordinates?: Coordinates;
  };
  
type SelectedItem = {
    text: string;
    pages: Page[];
    year: number;
};
  
export type ApiResponse = {
    selected: SelectedItem[];
};

export type ListItem = {
    title: string,
    year: number
}