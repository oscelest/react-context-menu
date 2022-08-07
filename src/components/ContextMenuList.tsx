import React, {useRef} from "react";
import {Rect, Point} from "@noxy/geometry";
import ContextMenuDirection from "../enums/ContextMenuDirection";
import {ContextMenuItem} from "./ContextMenu";

function ContextMenuList(props: ContextMenuListProps) {
  const {list, direction, parent, container, style = {}, ...component_method_props} = props;
  const {onClick, ...component_props} = component_method_props;
  if (!list?.length) return null;

  const ref_element = useRef<HTMLDivElement>(null);

  const current = ref_element.current ? Rect.fromSimpleRect(ref_element.current.getBoundingClientRect()) : new Rect(0, 0, 0, 0);

  const {point, direction: next_direction} = getPointAndDirection(direction, current, parent, container);
  const next_parent = new Rect(ref_element.current?.offsetWidth ?? 0, 0, 0, 0);

  style.left = `${point.x}px`;
  style.top = `${point.y}px`;

  return (
    <div {...component_props} ref={ref_element} style={style} className={"context-menu-list"}>
      {list.map(renderContextMenuItem)}
    </div>
  );

  function renderContextMenuItem(item: ContextMenuItem, index: number = 0) {

    return (
      <div key={index} className={"context-menu-item"} onClick={onContextMenuItemClick}>
        <div className={"context-menu-item-arrow"}>-</div>
        <ContextMenuList list={item.item_list} parent={next_parent} container={container} direction={next_direction} onClick={onClick}/>
        <div>{item.content}</div>
      </div>
    );

    function onContextMenuItemClick(event: React.MouseEvent<HTMLDivElement>) {
      event.stopPropagation();
      item.callback(event);
      onClick(event);
    }
  }
}

function getParentRect() {

}

function getPointAndDirection(direction: ContextMenuDirection, current: Rect, parent: Rect, container: Rect): {point: Point; direction: ContextMenuDirection} {
  const point = new Point(0, 0);

  if (direction === ContextMenuDirection.BOTTOM_RIGHT || direction === ContextMenuDirection.TOP_RIGHT) {
    if (parent.x + parent.width + current.width < container.width) {
      point.x = parent.x + parent.width;
    }
    else if (parent.x - current.width > 0) {
      point.x = parent.x - current.width;
      direction = direction === ContextMenuDirection.BOTTOM_RIGHT ? ContextMenuDirection.BOTTOM_LEFT : ContextMenuDirection.TOP_LEFT;
    }
    else {
      point.x = container.width;
    }
  }
  else {
    if (parent.x - current.width > 0) {
      point.x = parent.x - current.width;
    }
    else if (parent.x + parent.width + current.width < container.width) {
      point.x = parent.x + parent.width;
      direction = direction === ContextMenuDirection.BOTTOM_LEFT ? ContextMenuDirection.BOTTOM_RIGHT : ContextMenuDirection.TOP_RIGHT;
    }
    else {
      point.x = 0;
    }
  }

  if (direction === ContextMenuDirection.BOTTOM_RIGHT || direction === ContextMenuDirection.BOTTOM_LEFT) {
    if (parent.y + parent.height + current.height < container.height) {
      point.y = parent.y + parent.height;
    }
    else if (parent.y - current.height > 0) {
      point.y = parent.y - current.height;
      direction = direction === ContextMenuDirection.BOTTOM_LEFT ? ContextMenuDirection.TOP_LEFT : ContextMenuDirection.TOP_RIGHT;
    }
    else {
      point.y = container.height;
    }
  }
  else {
    if (parent.y - current.height > 0) {
      point.y = parent.y - current.height;
    }
    else if (parent.y + parent.height + current.height < container.height) {
      point.y = parent.y + parent.height;
      direction = direction === ContextMenuDirection.TOP_LEFT ? ContextMenuDirection.BOTTOM_LEFT : ContextMenuDirection.BOTTOM_RIGHT;
    }
    else {
      point.y = 0;
    }
  }

  return {direction, point};
}

export interface ContextMenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: ContextMenuDirection;
  container: Rect;
  parent: Rect;
  list?: ContextMenuItem[];

  onClick(event: React.MouseEvent<HTMLDivElement>): void;
}

export default ContextMenuList;
