<script>
  let data = {
    name: "",
    type: "direct",
    durable: "true",
    auto_delete: "false",
    internal: "false",
    arguments: {},
  };

  let argumentsData = [{ idx: 1, key: "", value: "" }];

  function addArgument() {
    argumentsData = [
      ...argumentsData,
      { idx: argumentsData.length + 1, key: "", value: "" },
    ];
  }

  function removeArgument(idx) {
    argumentsData = argumentsData.filter(function (arg) {
      return arg.idx !== idx;
    });
  }

  function newExchange() {
    const args = argumentsData.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {}
    );

    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      type: "new-exchange",
      data: { ...data, arguments: args },
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
        {#each argumentsData as argument}
          <div class="add-exchange-args">
            <input
              type="text"
              id="arguments-key"
              class="vscode-input add-exchange-input"
              bind:value={argument.key}
            />
            <div>=</div>
            <input
              type="text"
              id="arguments-value"
              class="vscode-input add-exchange-input"
              bind:value={argument.value}
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
            <button
              type="button"
              class="trash-btn"
              on:click={() => removeArgument(argument.idx)}
              ><i class="codicon codicon-trash" /></button
            >
          </div>
        {/each}
        <div class="add-args">
          <button
            type="button"
            class="add-args-btn vscode-button"
            on:click={addArgument}>+ Add argument</button
          >
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
  }
  .add-exchange-fields {
    display: flex;
    flex-direction: column;
  }
  .add-exchange-key {
    padding: 5px;
    margin: 6.5px;
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

  .add-args {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
  }

  .add-args-btn {
    width: fit-content;
    color: #aab2c0;
    background-color: transparent;
  }

  .trash-btn {
    background-color: transparent;
    color: #aab2c0;
    border: transparent;
    cursor: pointer;
    padding: 5px 10px;
  }

  .trash-btn:hover {
    background-color: transparent;
    color: var(--vscode-button-foreground);
  }
</style>
