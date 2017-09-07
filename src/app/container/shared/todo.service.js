// "use strict";
// var todo_1 = require("./todo");
// var data_1 = require("./data");
// var TodoService = (function () {
//     function TodoService() {
//         this.todos = data_1.todos;
//     }
//     TodoService.prototype.getTodos = function () {
//         return this.todos;
//     };
//     TodoService.prototype.createTodo = function (title) {
//         var todo = new todo_1.Todo(title);
//         this.todos.push(todo);
//     };
//     TodoService.prototype.deleteTodo = function (todo) {
//         var index = this.todos.indexOf(todo);
//         if (index > -1) {
//             this.todos.splice(index, 1);
//         }
//     };
//     TodoService.prototype.toggleTodo = function (todo) {
//         todo.completed = !todo.completed;
//     };
//     return TodoService;
// }());
// exports.TodoService = TodoService;
// //# sourceMappingURL=todo.service.js.map
