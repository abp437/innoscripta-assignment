import ArticleInterface from "../interfaces/ArticleInterface";
import { getpublicationTime } from "./date";
import { NYT, GUARDIAN } from "./constants";
import { capitalizeFirstLetter } from "./string";

export const convertNewsOrgResponse = (article: any): ArticleInterface => ({
  title: article.title,
  description: article.description || "No description available",
  url: article.url,
  urlToImage: article.urlToImage || null,
  publicationDate: getpublicationTime(article.publishedAt),
  publicationTime: article.publishedAt,
  category: capitalizeFirstLetter(article.category),
  source: article.source.name,
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
  publicationDate: getpublicationTime(doc.published_date),
  publicationTime: doc.published_date,
  category: capitalizeFirstLetter(doc.subsection),
  source: NYT,
});

export const convertGuardianResponse = (article: any): ArticleInterface => ({
  title: article.webTitle,
  description: `${article.sectionName} - ${article.webTitle}`,
  url: article.webUrl,
  urlToImage: article?.fields?.thumbnail || null,
  publicationDate: getpublicationTime(article.webPublicationDate),
  publicationTime: article.webPublicationDate,
  category: article.sectionName,
  source: GUARDIAN,
});
