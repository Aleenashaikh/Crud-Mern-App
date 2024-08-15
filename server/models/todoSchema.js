const mongoose = require("mongoose");   // mongoose is the library used for interacting with MongoDB in Node.js.

const todoSchema = mongoose.Schema(    //here is the structure in which we will post, get, put or delete in our database.
  {
    todoItem: {
      type: String,
      required: true,
    }   
  }
);


const TodoSchema = mongoose.model("Todo", todoSchema);  //makes a collection named todo in database according to the following schema.

module.exports = TodoSchema;
