export const getCategoriesFromLocalStorage = (): string[] => {
  try {
    const storedPreferences = localStorage.getItem("user-preferences");
    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      if (preferences.categories && Array.isArray(preferences.categories)) {
        return preferences.categories;
      }
    }
    return [];
  } catch (error) {
    console.error("Error parsing user preferences from localStorage", error);
    return [];
  }
};
