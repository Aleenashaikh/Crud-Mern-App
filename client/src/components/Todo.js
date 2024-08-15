import React, { useState } from "react";
import MyTodo from "./MyTodoUI";
import { useEffect } from "react";
// import {useState} from "react";
import axios from "axios";
const Todo = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);





  function handlePagination(event) {

    if (event.target.textContent === "<") {
      if (parseInt(page) === 1) {
        setPage(page);
      } else {
        setPage(parseInt(page) - 1);
      }
    } else if (event.target.textContent === ">") {
      if (parseInt(page) === pageCount) {
        setPage(page);
      } else {
        setPage(parseInt(page) + 1);
      }
    } else {
      var p = parseInt(event.target.textContent);
      setPage(p);
    }
  }




  const addItem = async () => {   //whenever new data is entered
    if (!text) {
      alert("Please fill the input field");
    } else {
      setList([...list, text]);  // updating the list to shoe on frontend

      let dataSend = {
        todo: text,        //converting new data into json format such that it can be entered in database.
      };

      const res = await fetch(`http://localhost:8000/todo/addTodo`, {   //calling add API from backend
        method: "POST",
        body: JSON.stringify(dataSend),  //sending the data in json format
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // HANDLING ERRORS
        .then((res) => {
          console.log(res.status);
        });

      setText("");
    }
  };

  const deleteItem = async (id) => {
    // BACKEND
    let dataSend = {
      data: list[id],
    };
    const updatedItems = list.filter((element, index) => {
      return index !== id;     //returning all items accept the one deleted to show on frontend!
    });
    setList(updatedItems);
    const res = await fetch(`http://localhost:8000/todo/deleteTodo`, {   //calling delete API from backend
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // FRONTEND
  };

  const deleteAll = async () => {
    setList([]);     //setList is emptied to show on frontend.
    const res = await fetch(`http://localhost:8000/todo/deleteAllTodos`, { //calling deleteAll API from backend
      method: "POST",
      //  body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const editItem = async (id) => {
    let newValue = prompt("Enter new value", list[id]);
    let dataSend = {
      data: list[id],
      newValue: newValue,
    };
    list[id] = newValue;
    setList([...list]);     //added updated value to the list to show on frontend.
    const res = await fetch(`http://localhost:8000/todo/editTodo`, {  //calling edit API from backend
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const findItem = async () => {
    var response;
    if (!text) {
      alert("Please fill the input field");
    } else {
      let dataSend2 = {
        todo: text,        //converting new data into json format such that it can be entered in database.
      };

      const res = await fetch(`http://localhost:8000/todo/findTodo`, {  //calling edit API from backend
        method: "POST",
        body: JSON.stringify(dataSend2),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

        .then((res) => {
          console.log(res);
          return res.json(); // Parse the response data as JSON
        })
        .then((data) => {
          // Access the parsed response data
          response = data.item;
          let newList = response.map((item, index) => item.todoItem);
          setList(newList);
          newList = [];


        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error(error);

        });

      var showAll = document.getElementById("showAll");
      showAll.style.display = "block";

      var pagination = document.getElementById("pagination");
      pagination.classList.add("hide");

    }
  };


  const ascSort = async () => {
    var response;
    const res = await fetch(`http://localhost:8000/todo/ascSort?page=${page}`, {   //calling showAll API from backend
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    response = await res.json();
    const responseData = response.sort;
    console.log(responseData)
    setPageCount(response.pagination.pageCount);
    let newList = responseData.map((item, index) => item.todoItem);
    setList(newList);
    newList = [];
  }


  const desSort = async () => {
    var response;
    console.log("desc todo working");
    const res = await fetch(`http://localhost:8000/todo/desSort?page=${page}`, {   //calling showAll API from backend
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    response = await res.json();
    const responseData = response.sort;
    console.log(responseData)
    setPageCount(response.pagination.pageCount);
    let newList = responseData.map((item, index) => item.todoItem);
    setList(newList);
    newList = [];
  }

  const showAll = () => {
    showTodos();
    var showAll = document.getElementById("showAll");
    showAll.style.display = "none";
    var pagination = document.getElementById("pagination");
    pagination.classList.remove("hide");

  }

  const showTodos = async () => {
    var pgNo = document.getElementById("pgNo");
    var response;

    const res = await fetch(`http://localhost:8000/todo/showTodos?page=${page}`, {   //calling showAll API from backend
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    response = await res.json();
    const responseData = response.items;
    console.log(responseData)
    setPageCount(response.pagination.pageCount);
    let newList = responseData.map((item, index) => item.todoItem);
    setList(newList);
    newList = [];
  }

  return (
    <div>
      <MyTodo
        deleteAll={deleteAll}
        addItem={addItem}
        deleteItem={deleteItem}
        editItem={editItem}
        showTodos={showTodos}
        findItem={findItem}
        text={text}
        setText={setText}
        list={list}
        page={page}
        pageCount={pageCount}
        setList={setList}
        showAll={showAll}
        ascSort={ascSort}
        desSort={desSort}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Todo;
