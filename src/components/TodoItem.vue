<template>
  <div :class="{ completed: todo.completed }" class="todo-item">
    <input type="checkbox" :checked="todo.completed" @change="toggleComplete" />

    <input
      type="text"
      v-if="editing"
      v-model="editedText"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
    />
    <span class="todo-text" v-else>{{ todo.text }}</span>

    <div class="buttons">
      <button @click="editTodo" class="edit-btn">
        <span v-if="editing">✔️</span>
        <span v-else>✏️</span>
      </button>
      <button @click="removeTodo" class="delete-btn">🗑️</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const props = defineProps({
  todo: {
    type: Object as () => { id: number; text: string; completed: boolean },
    required: true,
  },
});

const store = useTodoStore();
const editing = ref(false);
const editedText = ref(props.todo.text);

const toggleComplete = () => {
  store.toggleTodo(props.todo.id);
};

const editTodo = () => {
  if (editing.value) {
    if (editedText.value.trim()) {
      store.updateTodo(props.todo.id, editedText.value);
    }
    editing.value = false;
  } else {
    editing.value = true;
  }
};

const saveEdit = () => {
  if (editedText.value.trim()) {
    store.updateTodo(props.todo.id, editedText.value);
  }
  editing.value = false;
};

const removeTodo = () => {
  store.removeTodo(props.todo.id);
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 5px 0;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.todo-item:hover {
  background-color: #f1f1f1;
}

input[type="checkbox"] {
  margin-right: 10px;
}

input[type="text"] {
  width: 70%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="text"]:focus {
  outline: none;
  border-color: #007bff;
}

.buttons {
  display: flex;
  gap: 10px;
}

.buttons button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s ease;
}

.buttons button:hover {
  transform: scale(1.1);
}

.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}
</style>
