import Style from "./ContextMenu.module.css";
import React, {useState, useRef} from "react";
import {Point, Rect} from "@noxy/geometry";
import ContextMenuDirection from "../enums/ContextMenuDirection";
import ContextMenuList from "./ContextMenuList";

function ContextMenu(props: ContextMenuProps) {
  const {className, items, direction = ContextMenuDirection.BOTTOM_RIGHT, ...component_method_props} = props;
  const {...component_props} = component_method_props;

  const [point, setPoint] = useState<Point>();
  const ref_element = useRef<HTMLDivElement>(null);

  const parent = getParentRect(point);
  const container = getContainerRect(ref_element.current);

  const style = {left: `${point?.x ?? 0}px`, top: `${point?.y ?? 0}px`}
  const classes = [Style.Component, "context-menu"];
  if (className) classes.push(className);

  return (
    <div {...component_props} ref={ref_element} className={classes.join(" ")} onContextMenu={onComponentContextMenu}>
      <div className={"context-menu-window"} style={style}>
        <ContextMenuList direction={direction} list={items} container={container} parent={parent} onClick={hideContextMenu}/>
      </div>
      <div className={"context-menu-content"}>
        {props.children}
      </div>
    </div>
  );

  function onComponentContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (!items?.length) return;

    const {scrollLeft, scrollTop, clientLeft, clientTop} = event.target as Element;
    const {top, left} = event.currentTarget.getBoundingClientRect();
    setPoint(new Point(event.pageX - left - clientLeft + scrollLeft, event.pageY - top - clientTop + scrollTop));
    event.preventDefault();

    window.addEventListener("click", hideContextMenu);
    window.addEventListener("blur", hideContextMenu);
  }

  function hideContextMenu() {
    setPoint(undefined);
    window.removeEventListener("click", hideContextMenu);
    window.removeEventListener("blur", hideContextMenu);
  }
}

function getParentRect(point?: Point) {
  return point ? new Rect(point.x, point.y, 0, 0) : new Rect(0, 0, 0, 0);
}

function getContainerRect(container?: Element | null) {
  if (!container) return new Rect(0, 0, 0, 0);

  const {width, height} = container.getBoundingClientRect();
  const {clientLeft, clientTop} = container;
  return new Rect(0, 0, width - clientLeft * 2, height - clientTop * 2);
}

type ContextMenuBaseProps = Omit<React.HTMLAttributes<HTMLDivElement>, OmittedContextMenuBaseProps>;
type OmittedContextMenuBaseProps = "style"

export interface ContextMenuProps extends ContextMenuBaseProps {
  direction?: ContextMenuDirection;
  items?: ContextMenuItem[];
}

export interface ContextMenuItem {
  content: React.ReactNode;
  callback: (event: React.MouseEvent<HTMLDivElement>) => void;
  item_list?: ContextMenuItem[];
}


export default ContextMenu;
