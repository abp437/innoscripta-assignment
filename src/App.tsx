import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import SubHeader from "./components/SubHeader";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <SubHeader />
        <main className="min-h-screen bg-gray-50 pt-6">
          <SearchBar />
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route
              path="/trending"
              element={
                <>
                  <HeroGrid />
                  <Category />
                </>
              }
            />
            <Route path="/articles" element={<ArticlesList />} />
            <Route
              path="/search"
              element={
                <>
                  <Filter />
                  <SearchResults />
                </>
              }
            />
          </Routes>
          <Preferences />
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
