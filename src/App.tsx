import { Provider } from "react-redux";
import { store } from "./app/store";
import { NewsHeader } from "./components/NewsHeader";
import { ArticlesList } from "./components/ArticlesList";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <NewsHeader />
        <main>
          <ArticlesList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
