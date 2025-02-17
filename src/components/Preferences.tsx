import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPreferences, hidePreferences } from "../app/preferencesSlice";
import Overlay from "./Overlay";
import CategoriesStep from "./CategoriesStep";
import SourcesStep from "./SourcesStep";
import HighlightText from "./HighlightText";
import CloseIcon from "./icons/CloseIcon";

interface Preferences {
  categories: string[];
  sources: string[];
}

const Preferences: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: any) => state.preferences.isVisible);
  const getPreferencesFromLocal = () => localStorage.getItem("user-preferences");
  const setPreferencesInLocal = (preferences) => localStorage.setItem("user-preferences", JSON.stringify(preferences));

  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const savedPreferences = getPreferencesFromLocal();
    if (!savedPreferences) {
      dispatch(showPreferences());
    }
  }, []);

  useEffect(() => {
    const savedPreferences = getPreferencesFromLocal();
    const savedCategories = savedPreferences ? JSON.parse(savedPreferences).categories : [];
    const savedSources = savedPreferences ? JSON.parse(savedPreferences).sources : [];

    setCategories(savedCategories);
    setSources(savedSources);
  }, [isVisible]);

  const saveToLocalStorage = (categories, sources) => {
    setPreferencesInLocal({ categories, sources });
  };

  const handleSkip = () => {
    const allCategories = ["general", "business", "technology", "sports", "health"];
    const allSources = ["NY Times", "Guardian", "News"];

    saveToLocalStorage(allCategories, allSources);
    dispatch(hidePreferences());
  };

  const handleSubmit = () => {
    setCategories(categories);
    setSources(sources);
    saveToLocalStorage(categories, sources);
    dispatch(hidePreferences());
    location.reload();
  };

  const handleClose = () => {
    dispatch(hidePreferences());
  };

  if (!isVisible) return null;

  return (
    <Overlay>
      <div className="relative px-8 py-4">
        <h2 className="text-2xl lora-bold mb-8">
          <HighlightText>Set Preferences</HighlightText>
        </h2>
        {getPreferencesFromLocal() ? (
          <button className="absolute top-4 right-4 max-w-6 cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </button>
        ) : (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-700 focus:outline-none"
          >
            Skip
          </button>
        )}
        <CategoriesStep categories={categories} setCategories={setCategories} />
        <SourcesStep sources={sources} setSources={setSources} onSubmit={handleSubmit} />
      </div>
    </Overlay>
  );
};

export default Preferences;
