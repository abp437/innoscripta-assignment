import ArticleInterface from "../interfaces/ArticleInterface";

export const sortSearchResults = (order: string, searchResults: ArticleInterface[]) => {
  let sortedArticles: ArticleInterface[] = [...searchResults];

  if (order === "desc") {
    // Sort articles by publicationDate in descending order (latest first)
    sortedArticles = sortedArticles.sort((a, b) => {
      return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
    });
  } else if (order === "asc") {
    // Sort articles by publicationDate in ascending order (oldest first)
    sortedArticles = sortedArticles.sort((a, b) => {
      return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
    });
  }

  return sortedArticles;
};
