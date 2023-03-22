# react-context-menu

## Introduction

`react-context-menu` is a [React](https://reactjs.org/) functional component which assists in creating custom nested context menus.
The context menu will automatically attempt to fit inside the screen.

## Installation

To install run the following command:

```shell
npm install @noxy/react-context-menu@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import {ContextMenu, ContextMenuGroup} from "@noxy/react-dialog";

function TestComponent() {
  
  return (
    <ContextMenu>
      <>
        <div>
          <span>Option 1</span>
        </div>
        <div>
          <span>Option 2</span>
        </div>
      </>
      <div>
        <span>Option 3</span>
      </div>
      <ContextMenuGroup label={"Option 4"}>
        <div>
          <span>Option 4.1</span>
        </div>
        <div>
          <span>Option 4.2</span>
        </div>
      </ContextMenuGroup>
      <ContextMenuGroup label={"Option 5"}>
        <ContextMenuGroup label={"Option 5.1"}>
          <div>
            <span>Option 5.1.1</span>
          </div>
          <div>
            <span>Option 5.1.2</span>
          </div>
        </ContextMenuGroup>
        <div>
          <span>Option 5.2</span>
        </div>
        <div>
          <span>Option 5.3</span>
        </div>
      </ContextMenuGroup>
      <>
        <ContextMenuGroup label={"Option 6"}>
          <div>
            <span>Option 6.1</span>
          </div>
          <div>
            <span>Option 6.2</span>
          </div>
        </ContextMenuGroup>
        <div>
          <span>Option 7</span>
        </div>
      </>
    </ContextMenu>
  );
}
```

A `ContextMenu` is defined as the outer element. Each element inside the context menu is considered its own context menu item.
To created a nested list of menu items, add a `ContextMenuGroup` element inside the `ContextMenu`. `ContextMenuGroup` items can be infinitely nested.

## Properties

The `ContextMenu` component inherits all HTMLDivElement properties and applies them directly to the outermost element.
This includes the className property for those using CSS modules.

### contained: boolean

Determines if the ContextMenu should be contained inside it's direct parent rather than the fullscreen.

**Default value**: `false`
