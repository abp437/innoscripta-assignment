import ArticleInterface from "../interfaces/ArticleInterface";

export const sortSearchResults = (order: string, searchResults: ArticleInterface[]) => {
  let sortedArticles: ArticleInterface[] = [...searchResults];

  if (order === "desc") {
    // Sort articles by publicationTime in descending order (latest first)
    sortedArticles = sortedArticles.sort((a, b) => {
      return new Date(b.publicationTime).getTime() - new Date(a.publicationTime).getTime();
    });
  } else if (order === "asc") {
    // Sort articles by publicationTime in ascending order (oldest first)
    sortedArticles = sortedArticles.sort((a, b) => {
      return new Date(a.publicationTime).getTime() - new Date(b.publicationTime).getTime();
    });
  }

  return sortedArticles;
};
