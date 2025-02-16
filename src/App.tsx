import { Provider } from "react-redux";
import { store } from "./app/store";
import NewsHeader from "./components/NewsHeader";
import ArticlesList from "./components/ArticlesList";
import Preferences from "./components/Preferences";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <NewsHeader />
        <main>
          <ArticlesList />
          <Preferences />
        </main>
      </div>
    </Provider>
  );
}

export default App;
