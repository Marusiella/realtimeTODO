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
  setTimeout(() => {
    getTodos();
  }, 1000);
</script>

<div class="center">
  <div>
    <input type="text" bind:value={title} />
    <button
      on:click={() =>
        addTodo({
          completed: false,
          title: title,
          user: auth.currentUser?.uid || "",
        })}>wyslij</button
    >
  </div>

  {#each todos as todo}
    <div class="todo">
      <span>{todo.title}</span>
      <input
        type="checkbox"
        on:change={() => changeTodo(todo.id)}
        checked={todo.completed}
      />
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
  }
</style>
