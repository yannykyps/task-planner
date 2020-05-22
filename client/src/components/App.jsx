import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateTask from "./CreateTask";
import Task from "./Task";
import CreateColumn from "./CreateColumn";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import LabalColumn from "./LabelColumn";
import LabelColumn from "./LabelColumn";


function App () {

const [tasks, setTasks] = useState([]);

function addTask(newTask, event) {
    setTasks(prevItems => {
      return [...prevItems, newTask];
      
    });
        
}

function deleteTask(id) {
    setTasks(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }


return ( <div>
    <Header />
    <Container>  
    <CreateTask onAdd={addTask}/>
    <LabelColumn />
    
    {tasks.map((taskItem, index) => (
    <Task 
    key={index}
    id={index}
    title={taskItem.title}
    content={taskItem.content}
    date={taskItem.date}
    onChecked={deleteTask}
    />
    ))}
   
    </Container>
    <Footer />   
</div>
)
}

export default App;

