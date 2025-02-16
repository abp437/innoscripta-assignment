import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showPreferences } from "../app/preferencesSlice";

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
