import { NavLink } from "react-router-dom";

function SubHeader() {
  return (
    <nav className="bg-white border-b-1 p-4">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "border-b-1" : "hover:border-b-1")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/newsfeed" className={({ isActive }) => (isActive ? "border-b-1" : "hover:border-b-1")}>
            News Feed
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles" className={({ isActive }) => (isActive ? "border-b-1" : "hover:border-b-1")}>
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => (isActive ? "border-b-1" : "hover:border-b-1")}>
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
