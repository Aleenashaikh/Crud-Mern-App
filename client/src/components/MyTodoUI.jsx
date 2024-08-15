import React from "react";
import Todo from "./Todo";
import { TextField } from "@mui/material";
import add from "../img/add.png";
import search from "../img/search.png";
import deleteicon from "../img/delete.png";
import cancelIcon from "../img/cancel.png";
import editIcon from "../img/edit.png";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';



import "../App.css";
import { useEffect } from "react"
const MyTodo = (props) => {    //using props to include the list of data from Todo that is exported from Todo.js file.
  var listOfTodos = [];
  useEffect(() => {
    listOfTodos = props.showTodos();
  }, [props.page])       //using useEffect such that data is shown when restart or reloading the page.
  



  return (
    <div className="main-div">
      <h1>My React Todo </h1>
      <center>
        <div className="inputs-and-buttons">
          <TextField
            onChange={(e) => props.setText(e.target.value)}
            value={props.text}
            className="input-field"
            id="standard-basic"
            label="Enter your todo . . ."
            variant="standard"
          />


          <span className="btn-div">
            <button className="add-btn" onClick={props.addItem}>
              <img src={add}></img>
            </button>
            <button className="delete-btn" onClick={props.deleteAll}>
              <img src={deleteicon}></img>
            </button>
            <button onClick={props.findItem} className="search-btn" >
              <img src={search} alt="" />
            </button>
          </span>
        </div>
        <br />
        <Button variant="outlined" onClick={props.ascSort} className="filter">Ascending</Button>

        <Button variant="outlined" onClick={props.desSort}>Descending</Button>




      </center>
      <center>
        <ul className="todoList">
          {props.list.map((items, index) => {      //importing the state list from Todo.js file
            //using map function to make <li> for each element of list.
            return (
              <li key={index}>

                <div>
                  <span className="todoItems">{items}</span>
                  <span className="todo-btn-div">
                    <button
                      onClick={() => props.deleteItem(index)}
                      className="del-btn"
                    >
                      <img src={cancelIcon}></img>
                    </button>
                    <button
                      onClick={() => props.editItem(index)}
                      className="edit-btn"
                    >
                      <img src={editIcon}></img>
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
    
        <Button variant="outlined" id="showAll" onClick={props.showAll}>Show All</Button>
      </center>
      
      <div className="pagination" id="pagination" >
        <p>Page: {props.page}/{props.pageCount}  </p><br />
        <button disabled={props.page === 1} onClick={props.handlePagination}>
          &lt;
        </button>
        <Pagination count={props.pageCount} color="primary" onClick={props.handlePagination}/>
        <button disabled={props.page === props.pageCount} onClick={props.handlePagination}>
          &gt;
        </button>
      </div>






    </div>
  );
};

export default MyTodo;
