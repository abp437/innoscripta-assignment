import { useDispatch } from "react-redux";
import { showPreferences } from "../app/preferencesSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  // Dispatch the showPreferences action when the logo is clicked
  const handleLogoClick = () => {
    dispatch(showPreferences());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-6">
        <div className="w-8"></div>
        <h1 className="text-4xl cinzel-bold text-gray-900 uppercase text-center">News Aggregator</h1>
        <div className="w-8">
          <img
            src="https://cdn-icons-png.flaticon.com/64/1301/1301515.png"
            alt="preferences logo"
            onClick={handleLogoClick}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
