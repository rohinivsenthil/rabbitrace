import "svelte";
import ExchangeEditor from "../components/exchange-editor.svelte";

const exchangeEditor = new ExchangeEditor({
  target: document.body,
});

export default exchangeEditor;
