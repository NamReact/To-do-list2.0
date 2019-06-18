import React, { useState } from "react";
import { DashboardContext } from "../../pages/Dashboard/index";
import "./index.css";

const NavBarBlock = props => {
  const [selector, setSelector] = useState(false);
  const [yPosition, setPosition] = useState(0);
  return (
    <DashboardContext.Consumer>
      {context => (
        <div
          className="navbar-block-container"
          onMouseEnter={() => {
            setSelector(true);
            setPosition(
              document.getElementById(props.id).getBoundingClientRect().y
            );
          }}
          onMouseLeave={() => setSelector(false)}
          id={props.id}
          onClick={e => context.setState({ selectedBlock: e.currentTarget.id })}
        >
          {selector ? (
            context.state.selectedBlock !== props.id ? (
              <div className="navbar-hover-bar" />
            ) : (
              false
            )
          ) : (
            false
          )}
          {selector && (
            <div
              className="navbar-hover-bubble"
              style={{ top: yPosition + 23 }}
            >
              <div className="navbar-hover-bubble-arrow" />
              {props.id}
            </div>
          )}

          {context.state.selectedBlock === props.id && (
            <div className="navbar-selector-bar" />
          )}
          <div className="navbar-block">{props.id.charAt(0)}</div>
        </div>
      )}
    </DashboardContext.Consumer>
  );
};

export default NavBarBlock;
