import React, { useContext } from "react";
import "./index.css";
import { DashboardContext } from "../../pages/Dashboard";

const NavItem = props => {
  const context = useContext(DashboardContext);
  return (
    <div
      id={props.id}
      className="navitem"
      onClick={e => context.setState({ selectedNavItem: e.currentTarget.id })}
      style={
        context.state.selectedNavItem === props.id
          ? { backgroundColor: "var(--dark-grey", color: "white" }
          : null
      }
    >
      {props.id}
    </div>
  );
};

export default NavItem;
