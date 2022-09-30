<script>
  import TodoMain from "./lib/TodoMain.svelte";
  import { Router, Route } from "svelte-routing";
  import Register from "./lib/Register.svelte";
  import { navigate } from "svelte-routing";
  import { auth } from "./lib/Firebase";
  import Login from "./lib/Login.svelte";
  auth.onAuthStateChanged((u) => {
    !u ? navigate("/login") : navigate("/");
  });
</script>

<Router>
  <Route path="/" component={TodoMain} />
  <Route path="/register" component={Register} />
  <Route path="/login" component={Login} />
</Router>
