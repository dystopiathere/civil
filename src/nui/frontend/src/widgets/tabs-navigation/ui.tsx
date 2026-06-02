import { NavLink } from "react-router-dom";
import cn from "classnames";
import "./styles.scss";

type TabsNavigationProps = {
  pages: {
    name: string;
    path: string;
  }[];
};

export function TabsNavigation({ pages }: TabsNavigationProps) {
  return (
    <div className="tabs-navigation">
      {pages.map(({ name, path }) => {
        return (
          <NavLink
            className={({ isActive }) => cn("tabs-navigation__element", isActive && `tabs-navigation__element_active`)}
            to={path}
            key={name}
          >
            {name}
          </NavLink>
        );
      })}
    </div>
  );
}
