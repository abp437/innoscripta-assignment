export interface Source {
  name: string;
  id: string | null;
}

interface ArticleInterface {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: string | Source;
  publicationDisplayDate: string;
  publicationDate: string;
  subSource?: string;
}

export default ArticleInterface;
