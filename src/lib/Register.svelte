<script lang="ts">
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "./Firebase";
  import { Link } from "svelte-routing";
  import { authErrors } from "./ErrorCodes";
  var errorText: string = "";

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
        errorText = authErrors[(errorCode as string).split("/")[1]];

        // ..
      });
  };
</script>

<title>Register screen</title>
<div class="centerthat">
  <h1 class="title">Register</h1>
  <div class="smallertext">
    Already have account? <Link to="/login"><aa class="link">Sign in!</aa></Link
    >
  </div>
  <input
    type="text"
    name="username"
    bind:value={email}
    placeholder="your@email.com"
  />
  <input
    type="password"
    name="password"
    bind:value={password}
    placeholder="yourpasswordXYZ"
    on:change={SingUp}
  />
  <button on:click={SingUp}>Sign up!</button>
</div>
{#if errorText}
  <div class="error">{errorText}</div>
{/if}

<style>
  .error {
    margin-top: 20px;
    font-size: 20px;
    font-family: "Inter", sans-serif;
    color: red;
    text-align: center;
  }
  .link {
    color: white;
    text-decoration: none;
    /* white-space: nowrap; */
  }
  .centerthat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .smallertext {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-bottom: 40px;
  }
  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    color: #ffffff;
    margin-bottom: 7px;
  }
  button {
    border: 5px solid #ffffff;
    background: none;
    width: 262px;
    height: 64px;
    font-size: 20px;
    font-weight: 700;
    margin-top: 25px;
    color: #ffffff;
  }
</style>
