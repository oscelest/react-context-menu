import {Rect, Point} from "@noxy/geometry";
import ContextMenuDirection from "../enums/ContextMenuDirection";

module Utility {

  export function getParentRect(parent: Rect, point: Point, index: number, element?: Element | null) {
    const child = element?.children.item(index);
    if (!element || !child) return new Rect(0, 0, 0, 0);
    const element_rect = element.getBoundingClientRect();
    const child_rect = child.getBoundingClientRect();

    const offset_x = child_rect.x - element_rect.x;
    const offset_y = child_rect.x - element_rect.x;

    return new Rect(
      parent.x + point.x,
      parent.y + point.y,
      child_rect.width + offset_x,
      child_rect.height + offset_y
    );
  }

  export function getPointAndDirection(direction: ContextMenuDirection, current: HTMLElement | null, parent: Rect, container: Rect): {point: Point; direction: ContextMenuDirection} {
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

}

export default Utility;
