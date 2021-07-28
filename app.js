const storageKey = 'todo-with-vue-v2:todos';

const initTodos = () => {
  const storage = localStorage.getItem(storageKey);

  return storage ? JSON.parse(storage) : [];
};

const saveTodos = (todos) => {
  localStorage.setItem(storageKey, JSON.stringify(todos));
};

const generateId = (todos) => {
  if (todos.length === 0) return 1;

  let { id } = todos[todos.length - 1];
  return ++id;
};

new Vue({
  el: '#app',
  data: {
    createText: '',
    todos: initTodos(),
  },
  methods: {
    create: function() {
      this.todos.push({
        id: generateId(this.todos),
        text: this.createText,
        editing: false,
      });

      saveTodos(this.todos);

      this.createText = '';
    },
    update: function(id) {
      const todo = this.todos.find(todo => todo.id === id);

      if (todo.editing) {
        todo.editing = false;

        saveTodos(this.todos);
      } else {
        todo.editing = true;
      }
    },
    remove: function(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);

      saveTodos(this.todos);
    },
  },
});
