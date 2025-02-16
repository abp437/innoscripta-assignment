import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticlesList from "./components/ArticlesList";
import Preferences from "./components/Preferences";
import HeroGrid from "./components/HeroGrid";
import NewsFeed from "./components/NewsFeed";
import Category from "./components/Category";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-6">
        <SearchBar />
        {/* <Filter />
        <SearchResults /> */}
        <HeroGrid />
        <Category />
        {/* <NewsFeed /> */}
        {/* <ArticlesList /> */}
        <Preferences />
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
