import React from "react";
import {ContextMenu, ContextMenuGroup} from "../src";
import Style from "./index.module.css";

function IndexPage() {
  
  return (
    <div className={Style.Component}>
      <ContextMenu>
        <>
          <div>
            <span>Option 1</span>
          </div>
          <div>
            <span>Option 2</span>
          </div>
        </>
        <div>
          <span>Option 3</span>
        </div>
        <div>
          <span>Option 4</span>
        </div>
        <ContextMenuGroup label={"Option 5"}>
          <div>
            <span>Option 5.1</span>
          </div>
          <div>
            <span>Option 5.2</span>
          </div>
          <div>
            <span>Option 5.3</span>
          </div>
          <div>
            <span>Option 5.4</span>
          </div>
        </ContextMenuGroup>
        <ContextMenuGroup label={"Option 6"}>
          <ContextMenuGroup label={"Option 6.1"}>
            <div>
              <span>Option 6.1.1</span>
            </div>
            <div>
              <span>Option 6.1.2</span>
            </div>
            <div>
              <span>Option 6.1.3</span>
            </div>
            <div>
              <span>Option 6.1.4</span>
            </div>
          </ContextMenuGroup>
          <div>
            <span>Option 6.2</span>
          </div>
          <div>
            <span>Option 6.3</span>
          </div>
          <div>
            <span>Option 6.4</span>
          </div>
          <div>
            <span>Option 6.5</span>
          </div>
        </ContextMenuGroup>
        <>
          <ContextMenuGroup label={"Option 7"}>
            <div>
              <span>Option 7.1</span>
            </div>
            <div>
              <span>Option 7.2</span>
            </div>
          </ContextMenuGroup>
          <ContextMenuGroup label={"Option 8"}>
            <div>
              <span>Option 8.1</span>
            </div>
            <div>
              <span>Option 8.2</span>
            </div>
          </ContextMenuGroup>
        </>
      </ContextMenu>
    </div>
  );
}

export default IndexPage;
