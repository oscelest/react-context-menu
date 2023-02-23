import {Point, Rect} from "@noxy/geometry";
import React, {CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {v4} from "uuid";
import Style from "./ContextMenuGroup.module.css";

export function ContextMenuGroup(props: ContextMenuItemProps) {
  const {label, container, className, children, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  
  const ref_main = useRef<HTMLDivElement>(null);
  const ref_list = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState<Point>(new Point(0, 0));
  
  useEffect(
    () => {
      if (!container || !ref_main.current || !ref_list.current) return;
      const main_rect = ref_main.current.getBoundingClientRect();
      const list_rect = ref_list.current.getBoundingClientRect();
      
      const x = container.containsX(main_rect.right + list_rect.width)
                ? main_rect.right
                : main_rect.left - list_rect.width;
      
      let y = 0;
      if (ref_main.current.parentElement) {
        const {offsetHeight, clientHeight, clientTop} = ref_main.current.parentElement;
        if (container.containsY(main_rect.bottom + list_rect.height)) {
          y = main_rect.top - clientTop;
        }
        else {
          y = main_rect.bottom - list_rect.height + (offsetHeight - clientHeight - clientTop);
        }
      }
      
      setPoint(new Point(x, y));
    },
    [container]
  );
  
  const classes = [Style.Component];
  if (className) classes.push(className);
  
  const list_style = {} as CSSProperties;
  list_style.left = `${point.x}px`;
  list_style.top = `${point.y}px`;
  
  return (
    <div {...component_props} ref={ref_main} className={classes.join(" ")}>
      <div className={"option"}>{label}</div>
      <div className={"list"} ref={ref_list} style={list_style}>
        {renderChildren(children)}
      </div>
    </div>
  );
  
  function renderChildren(children: ReactNode): ReactNode {
    if (!children) return null;
    if (typeof children === "boolean" || typeof children === "number" || typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(renderChildren);
    
    const {type, props} = children as ReactElement;
    if (type === ContextMenuGroup) {
      return (
        <ContextMenuGroup {...props} key={v4()} container={container}/>
      );
    }
    else if (type === React.Fragment) {
      return (children as ReactElement).props.children.map(renderChildren);
    }
    
    return children;
  }
  
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface ContextMenuItemProps extends HTMLComponentProps {
  label: ReactNode;
  container?: Rect;
}
