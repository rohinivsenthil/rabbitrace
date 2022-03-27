import "svelte";
import QueueEditor from "../components/queue-editor.svelte";

const queueEditor = new QueueEditor({
  target: document.body,
});

export default queueEditor;
