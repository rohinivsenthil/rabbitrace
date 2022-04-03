import "svelte";
import NewQueue from "../components/new-queue.svelte";

const newQueue = new NewQueue({
  target: document.body,
});

export default newQueue;
