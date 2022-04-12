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
  <div class="connection-container">
    <div>
      <h1 class="connection-header">Add a new connection</h1>
    </div>
    <div class="connection-entry">
      <label for="connection-name">Connection name:</label>
      <input
        bind:value={connection.name}
        type="text"
        id="connection-name"
        class="connection-input"
      />
    </div>
    <div class="connection-entry">
      <label for="amqp-url">AMQP URL:</label>
      <input
        bind:value={connection.amqpURL}
        type="text"
        id="amqp-url"
        class="connection-input"
      />
    </div>
    <div class="connection-entry">
      <label for="mapi-url">Management API URL:</label>
      <input
        bind:value={connection.mapiURL}
        type="text"
        id="mapi-url"
        class="connection-input"
      />
    </div>
    <div class="connection-entry">
      <label for="mapi-username">Management API Username:</label>
      <input
        bind:value={connection.mapiUsername}
        type="text"
        id="mapi-username"
        class="connection-input"
      />
    </div>
    <div class="connection-entry">
      <label for="mapi-password">Management API Password:</label>
      <input
        bind:value={connection.mapiPassword}
        type="text"
        id="mapi-password"
        class="connection-input"
      />
    </div>
    <div class="connection-action-btns">
      <button type="button" class="connection-btn" on:click={testConnection}>
        Test Connection
      </button>
      <button type="button" class="connection-btn" on:click={saveConnection}>
        Save Connection
      </button>
    </div>
  </div>
</main>
