<script lang="ts">
  import {
    collection,
    getDocs,
    where,
    query,
    getDoc,
    updateDoc,
    addDoc,
    doc,
    deleteDoc,
  } from "firebase/firestore";
  import { db, auth } from "./Firebase";
  interface Todo {
    id: string;
    title: string;
    completed: boolean;
    user: string;
  }
  var todos: Todo[] = [];
  var title: string = "";
  const getTodos = async () => {
    var c = collection(db, "todos");
    var uid = auth.currentUser?.uid;
    var q = query(c, where("user", "==", uid));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      todos = [
        ...todos,
        {
          id: doc.id,
          title: doc.data().title,
          completed: doc.data().completed,
          user: doc.data().user,
        },
      ];
    });
  };

  const changeTodo = async (id: string) => {
    var c = collection(db, "todos");
    var d = await getDoc(doc(c, id));
    updateDoc(doc(c, id), {
      completed: !d.data()?.completed,
    });
    // updateDoc(doc.docs[0].ref, {
    //   completed: !doc.docs[0].data().completed,
    // });
  };
  const addTodo = async (d: {}) => {
    var c = collection(db, "todos");
    await addDoc(c, d);
    console.log("Added");
  };

  const deleteTodo = async (id: string) => {
    var c = collection(db, "todos");
    await deleteDoc(doc(c, id));
    var index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    todos = [...todos];
  };

  setTimeout(() => {
    getTodos();
  }, 1000);
</script>

<div class="center">
  <div class="sender">
    <input type="text" bind:value={title} />
    <button
      on:click={() =>
        addTodo({
          completed: false,
          title: title,
          user: auth.currentUser?.uid || "",
        })}>send</button
    >
  </div>

  {#each todos as todo}
    <div class="todo">
      <input
        type="checkbox"
        class="checkbox"
        on:change={() => changeTodo(todo.id)}
        checked={todo.completed}
      />
      <span>{todo.title}</span>
      <button on:click={() => deleteTodo(todo.id)}>Remove</button>
    </div>
  {/each}
</div>

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .todo {
    color: white;
    font-family: "Inter", sans-serif;
    font-size: 70px;
  }
  button {
    border: 5px solid #ffffff;
    background: none;
    /* width: 262px; */
    /* padding: 20px; */
    height: 64px;
    font-size: 20px;
    font-weight: 700;
    /* margin-top: 25px; */
    color: #ffffff;
    transition: 0.1s;
  }
  .sender {
    height: 64px;
  }
  .sender > input {
    margin-bottom: 0px;
    font-size: 30px;
    height: 100%;
  }
  .sender > button {
    /* position: relative;
    top: -3px; */
    height: 100%;
    cursor: pointer;
  }
  .sender > button:hover {
    background: #ffffff;
    color: #000000;
  }
  .todo > input {
    margin: 0;
  }
  .todo > button {
    margin: 0;
    position: relative;
    top: -15px;
    height: 50px;
    cursor: pointer;
  }
  .todo > button:hover {
    background: #ffffff;
    color: #000000;
  }
  .checkbox {
    margin: 0;
    margin-right: 20px;
    height: 50px;
    width: 50px;
  }
</style>
