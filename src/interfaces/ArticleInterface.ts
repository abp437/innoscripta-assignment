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
  publicationDate: string;
  publicationTime: string;
  subSource?: string;
}

export default ArticleInterface;
