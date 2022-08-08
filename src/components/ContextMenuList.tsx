import React, {useRef} from "react";
import {Rect, Point} from "@noxy/geometry";
import ContextMenuDirection from "../enums/ContextMenuDirection";
import {ContextMenuItem} from "./ContextMenu";

function ContextMenuList(props: ContextMenuListProps) {
  const {list, direction, parent, container, style = {}, ...component_method_props} = props;
  const {onClick, ...component_props} = component_method_props;
  if (!list?.length) return null;

  const ref_element = useRef<HTMLDivElement>(null);
  const {point, direction: next_direction} = getPointAndDirection(direction, ref_element.current, parent, container);

  style.left = `${point.x}px`;
  style.top = `${point.y}px`;

  return (
    <div {...component_props} ref={ref_element} className={"context-menu-list"} style={style}>
      {list.map(renderContextMenuItem)}
    </div>
  );

  function renderContextMenuItem(item: ContextMenuItem, index: number = 0) {
    const next_parent = getParentRect(parent, point, index, ref_element.current);
    console.log(next_parent);

    return (
      <div key={index} className={"context-menu-item"} onClick={onContextMenuItemClick}>
        <div className={"context-menu-item-arrow"}>-</div>
        <ContextMenuList list={item.item_list} parent={next_parent} container={container} direction={next_direction} onClick={onClick} />
        <div className={"context-menu-item-content"}>{item.content}</div>
      </div>
    );

    function onContextMenuItemClick(event: React.MouseEvent<HTMLDivElement>) {
      event.stopPropagation();
      item.callback(event);
      onClick(event);
    }
  }
}

function getParentRect(parent: Rect, point: Point, index: number, element?: Element | null) {
  const child = element?.children.item(index);
  if (!element || !child) return new Rect(0, 0, 0, 0);
  const element_rect = element.getBoundingClientRect()
  const child_rect = child.getBoundingClientRect();

  console.dir(element)
  console.log(child_rect.x - element_rect.x);
  const offset_x = child_rect.x - element_rect.x
  const offset_y = child_rect.x - element_rect.x

  return new Rect(
    parent.x + point.x,
    parent.y + point.y,
    child_rect.width + offset_x,
    child_rect.height + offset_y
  );
}

function getPointAndDirection(direction: ContextMenuDirection, current: HTMLElement | null, parent: Rect, container: Rect): {point: Point; direction: ContextMenuDirection} {
  const point = new Point(0, 0);
  if (!current) return {direction, point};
  const {offsetWidth: width, offsetHeight: height} = current;

  if (direction === ContextMenuDirection.BOTTOM_RIGHT || direction === ContextMenuDirection.TOP_RIGHT) {
    if (parent.x + parent.width + width < container.width) {
      point.x = parent.width;
    }
    else if (parent.x - width > 0) {
      point.x = -width;
      direction = direction === ContextMenuDirection.BOTTOM_RIGHT ? ContextMenuDirection.BOTTOM_LEFT : ContextMenuDirection.TOP_LEFT;
    }
    else {
      point.x = container.width - width;
    }
  }
  else {
    if (parent.x - width > 0) {
      point.x = -width;
    }
    else if (parent.x + parent.width + width < container.width) {
      point.x = parent.width;
      direction = direction === ContextMenuDirection.BOTTOM_LEFT ? ContextMenuDirection.BOTTOM_RIGHT : ContextMenuDirection.TOP_RIGHT;
    }
    else {
      point.x = 0;
    }
  }

  if (direction === ContextMenuDirection.BOTTOM_RIGHT || direction === ContextMenuDirection.BOTTOM_LEFT) {
    if (parent.y + height < container.height) {
      point.y = -current.clientTop;
    }
    else if (parent.y + parent.height - height > 0) {
      point.y = parent.height - height;
      direction = direction === ContextMenuDirection.BOTTOM_LEFT ? ContextMenuDirection.TOP_LEFT : ContextMenuDirection.TOP_RIGHT;
    }
    else {
      // TODO: Should be bottom edge relative to current position
      point.y = parent.y;
    }
  }
  else {
    if (parent.y + parent.height - height > 0) {
      point.y = parent.height - height;
    }
    else if (parent.y + height < container.height) {
      point.y = -current.clientTop;
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
