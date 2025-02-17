import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showPreferences } from "../app/preferencesSlice";
import SettingsIcon from "./icons/SettingsIcon";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(showPreferences());
  };

  return (
    <header className="bg-white border-b-1">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-6">
        <div className="w-8"></div>
        <h1 className="text-4xl cinzel-bold text-gray-900 uppercase text-center">
          <NavLink to="/">News Aggregator</NavLink>
        </h1>
        <div className="w-8">
          <button className="cursor-pointer" onClick={handleLogoClick}>
            <SettingsIcon width={48} height={48} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
