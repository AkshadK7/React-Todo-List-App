import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useEffect} from 'react';
import firebase from "firebase";
import { db } from "./firebase_config";
import TodoListItem from "./Todo"

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './img/logo.png';

function App() {

  const [todos, setTodos] = useState([]);

    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
      getTodos();
    }, [])  // Blank to run only on first launch


    function getTodos() {
      db.collection("todos").onSnapshot(function (querySnapshot) {
        setTodos(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            inprogress: doc.data().inprogress
          }))
        );
      });
    }

    function addTodo(e) {

      e.preventDefault();

      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,

      });

      setTodoInput("");
      
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));
  
    const classes = useStyles();



  return (
    <div className="App" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      
    }}>

      <AppBar>
        <Toolbar>
        <img src={logo} style={{width:200, marginTop: -7}} />
        </Toolbar>
      </AppBar>

    <div style={
    {
      border: '1px solid black',
     marginTop: '8%',
     backgroundColor: '#4A646C'
    }
  }> 
      <h1>To-Do List App</h1>
      <form>
        <TextField 
          id="outlined-basic" 
          label="Write a Todo" 
          variant="outlined"
          value={todoInput} 
          onChange={(e) => setTodoInput(e.target.value)} 
          style={{ maxWidth:"300px", width: "90vw"}}
          />
          <Button type="submit" variant="contained" onClick={addTodo} 
          style={{display:"none"}}>Default</Button>
      </form>

      {todos.map((todo) => (
        <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id} />
      ))}
      </div>
      <footer style={{paddingTop: "10%"}}> <div id="Copyright">&#60;Crafted by Akshad Kolhatkar&#62;</div></footer>
    </div>
  );
}

export default App;
