import React from "react";

export interface ContextMenuItem {
  content: React.ReactNode;
  callback?: (event: React.MouseEvent<HTMLDivElement>) => void;
  item_list?: ContextMenuItem[];
}
