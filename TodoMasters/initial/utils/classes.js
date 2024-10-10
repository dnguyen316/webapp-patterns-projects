import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
  equals(other) {
    return this.text === other.text;
  }
}

export class TodoList {
  //candidate for Singleton

  #data = new Set(); // # - private
  get items() {
    return this.#data;
  }

  //Singleton
  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  //List behavior
  add(item) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(text) {
    const array = Array.from(this.#data);
    //TODO: check for error
    const todoToDelete = array.filter((item) => item.text === text)[0];
    this.#data.delete(todoToDelete);
    this.notify();
  }

  find(text) {
    const array = Array.from(this.#data);
    return array.find((item) => item.text === text);
  }

  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

//Applying the observer to the class
Object.assign(TodoList.prototype, observerMixin);
