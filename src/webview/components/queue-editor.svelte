<script>
  export let bindings = [];
  export let name;
  export let overviewDetails = [];

  let addBindingData = {
    destination: "",
    destination_type: "q",
    source: "",
    routing_key: "",
    arguments: {},
  };

  function addBinding() {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      type: "add-binding",
      data: addBindingData,
    });
  }

  $: window.addEventListener("message", (event) => {
    bindings = event.data.bindings;
    const overview = event.data.overview;
    name = event.data.name;
    addBindingData.destination = event.data.name;

    const formattedArguments = Object.entries(overview.arguments)
      .map(([key, value]) => `${key} = ${value}`)
      .join("\n");

    overviewDetails = [
      {
        key: "Type",
        value: overview.type,
      },
      {
        key: "Features",
        value: `durable = ${overview.durable}\nexclusive = ${overview.exclusive}\npolicy = ${overview.policy}`,
      },
      {
        key: "Arguments",
        value: formattedArguments,
      },
      {
        key: "Consumers",
        value: overview.consumers,
      },
    ];
  });
</script>

<main>
  <div class="queue-container">
    <div class="queue-name">
      <i class="codicon codicon-database icon queue-icon" />
      <div id="queue-name">{name}</div>
    </div>
    <div class="queue-section">
      <div class="queue-section-title">‣ Overview</div>
    </div>
    <table class="overview-table">
      {#each overviewDetails as overview}
        <tr>
          <td>{overview.key}</td>
          <td
            ><div class="overview-value">
              {overview.value}
            </div></td
          >
        </tr>
      {/each}
    </table>
    <div class="queue-section">
      <div class="queue-section-title">‣ Bindings</div>
    </div>
    <table class="bindings-table">
      <tr>
        <th class="bindings-th">From</th>
        <th class="bindings-th">Routing Key</th>
        <th class="bindings-th">Arguements</th>
        <th class="bindings-th" />
      </tr>
      {#each bindings as binding}
        {#if binding.source !== ""}
          <tr>
            <td class="bindings-td">
              <div class="exchange-binding">
                <i class="codicon codicon-remote icon" />{binding.source}
              </div>
            </td>
            <td class="bindings-td">{binding.routing_key}</td>
            <td class="bindings-td"
              >{JSON.stringify(binding.arguments, null, 2)}</td
            >
            <td class="bindings-td">
              <button type="button" class="vscode-button unbind-btn"
                ><i class="codicon codicon-trash" /></button
              >
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="4" class="merged-td">(Default exchange binding)</td>
          </tr>
        {/if}
      {/each}
    </table>
    <div class="add-binding-title">Add binding to this queue</div>
    <div class="add-binding">
      <div class="add-binding-fields">
        <div class="add-binding-key">From exchange</div>
        <div class="add-binding-key">Routing Key</div>
        <div class="add-binding-key">Arguements</div>
      </div>
      <div class="add-binding-fields">
        <input
          type="text"
          id="queue-queue-name"
          class="add-binding-input"
          bind:value={addBindingData.source}
        />
        <input
          type="text"
          id="routing-key"
          class="add-binding-input"
          bind:value={addBindingData.routing_key}
        />
        <div class="add-binding-args">
          <input type="text" id="arguments-key" class="add-binding-input" />
          <div>=</div>
          <input type="text" id="arguments-value" class="add-binding-input" />
          <select name="arg-type" id="arg-type" class="add-binding-input">
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    </div>
    <button type="button" class="bind-btn" on:click={addBinding}>Bind</button>
    <div class="queue-section">
      <div class="queue-section-title">‣ Publish message</div>
    </div>
    <div class="add-binding-title">
      Message will be published to the default exchange with routing key
      <b>queue.bind_accounts_to_sto_rules</b>, routing it to this queue.
    </div>
    <div class="add-binding">
      <div class="add-binding-fields">
        <div class="add-binding-key">Delivery mode</div>
        <div class="add-binding-key">Headers</div>
        <div class="add-binding-key">Properties</div>
        <div class="add-binding-key">Payload</div>
      </div>
      <div class="add-binding-fields">
        <select
          name="msg-delivery-type"
          id="msg-delivery-type"
          class="add-binding-input"
        >
          <option value="string">Non-Persistent</option>
          <option value="number">Persistent</option>
        </select>
        <div class="add-binding-args">
          <input type="text" id="msg-headers-key" class="add-binding-input" />
          <div>=</div>
          <input type="text" id="msg-headers-value" class="add-binding-input" />
          <select
            name="msg-header-type"
            id="msg-header-type"
            class="add-binding-input"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
          </select>
        </div>
        <div class="add-binding-args">
          <input type="text" id="msg-props-key" class="add-binding-input" />
          <div>=</div>
          <input type="text" id="msg-props-value" class="add-binding-input" />
        </div>
        <input type="text" id="msg-payload" class="add-binding-input" />
      </div>
    </div>
    <button type="button" class="bind-btn">Publish</button>
  </div>
</main>

<style>
  @import "@vscode/codicons/dist/codicon.css";
  input {
    color: var(--vscode-input-foreground);
    background-color: var(--vscode-input-background);
    border: 1px solid var(--vscode-input-border);
  }
  select {
    color: var(--vscode-dropdown-foreground);
    background-color: var(--vscode-dropdown-background);
    border-color: var(--vscode-dropdown-border);
  }
  button {
    color: var(--vscode-button-secondaryForeground);
    background-color: var(--vscode-button-secondaryBackground);
    border: none;
  }
  button:hover {
    background-color: var(--vscode-button-secondaryHoverBackground);
  }
  .queue-container {
    margin: 50px;
  }
  .queue-name {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
  }
  .queue-icon {
    color: var(--vscode-terminal-ansiBlue);
  }
  .queue-section {
    border-bottom: 0.1px solid var(--vscode-button-secondaryHoverBackground);
    padding-bottom: 15px;
    margin: 36px 0 18px 0;
  }
  .queue-section-title {
    font-size: 16px;
    font-weight: bold;
  }
  .overview-table {
    border-collapse: collapse;
  }
  .overview-value {
    white-space: pre;
    font-family: var(--vscode-editor-font-family);
  }
  .bindings-table,
  .bindings-th,
  .bindings-td {
    border: 1px solid var(--vscode-tree-tableColumnsBorder);
    border-collapse: collapse;
  }
  .bindings-table {
    margin: 20px 0 20px 0;
  }
  .bindings-th {
    padding: 10px;
    background-color: var(--vscode-keybindingTable-headerBackground);
  }
  .bindings-td {
    padding: 10px;
    background-color: var(--vscode-keybindingTable-rowsBackground);
    font-family: var(--vscode-editor-font-family);
    font-size: var(--vscode-editor-font-size);
  }
  .merged-td {
    background-color: var(--vscode-keybindingTable-rowsBackground);
    border: 1px solid var(--vscode-tree-tableColumnsBorder);
    border-collapse: collapse;
  }
  .exchange-binding {
    color: var(--vscode-terminal-ansiCyan);
    display: flex;
    align-items: center;
  }
  .icon {
    margin: 0 5px 0 0;
  }
  .unbind-btn {
    cursor: pointer;
  }
  .add-binding-title {
    padding: 0 0 5px 0;
    /* border-bottom: 0.1px solid var(--vscode-button-secondaryHoverBackground); */
    margin-bottom: 20px;
  }
  .add-binding {
    display: flex;
    align-items: center;
  }
  .add-binding-fields {
    display: flex;
    flex-direction: column;
  }
  .add-binding-key {
    padding: 5px;
    margin: 5px 10px 5px 0;
  }
  .add-binding-input {
    padding: 5px;
    margin: 5px 10px;
  }
  .add-binding-args {
    display: flex;
    align-items: center;
  }
  .bind-btn {
    cursor: pointer;
    margin-top: 10px;
  }
  th,
  td {
    padding: 5px;
    text-align: start;
  }
</style>
