import { NavLink } from "react-router-dom";

function SubHeader() {
  const inactiveClass = "hover:border-b-2 hover:border-red-600";
  const activeClass = "border-b-2 border-red-600";

  return (
    <nav className="bg-white border-b-1 p-4">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            News Feed
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Trending
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
