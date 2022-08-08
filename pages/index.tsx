import type {NextPage} from "next";
import Style from "./index.module.scss";
import ContextMenu, {ContextMenuItem} from "../src/components/ContextMenu";
import {ContextMenuDirection} from "../src";

const IndexPage: NextPage = () => {
  const items: ContextMenuItem[] = [
    {
      content: <span>Option 1</span>,
      callback: () => console.log("Option 1"),
      item_list: [
        {
          content: <span>Option 1.1</span>,
          callback: () => console.log("Option 1.1"),
          item_list: [
            {
              content: <span>Option 1.1.1</span>,
              callback: () => console.log("Option 1.1.1"),
              item_list: [
                {
                  content: <span>Option 1.1.1.1</span>,
                  callback: () => console.log("Option 1.1.1.1"),
                  item_list: []
                },
              ]
            },
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
          item_list: []
        },
        {
          content: <span>Option 2.2</span>,
          callback: () => console.log("Option 2.2"),
          item_list: []
        }
      ]
    }
  ];

  return (
    <ContextMenu className={Style.ElementPicker} items={items} direction={ContextMenuDirection.BOTTOM_RIGHT}>
      <button>Test</button>
    </ContextMenu>
  );
};

export default IndexPage;
