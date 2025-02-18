import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/navigations/Header";
import SubHeader from "./components/navigations/SubHeader";
import Footer from "./components/navigations/Footer";
import Preferences from "./components/Preferences";
import NewsFeedPage from "./components/pages/NewsFeedPage";
import TrendingPage from "./components/pages/TrendingPage";
import SearchPage from "./components/pages/SearchPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <SubHeader />
        <main className="min-h-screen bg-gray-50 pt-6">
          <Routes>
            <Route path="/" element={<NewsFeedPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <Preferences />
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
