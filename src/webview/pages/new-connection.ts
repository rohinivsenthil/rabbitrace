import "svelte";
import NewConnection from "../components/new-connection.svelte";

const newConnection = new NewConnection({
  target: document.body,
});

export default newConnection;
