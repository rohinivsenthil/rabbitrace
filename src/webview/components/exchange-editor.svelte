<script>
  window.addEventListener("message", (event) => {
    console.log(event.data);
  });

  export const name = "exchange.tagging_restriction_service";
</script>

<main>
  <div class="exchange-container">
    <div class="exchange-name">
      <i class="codicon codicon-remote icon exchange-icon" />
      <div id="exchange-name">{name}</div>
    </div>
    <div class="exchange-section">
      <div class="exchange-section-title">‣ Overview</div>
    </div>
    <table class="overview-table">
      <tr>
        <td>Type</td>
        <td><div class="overview-value">direct</div></td>
      </tr>
      <tr>
        <td>Features</td>
        <td><div class="overview-value">durable: true</div></td>
      </tr>
      <tr>
        <td>Policy</td>
        <td><div class="overview-value" /></td>
      </tr>
    </table>
    <div class="exchange-section">
      <div class="exchange-section-title">‣ Bindings</div>
    </div>
    <table class="bindings-table">
      <tr>
        <th class="bindings-th">To</th>
        <th class="bindings-th">Routing Key</th>
        <th class="bindings-th">Arguements</th>
        <th class="bindings-th" />
      </tr>
      <tr>
        <td class="bindings-td">
          <div class="test">
            <i
              class="codicon codicon-database icon"
            />queue.bind_accounts_to_sto_rules.dlx
          </div>
        </td>
        <td class="bindings-td">queue.tagging_restriction_event</td>
        <td class="bindings-td" />
        <td class="bindings-td">
          <button type="button" class="vscode-button"><i class="codicon codicon-trash"/></button>
        </td>
      </tr>
      <tr>
        <td class="bindings-td">
          <div class="test">
            <i
              class="codicon codicon-database icon"
            />queue.tagging_restriction_event.dlx
          </div>
        </td>
        <td class="bindings-td">queue.tagging_restriction_event</td>
        <td class="bindings-td" />
        <td class="bindings-td">
          <button type="button" class="vscode-button"><i class="codicon codicon-trash"/></button>
        </td>
      </tr>
    </table>
    <div class="add-binding-title">Add binding from this exchange</div>
    <div class="add-binding">
      <div class="add-binding-fields">
        <select name="add-binding" id="add-binding" class="vscode-dropdown add-binding-key">
          <option value="queue">To Queue</option>
          <option value="exchange">To Exchange</option>
        </select>
        <div class="add-binding-key">Routing Key</div>
        <div class="add-binding-key">Arguements</div>
      </div>
      <div class="add-binding-fields">
        <input type="text" id="queue-exchange-name" class="vscode-input add-binding-input" />
        <input type="text" id="routing-key" class="vscode-input add-binding-input" />
        <div class="add-binding-args">
          <input type="text" id="arguments-key" class="vscode-input add-binding-input" />
          <div>=</div>
          <input type="text" id="arguments-value" class="vscode-input add-binding-input" />
          <select name="arg-type" id="arg-type" class="vscode-dropdown add-binding-input">
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    </div>
    <button type="button" class="bind-btn vscode-button">Bind</button>
    <div class="exchange-section">
      <div class="exchange-section-title">‣ Publish message</div>
    </div>
    <div class="add-binding">
      <div class="add-binding-fields">
        <div class="add-binding-key">Routing Key</div>
        <div class="add-binding-key">Headers</div>
        <div class="add-binding-key">Properties</div>
        <div class="add-binding-key">Payload</div>
      </div>
      <div class="add-binding-fields">
        <input type="text" id="msg-routing-key" class="vscode-input add-binding-input" />
        <div class="add-binding-args">
          <input type="text" id="msg-headers-key" class="vscode-input add-binding-input" />
          <div>=</div>
          <input type="text" id="msg-headers-value" class="vscode-input add-binding-input" />
          <select
            name="msg-header-type"
            id="msg-header-type"
            class="vscode-dropdown add-binding-input"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="number">Number</option>
          </select>
        </div>
        <div class="add-binding-args">
          <input type="text" id="msg-props-key" class="vscode-input add-binding-input" />
          <div>=</div>
          <input type="text" id="msg-props-value" class="vscode-input add-binding-input" />
        </div>
        <input type="text" id="msg-payload" class="vscode-input add-binding-input" />
      </div>
    </div>
    <button type="button" class="bind-btn vscode-button">Publish</button>
  </div>
</main>

<style>
  @import "@vscode/codicons/dist/codicon.css";
  @import "./vscode.css";

  .exchange-container {
    margin: 50px;
  }
  .exchange-name {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 24px;
  }
  .exchange-icon {
    color: var(--vscode-terminal-ansiCyan);
  }
  .exchange-title {
    font-weight: bold;
  }
  .exchange-section {
    border-bottom: 0.1px solid var(--vscode-tree-tableColumnsBorder);
    padding-bottom: 15px;
    margin: 36px 0 18px 0;
  }
  .exchange-section-title {
    font-size: 16px;
    font-weight: bold;
  }
  .overview-table {
    border-collapse: collapse;
  }
  .overview-value {
    font-family: monospace;
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
    /* font-family: monospace; */
  }
  .test {
    color: var(--vscode-terminal-ansiBlue);
    display: flex;
    align-items: center;
  }
  .icon {
    margin: 0 5px 0 0;
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
    margin-top: 10px;
  }
  th,
  td {
    padding: 5px;
    text-align: start;
  }
</style>
