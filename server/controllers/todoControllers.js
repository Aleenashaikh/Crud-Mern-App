const res = require("express/lib/response");
const TodoSchema = require("../models/todoSchema");

// ADD  (DONE)

const addTodo = async (req, res) => {
  const { todo } = req.body; //keep everything(key of object) in separate variable .(Destructring). Uses object destructuring to extract the todo property from the req.body object

  const myTodo = await TodoSchema.create({   //create a new entry in database according to the following schema. 
    todoItem: todo,
  });

  if (myTodo) {
    res.status(201).json({
      todo: myTodo.todo,    //if successfull than add myTodo.todo into the datbase.
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");  //if failed show error.
  }
};

const editTodo = async (req, res) => {
  let { data, newValue } = req.body;  //Uses object destructuring to extract the data and newValue property from the req.body object

  const item = await TodoSchema.findOne({   //finds the one with having same data as data retrieved from req.body or client side.
     todoItem: data 
    });
  
  const rep = await TodoSchema.replaceOne(   //replace takes two arguments the old value and the new value
    { todoItem: item.todoItem },   //old value which is assigned to todoItem in item.
    { todoItem: newValue }        //replacing with the new value 
  );
  
};

//Delete (DONE)
const deleteTodo = async (req, res) => {
  let { data } = req.body;      //retrieving the item to be deleted from client side.
  const item = await TodoSchema.deleteOne({ todoItem: data });   //deleting the item using deleteOne function.
  console.log(item);
};

// DELETE ALL (DONE)
const deleteAllTodos = async (req, res) => {
  const item = await TodoSchema.deleteMany();  //deleting all the items using deleteMany function.
  console.log(item);
};

const ITEMS_PER_PAGE = 5;

const showTodos = async (req, res) => {


  const page = parseInt(req.query.page) || 1;

  // Put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const countPromise = TodoSchema.estimatedDocumentCount(query);

    const itemsPromise = TodoSchema.find(query).limit(ITEMS_PER_PAGE).skip(skip).exec();

    const [count, items] = await Promise.all([countPromise, itemsPromise]);

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);



    

    res.json({
      pagination: {
        count,
        pageCount,
      },
      items,
    });} catch (error) {
      console.log(error)
      res.status(500).json({
        error: "Internal Server Error",
      });
    }


  // const data = await TodoSchema.find();  //if no argument is given to  find() it shows all the data from todoschema.
  // res.status(200).json({
  //   success: true,
  //   data,
  // });
  // console.log(res)
};


const findTodo = async (req,res) =>{
  let { todo} = req.body;  //Uses object destructuring to extract the data and newValue property from the req.body object
  // console.log(req.body);
  const item = await TodoSchema.find({   //finds the one with having same data as data retrieved from req.body or client side.
     todoItem: todo
    });
    res.status(200).json({
      success: true,
      item,
    });
    console.log(item);
}

const descendingData = async (req,res) =>{ 
  
  
  const page = parseInt(req.query.page) || 1;

  // Put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const countPromise = TodoSchema.estimatedDocumentCount(query);

    const itemsPromise = TodoSchema.find(query).sort({ todoItem: -1 }).limit(ITEMS_PER_PAGE).skip(skip).exec();

    const [count, sort] = await Promise.all([countPromise, itemsPromise]);

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);



    

    res.json({
      pagination: {
        count,
        pageCount,
      },
      sort,
    });} catch (error) {
      console.log(error)
      res.status(500).json({
        error: "Internal Server Error",
      });
}}

const ascendingData = async (req,res) =>{ 

  
  const page = parseInt(req.query.page) || 1;

  // Put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const countPromise = TodoSchema.estimatedDocumentCount(query);

    const itemsPromise = TodoSchema.find(query).sort({ todoItem: 1 }).limit(ITEMS_PER_PAGE).skip(skip).exec();

    const [count, sort] = await Promise.all([countPromise, itemsPromise]);

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);



    

    res.json({
      pagination: {
        count,
        pageCount,
      },
      sort,
    });} catch (error) {
      console.log(error)
      res.status(500).json({
        error: "Internal Server Error",
      });
  
}}


module.exports = { addTodo, editTodo, deleteTodo, deleteAllTodos, showTodos,findTodo ,ascendingData,descendingData};
