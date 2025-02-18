import ArticleInterface from "../interfaces/ArticleInterface";

// Fisher-Yates Shuffle function to randomize the array
export const shuffleArray = (array: ArticleInterface[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
