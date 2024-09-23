import { defineStore } from "pinia";
import { ref, watch } from "vue";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem("todos") || "[]"));

  const addTodo = (text: string) => {
    todos.value.push({ id: Date.now(), text, completed: false });
  };

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const toggleTodo = (id: number) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  const updateTodo = (id: number, text: string) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.text = text;
    }
  };

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
  };
});
