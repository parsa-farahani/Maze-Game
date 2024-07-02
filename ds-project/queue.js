class Queue {
    constructor() {
      this.items = [];
    }
  
    // Enqueue an item to the back of the queue
    enqueue(element) {
      this.items.push(element);
    }
  
    // Dequeue an item from the front of the queue
    dequeue() {
      if (this.items.length === 0) {
        return "Underflow";
      }
      return this.items.shift();
    }
  
    // Return the front item from the queue
    front() {
      return this.items[0];
    }
  
    // Check if the queue is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Get the size of the queue
    size() {
      return this.items.length;
    }
  
    // Print the queue
    print() {
      let str = "";
      for (let i = 0; i < this.items.length; i++) {
        str += this.items[i] + " ";
      }
      return str;
    }
}