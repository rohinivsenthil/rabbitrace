<h1 align="center">Rabbitrace</h1>
<div align="center">
  <strong> Manage RabbitMQ queues and exchanges</strong>  
  <br/> <br/>
  <a href="https://marketplace.visualstudio.com/items?itemName=rohinivsenthil.rabbitrace&ssr=false#overview"><img src="https://img.shields.io/visual-studio-marketplace/i/rohinivsenthil.rabbitrace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=rohinivsenthil.rabbitrace&ssr=false#version-history"><img src="https://img.shields.io/visual-studio-marketplace/v/rohinivsenthil.rabbitrace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=rohinivsenthil.rabbitrace&ssr=false#review-details"><img src="https://img.shields.io/visual-studio-marketplace/r/rohinivsenthil.rabbitrace" /></a>
</div>
<br />

Rabbitrace is a [Visual Studio Code](https://code.visualstudio.com/) [extension](https://marketplace.visualstudio.com/VSCode) to help developers manage and monitor RabbitMQ queues and exchanges. You can find the extension available [here](https://marketplace.visualstudio.com/items?itemName=rohinivsenthil.rabbitrace).

<div align="center">
  <img src="https://user-images.githubusercontent.com/42040329/120920378-0c83c880-c6dc-11eb-814a-e667563eed95.gif"/>
  <br/>
  <sup>Release: 1.0.0</sup>
</div>

## Highlighted Features

- **Intuitive UI/UX** similar to Postman fitting seamlessly with any VSCode theme
- Supports **GraphQL** requests
- Supports **code snippet generation** from requests

## Quick start

**Step 1.** Install the Rabbitrace extension for Visual Studio Code  
**Step 2.** Click on the Rabbitrace icon in the side panel OR run the following command **Rabbitrace: Create Connection**  
**Step 3** Create a connection to your RabbitMQ instance and manage your exchanges/queues from VSCode

## Commands

| Command                       | Description                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| Rabbitrace: Create Connection | Opens a new Rabbitrace tab to create a connection to RabbitMQ |

## Issues, feature requests, and contributions

### Issues

- If you come across a problem with the extension, please file an [issue](https://github.com/rohinivsenthil/rabbitrace/issues/new)
- For list of known issues, please check the [issues tab](https://github.com/rohinivsenthil/rabbitrace/issues/new)

### Feature requests

- Find planned features for future releases marked as [feature](https://github.com/rohinivsenthil/rabbitrace/issues?q=is%3Aissue+is%3Aopen+label%3Afeature) under issues tab.
- For new feature requests, please file an [issue](https://github.com/rohinivsenthil/rabbitrace/issues/new)

### Contributions

Contributions are always welcome!

#### Running the extension locally for development

1. Clone the repository and install dependencies by running `yarn install`
2. Press `F5` to open a new window with your extension loaded.
3. Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Rabbitrace: Create Connection`.

#### Folder structure

- **`package.json`** - this is the manifest file in which you declare your extension and command. The plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette.
- **`src/webview`**: folder where you will find entire React code
- **`src/extension.ts`**: this is the main file where you will provide the implementation of your command. The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`. We pass the function containing the implementation of the command as the second parameter to `registerCommand`.
- **`src/exchanges.ts`**, **`src/queues.ts`** and **`src/connections.ts`**: these are the files where you will define the Exchanges, Queues and Connections tree views respectively.

#### Making changes

- You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Related
