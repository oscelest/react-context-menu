import React, {useRef} from "react";
import {Rect} from "@noxy/geometry";
import ContextMenuDirection from "../enums/ContextMenuDirection";
import {ContextMenuItem} from "../interfaces";
import Utility from "../modules/Utility";

function ContextMenuList(props: ContextMenuListProps) {
  const {list, direction, parent, container, style = {}, ...component_method_props} = props;
  const {onClick, ...component_props} = component_method_props;
  if (!list?.length) return null;

  const ref_element = useRef<HTMLDivElement>(null);
  const {point, direction: next_direction} = Utility.getPointAndDirection(direction, ref_element.current, parent, container);

  style.left = `${point.x}px`;
  style.top = `${point.y}px`;


  return (
    <div {...component_props} ref={ref_element} className={"context-menu-list"} style={style}>
      {list.map(renderContextMenuItem)}
    </div>
  );

  function renderContextMenuItem(item: ContextMenuItem, index: number = 0) {
    const next_parent = Utility.getParentRect(parent, point, index, ref_element.current);
    const left_arrow = item.item_list?.length && (next_direction === ContextMenuDirection.BOTTOM_LEFT || next_direction === ContextMenuDirection.TOP_LEFT);

    return (
      <div key={index} className={"context-menu-item"} data-clickable={!!item.callback} onClick={onContextMenuItemClick}>

        {!!left_arrow && <div className={"context-menu-item-arrow"}>-</div>}
        <div className={"context-menu-item-content"}>{item.content}</div>
        {!left_arrow && <div className={"context-menu-item-arrow"}>-</div>}
        {!!item.item_list?.length &&  <ContextMenuList list={item.item_list} parent={next_parent} container={container} direction={next_direction} onClick={onClick}/>}
      </div>
    );

    function onContextMenuItemClick(event: React.MouseEvent<HTMLDivElement>) {
      if (!item.callback) {
        event.stopPropagation();
        event.preventDefault();
      }

      event.stopPropagation();
      item.callback?.(event);
      if (!event.defaultPrevented) onClick(event);
    }
  }
}

export interface ContextMenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: ContextMenuDirection;
  container: Rect;
  parent: Rect;
  list?: ContextMenuItem[];

  onClick(event: React.MouseEvent<HTMLDivElement>): void;
}

export default ContextMenuList;
