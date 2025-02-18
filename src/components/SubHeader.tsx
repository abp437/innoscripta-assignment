import { NavLink } from "react-router-dom";

function SubHeader() {
  return (
    <nav className="bg-white border-b-1 p-4">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-600" : "hover:border-b-2 hover:border-red-600"
            }
          >
            News Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-600" : "hover:border-b-2 hover:border-red-600"
            }
          >
            Trending
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-600" : "hover:border-b-2 hover:border-red-600"
            }
          >
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
