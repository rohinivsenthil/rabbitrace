<script>
  let data = {
    name: "",
    durable: "true",
    auto_delete: "false",
    internal: "false",
    arguments: {
      "x-queue-type": "classic",
    },
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

  function newQueue() {
    const args = argumentsData.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {}
    );

    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      type: "new-queue",
      data: { ...data, arguments: { ...data.arguments, ...args } },
    });
  }
</script>

<main>
  <div class="add-queue-container">
    <div class="add-queue-title">
      <i class="codicon codicon-database icon queue-icon" />
      <div>Add a new queue</div>
    </div>
    <div class="add-queue">
      <div class="add-queue-fields">
        <div class="add-queue-key">Name</div>
        <div class="add-queue-key">Type</div>
        <div class="add-queue-key">Durability</div>
        <div class="add-queue-key">Auto delete</div>
        <div class="add-queue-key">Arguments</div>
      </div>
      <div class="add-queue-fields">
        <input
          type="text"
          id="queue-name"
          class="vscode-input add-queue-input"
          bind:value={data.name}
        />
        <select
          name="queue-type"
          id="queue-type"
          class="vscode-dropdown add-queue-input"
          bind:value={data.arguments["x-queue-type"]}
        >
          <option value="classic">Classic</option>
          <option value="quorum">Quorum</option>
          <option value="stream">Stream</option>
        </select>
        <select
          name="queue-durability"
          id="queue-durability"
          class="vscode-dropdown add-queue-input"
          bind:value={data.durable}
        >
          <option value="true">Durable</option>
          <option value="false">Transient</option>
        </select>
        <select
          name="queue-auto-delete"
          id="queue-auto-delete"
          class="vscode-dropdown add-queue-input"
          bind:value={data.auto_delete}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        {#each argumentsData as argument}
          <div class="add-queue-args">
            <input
              type="text"
              id="arguments-key"
              class="vscode-input add-queue-input"
              bind:value={argument.key}
            />
            <div>=</div>
            <input
              type="text"
              id="arguments-value"
              class="vscode-input add-queue-input"
              bind:value={argument.value}
            />
            <select
              name="arg-type"
              id="arg-type"
              class="vscode-dropdown add-queue-input"
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="number">Number</option>
            </select>
            <button
              type="button"
              class="add-args-btn vscode-button"
              on:click={() => removeArgument(argument.idx)}>–</button
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
    <button type="button" class="add-btn vscode-button" on:click={newQueue}
      >Add queue</button
    >
  </div>
</main>

<style>
  @import "@vscode/codicons/dist/codicon.css";
  @import "./vscode.css";

  .add-queue-container {
    margin: 50px;
  }
  .add-queue-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
  }

  .queue-icon {
    color: var(--vscode-terminal-ansiBlue);
  }

  .icon {
    margin: 0 5px 0 0;
  }
  .add-queue {
    display: flex;
  }
  .add-queue-fields {
    display: flex;
    flex-direction: column;
  }
  .add-queue-key {
    padding: 5px;
    margin: 6.5px;
  }
  .add-queue-input {
    padding: 5px;
    margin: 5px 10px;
  }
  .add-queue-args {
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
</style>
