import ArticleInterface from "../interfaces/ArticleInterface";

export const convertNewsOrgResponse = (article: any): ArticleInterface => ({
  title: article.title,
  description: article.description || "No description available",
  url: article.url,
  urlToImage: article.urlToImage || null,
  source: "News Org",
});

export const convertNYTimesResponse = (doc: any): ArticleInterface => ({
  title: doc?.headlines?.main || doc?.title || doc?.snippet || "New York Times Title",
  description: doc?.lead_paragraph || doc?.abstract || "New York Times Description",
  url: doc.web_url || doc?.url || "https://nytimes.com",
  urlToImage: doc?.multimedia?.[2]?.url
    ? doc.multimedia[2].url.startsWith("https")
      ? doc.multimedia[2].url
      : `https://static01.nyt.com/${doc.multimedia[0].url}`
    : null,
  source: "The New York Times",
});

export const convertGuardianResponse = (doc: any): ArticleInterface => ({
  title: doc.webTitle,
  description: `${doc.sectionName} - ${doc.webTitle}`,
  url: doc.webUrl,
  urlToImage: doc?.fields?.thumbnail || null,
  source: "The Guardian",
});
