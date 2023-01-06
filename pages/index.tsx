import type {NextPage} from "next";
import Style from "./index.module.scss";
import ContextMenu from "../src/components/ContextMenu";
import {ContextMenuDirection, ContextMenuItem} from "../src";
import React, {useState} from "react";

const IndexPage: NextPage = () => {
  const [value, setValue] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);

  const items: ContextMenuItem[] = [
    {
      content: <span>{test ? "Hello World!" : "World, Hello!"}</span>,
      item_list: [
        {
          content: <span>Option 1.1</span>,
          item_list: [
            {
              content: <span>Option 1.1.1</span>,
              item_list: [
                {
                  content: <span>Option 1.1.1.1</span>,
                  callback: () => console.log("Option 1.1.1.1"),
                  item_list: []
                }
              ]
            }
          ]
        },
        {
          content: <span>Option 1.2</span>,
          callback: () => console.log("Option 1.2"),
          item_list: []
        }
      ]
    },
    {
      content: <span>Option 2</span>,
      callback: () => console.log("Option 2"),
      item_list: [
        {
          content: <span>Option 2.1</span>,
          callback: () => console.log("Option 2.1"),
          item_list: [
            {
              content: <label><input key={Number(!value)} type={"checkbox"} checked={value} onChange={onChange}/>Hello World!</label>,
              item_list: []
            }
          ]
        },
        {
          content: <span>Option 2.2</span>,
          callback: () => console.log("Option 2.2"),
          item_list: []
        }
      ]
    }
  ];

  console.log("render index");

  return (
    <ContextMenu className={Style.ElementPicker} items={items} direction={ContextMenuDirection.BOTTOM_RIGHT}>
      <button onClick={() => setTest(!test)}>Test</button>
      <input type={"checkbox"} checked={value} onChange={onChange}/>
    </ContextMenu>
  );

  function onChange(event: React.ChangeEvent) {
    console.log(event);
    setValue(!value);
  }
};

export default IndexPage;
