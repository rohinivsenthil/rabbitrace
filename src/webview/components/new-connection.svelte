<script>
  const vscode = acquireVsCodeApi();

  $: window.addEventListener("message", (event) => {
    connection = event.data;
  });

  let connection = {
    name: "",
    amqpURL: "",
    mapiURL: "",
    mapiUsername: "",
    mapiPassword: "",
  };

  function saveConnection() {
    vscode.postMessage({
      action: "save-connection",
      connection,
    });
  }

  function testConnection() {
    vscode.postMessage({
      action: "test-connection",
      connection,
    });
  }
</script>

<main>
  <div class="add-connection-container">
    <div class="add-connection-title">
      <i class="codicon codicon-plug icon connection-icon" />
      <div>
        {connection.name === "" ? "Add a new connection" : connection.name}
      </div>
    </div>
    <div class="add-connection">
      <div class="add-connection-fields">
        <div class="add-connection-key">Connection Name</div>
        <div class="add-connection-key">Management API URL</div>
        <div class="add-connection-key">Management API Username</div>
        <div class="add-connection-key">Management API Password</div>
      </div>
      <div class="add-connection-fields">
        <input
          bind:value={connection.name}
          type="text"
          id="connection-name"
          class="vscode-input add-connection-input"
        />
        <input
          bind:value={connection.mapiURL}
          type="text"
          id="mapi-url"
          class="vscode-input add-connection-input"
          placeholder="http://localhost:15672"
        />
        <input
          bind:value={connection.mapiUsername}
          type="text"
          id="mapi-username"
          class="vscode-input add-connection-input"
        />
        <input
          bind:value={connection.mapiPassword}
          type="password"
          id="mapi-password"
          class="vscode-input add-connection-input"
        />
      </div>
    </div>
    <div class="connection-action-btns">
      <button
        type="button"
        class="connection-btn vscode-button"
        on:click={testConnection}
      >
        Test Connection
      </button>
      <button
        type="button"
        class="connection-btn vscode-button"
        on:click={saveConnection}
      >
        Save Connection
      </button>
    </div>
  </div>
</main>

<style>
  @import "@vscode/codicons/dist/codicon.css";
  @import "./vscode.css";

  .add-connection-container {
    margin: 50px;
  }
  .add-connection-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
  }

  .connection-icon {
    color: var(--vscode-terminal-ansiCyan);
  }

  .icon {
    margin: 0 5px 0 0;
  }
  .add-connection {
    display: flex;
    align-items: center;
  }
  .add-connection-fields {
    display: flex;
    flex-direction: column;
  }
  .add-connection-key {
    padding: 5px;
    margin: 5px 10px 5px 0;
  }
  .add-connection-input {
    padding: 5px;
    margin: 5px 10px;
  }

  .connection-action-btns {
    margin-top: 10px;
  }

  .connection-btn {
    margin: 10px 10px 0 0;
    cursor: pointer;
  }
</style>
