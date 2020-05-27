import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateTask from "./CreateTask";
import Task from "./Task";
import Container from "react-bootstrap/Container";
import LabelColumn from "./LabelColumn";
import axios from "axios";

function App () {

const [tasks, setTasks] = useState([]);

function addTask(newTask, event) {
  axios.post("/api/task", {
    title: newTask.title,
    content: newTask.content,
    date: newTask.date
  })
  .then(function (response){
    console.log(response);
  })         
}

function deleteTask(id) {
    axios.delete("/api/task/" +id, {
    params: {
      id: id
    }
    }).then(function(response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);  
    })   
}
 
  useEffect(() => {
      getTasks();
    }, [tasks])
  

  async function getTasks() {
    try {
    const response = await axios.get("/api/task");
    setTasks(response.data);
  } catch (error) {
    console.error(error);
    }
  }

  function blurEditTask(patchTask, id) {
    axios.patch("/api/task/" +id, { 
      title: patchTask
    })
    .then(function(response) {
      console.log(response)
    }) 
    .catch(function (error) {
      console.log(error);  
    }) 
  }
  
 
return ( <div>
    <Header />
    <Container>  
    <CreateTask onAdd={addTask}/>
    <LabelColumn />
    
    {tasks.map((taskItem, index) => (
    <Task 
    key={index}
    id={taskItem._id}
    title={taskItem.title}
    content={taskItem.content}
    date={taskItem.date}
    onChecked={deleteTask}
    onBlur={blurEditTask}
    />  
    ))}
    </Container>
    <Footer />   
</div>
)
}

export default App;