# react-dialog

## Introduction

`react-dialog` is a [React](https://reactjs.org/) functional component hook which creates a dialog renderer element and a dialog creation function.
The dialog is only a container element and wrapper and does not come with any dialog templates.
Child elements added to the dialog component will have access to the Dialog object through the DialogContext.

## Installation

To install run the following command:

```shell
npm install @noxy/react-dialog@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import {useDialog, DialogContext} from "@noxy/react-dialog";
import React, {HTMLProps, useContext} from "react";

function TestComponent(props: HTMLProps<HTMLDivElement>) {
  const [dialog, createDialog] = useDialog();
  
  return (
    <>
      <div>
        <button onClick={onButtonClick}>Hello</button>
      </div>
      {dialog}
    </>
  );
  
  function onButtonClick() {
    createDialog({
      children: <DialogComponent/>
    });
  }
}

function DialogComponent() {
  const dialog = useContext(DialogContext)
  
  return (
    <div className={"dialog"}>
      World!
      <button onClick={onButtonClick}>Ok</button>
    </div>
  )
  
  function onButtonClick() {
    dialog.close();
  }
}

```

The `useDialog` hook takes a namespace as argument. This is the namespace which the dialogs created by the `createDialog` function will be stored.
The `dialog` renderer supplied by the hook will display only dialogs from that namespace. The default namespace is `"global"`.

## Properties

The `DialogInstance` component inherits all HTMLDivElement properties and applies them directly to the outermost element.
This includes the className property for those using CSS modules.

### overlay: boolean

Determines if an overlay should be shown behind the dialog, disabling clicking on anything behind the dialog.

**Default value**: `true`

### dismissible: boolean

Only relevant if overlay is set to true.
Determines if the dialog should be able to be dismissed by clicking on the overlay behind the dialog.
Dismissing a dialog in this way will trigger the onClose handler.

**Default value**: `true`

### closeable: boolean

Determines if a close button should be shown inside the dialog that can be clicked to close the dialog.

**Default value**: `true`

### onClose: callback(dialog: Dialog): void

A callback function which is called when the dialog is dismissed or closed, either through the close button, the overlay, or the Dialog close method.

**Default value**: `undefined`
