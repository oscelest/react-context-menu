import {Point, Rect} from "@noxy/geometry";
import React, {DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {v4} from "uuid";
import Style from "./ContextMenu.module.css";
import {ContextMenuGroup} from "./ContextMenuGroup";

export function ContextMenu(props: ContextMenuProps) {
  const {contained = false, className, style = {}, children, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  
  const [point, setPoint] = useState<Point>(new Point(0, 0));
  const [active, setActive] = useState<boolean>(false);
  
  const ref = useRef<HTMLDivElement>(null);
  const active_ref = useRef<boolean>(active);
  
  active_ref.current = active;
  
  useEffect(
    () => {
      window.addEventListener("click", onWindowClick);
      window.addEventListener("contextmenu", onWindowContextMenu);
      return () => {
        window.removeEventListener("click", onWindowClick);
        window.removeEventListener("contextmenu", onWindowContextMenu);
      };
    },
    []
  );
  
  style.left = point.x;
  style.top = point.y;
  if (!active) {
    style.visibility = "hidden";
    style.pointerEvents = "none";
  }
  
  const classes = [Style.Component];
  if (className) classes.push(className);
  
  return (
    <div {...component_props} ref={ref} className={classes.join(" ")} style={style}>
      {renderChildren(children)}
    </div>
  );
  
  function renderChildren(children: ReactNode): ReactNode {
    if (!children) return null;
    if (typeof children === "boolean" || typeof children === "number" || typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(renderChildren);
    
    const {type, props} = children as ReactElement;
    if (type === ContextMenuGroup) {
      const container = Rect.fromSimpleRect(ref.current?.parentElement?.getBoundingClientRect());
      return (
        <ContextMenuGroup {...props} key={v4()} data-container={container}/>
      );
    }
    else if (type === React.Fragment) {
      return (children as ReactElement).props.children.map(renderChildren);
    }
    
    return children;
  }
  
  function onWindowClick(event: MouseEvent) {
    if (!active_ref.current || event.defaultPrevented) return;
    setActive(false);
  }
  
  function onWindowContextMenu(event: MouseEvent) {
    if (!ref.current || !ref.current.parentElement || !(event.target instanceof Element) || !ref.current.parentElement.contains(event.target)) return;
  
    event.preventDefault();
    const {width, height} = ref.current?.getBoundingClientRect();
    const parent_rect = Rect.fromSimpleRect(ref.current.parentElement.getBoundingClientRect());
  
    const x = parent_rect.containsX(event.pageX + width) ? event.pageX : event.pageX - width;
    const y = parent_rect.containsY(event.pageY + height) ? event.pageY : event.pageY - height;
  
    setPoint(new Point(x, y));
    setActive(true);
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface ContextMenuProps extends HTMLComponentProps {
  contained?: boolean;
}
