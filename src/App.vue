<template>
  <div class="app">
    <h1>To-Do List</h1>
    <div class="input-container">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Добавить задачу"
      />
      <button @click="addTodo">Добавить</button>
    </div>
    <div v-for="todo in store.todos" :key="todo.id">
      <TodoItem :todo="todo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTodoStore } from "./stores/todoStore";
import TodoItem from "./components/TodoItem.vue";

const store = useTodoStore();
const newTodo = ref("");

const addTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value);
    newTodo.value = "";
  }
};
</script>

<style>
.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
  font-family: "Arial", sans-serif;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.input-container button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input-container button:hover {
  background-color: #0056b3;
}

.input-container button:active {
  background-color: #003d82;
}
</style>
