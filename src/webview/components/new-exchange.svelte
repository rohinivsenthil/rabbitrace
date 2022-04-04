<script>
  let data = {
    name: "",
    type: "direct",
    auto_delete: "false",
    internal: "false",
    arguments: {},
  };

  function newExchange() {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      type: "new-exchange",
      data,
    });
  }
</script>

<main>
  <div class="add-exchange-container">
    <div class="add-exchange-title">
      <i class="codicon codicon-remote icon exchange-icon" />
      <div>Add a new exchange</div>
    </div>
    <div class="add-exchange">
      <div class="add-exchange-fields">
        <div class="add-exchange-key">Name</div>
        <div class="add-exchange-key">Type</div>
        <div class="add-exchange-key">Durability</div>
        <div class="add-exchange-key">Auto delete</div>
        <div class="add-exchange-key">Internal</div>
        <div class="add-exchange-key">Arguments</div>
      </div>
      <div class="add-exchange-fields">
        <input
          type="text"
          id="exchange-name"
          class="vscode-input add-exchange-input"
          bind:value={data.name}
        />
        <select
          name="exchange-type"
          id="exchange-type"
          class="vscode-dropdown add-exchange-input"
          bind:value={data.type}
        >
          <option value="direct">Direct</option>
          <option value="fanout">Fanout</option>
          <option value="headers">Headers</option>
          <option value="topic">Topic</option>
        </select>
        <select
          name="exchange-durability"
          id="exchange-durability"
          class="vscode-dropdown add-exchange-input"
          bind:value={data.durable}
        >
          <option value="true">Durable</option>
          <option value="false">Transient</option>
        </select>
        <select
          name="exchange-auto-delete"
          id="exchange-auto-delete"
          class="vscode-dropdown add-exchange-input"
          bind:value={data.auto_delete}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <select
          name="exchange-internal"
          id="exchange-internal"
          class="vscode-dropdown add-exchange-input"
          bind:value={data.internal}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <div class="add-exchange-args">
          <input
            type="text"
            id="arguments-key"
            class="vscode-input add-exchange-input"
          />
          <div>=</div>
          <input
            type="text"
            id="arguments-value"
            class="vscode-input add-exchange-input"
          />
          <select
            name="arg-type"
            id="arg-type"
            class="vscode-dropdown add-exchange-input"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    </div>
    <button type="button" class="add-btn vscode-button" on:click={newExchange}
      >Add exchange</button
    >
  </div>
</main>

<style>
  @import "@vscode/codicons/dist/codicon.css";
  @import "./vscode.css";

  .add-exchange-container {
    margin: 50px;
  }
  .add-exchange-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
  }

  .exchange-icon {
    color: var(--vscode-terminal-ansiCyan);
  }

  .icon {
    margin: 0 5px 0 0;
  }
  .add-exchange {
    display: flex;
    align-items: center;
  }
  .add-exchange-fields {
    display: flex;
    flex-direction: column;
  }
  .add-exchange-key {
    padding: 5px;
    margin: 5px 10px 5px 0;
  }
  .add-exchange-input {
    padding: 5px;
    margin: 5px 10px;
  }
  .add-exchange-args {
    display: flex;
    align-items: center;
  }
  .add-btn {
    margin-top: 10px;
  }
</style>
