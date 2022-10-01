<script lang="ts">
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "./Firebase";
  import { Link } from "svelte-routing";

  var email: string = "";
  var password: string = "";
  const SingUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user + "Signed up");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        // ..
      });
  };
</script>

<div class="centerthat">
  <h1 class="title">Register</h1>
  <input type="text" name="username" bind:value={email} />
  <input type="password" name="password" bind:value={password} />
  <button on:click={SingUp}>Register</button>
  <Link to="/login">Login</Link>
</div>

<style>
  .centerthat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 2rem;
    color: white;
  }
  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
