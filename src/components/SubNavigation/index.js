import React, { useContext } from "react";
import "./index.css";
import { DashboardContext } from "../../pages/Dashboard";

const SubNavigation = props => {
  const context = useContext(DashboardContext);
  return (
    <div className="subnavigation-container">
      <h4>{context.state.selectedBlock}</h4>
      <div className="subnavigation-separator" />
      {props.children}
    </div>
  );
};

export default SubNavigation;
