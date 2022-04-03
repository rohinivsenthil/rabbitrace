<script>
  //   function newQueue(someArg) {
  //     const vscode = acquireVsCodeApi();
  //     vscode.postMessage({
  //       type: 'new-queue',
  //       someArg,
  //     })
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
        />
        <select
          name="queue-type"
          id="queue-type"
          class="vscode-dropdown add-queue-input"
        >
          <option value="classic">Classic</option>
          <option value="quorum">Quorum</option>
          <option value="stream">Stream</option>
        </select>
        <select
          name="queue-durability"
          id="queue-durability"
          class="vscode-dropdown add-queue-input"
        >
          <option value="string">Durable</option>
          <option value="number">Transient</option>
        </select>
        <select
          name="queue-auto-delete"
          id="queue-auto-delete"
          class="vscode-dropdown add-queue-input"
        >
          <option value="string">No</option>
          <option value="number">Yes</option>
        </select>
        <div class="add-queue-args">
          <input
            type="text"
            id="arguments-key"
            class="vscode-input add-queue-input"
          />
          <div>=</div>
          <input
            type="text"
            id="arguments-value"
            class="vscode-input add-queue-input"
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
        </div>
      </div>
    </div>
    <button type="button" class="add-btn vscode-button">Add queue</button>
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
    align-items: center;
  }
  .add-queue-fields {
    display: flex;
    flex-direction: column;
  }
  .add-queue-key {
    padding: 5px;
    margin: 5px 10px 5px 0;
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
</style>
