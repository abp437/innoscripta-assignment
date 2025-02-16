import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticlesList from "./components/ArticlesList";
import Preferences from "./components/Preferences";
import HeroGrid from "./components/HeroGrid";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <SearchBar />
        {/* <Filter />
        <SearchResults /> */}
        <HeroGrid />
        {/* <ArticlesList /> */}
        <Preferences />
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
