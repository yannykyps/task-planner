import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateTask from "./CreateTask";
import Task from "./Task";
import DropdownOptions from "./DropdownOptions"
import Container from "react-bootstrap/Container";
import axios from "axios";

function App () {

const [tasks, setTasks] = useState([]);
const [isComplete, setIsComplete] = useState(false);

function addTask(newTask, event) {
  axios.post("/api/task", {
    title: newTask.title,
    content: newTask.content,
    date: newTask.date,
    complete: newTask.complete
  })
  .then(function (response){
    console.log(response);
  })   
       
}

function deleteTask(id) {
  axios.delete("/api/task/" +id, {
    params: {id}
  }).then(function(response) {
      console.log(response);
      setTasks([]);
  }).catch(function (error) {
      console.log(error);  }
  )} 
         
async function getTasks() {
  
  try {
    const response = await axios.get("/api/task", {params: {complete:isComplete}});
    setTasks(response.data);
      
  } catch (error) {
    console.error(error);
    }
  }

function blurEditTask(patchTask, id) {
  axios.patch("/api/task/" +id, { 
    title: patchTask
  }).then(function(response) {
      console.log(response)
  }).catch(function (error) {
      console.log(error);  
    }) 
  }

function completeTask(id) {
  var dateStamp = new Date();
  var dd = String(dateStamp.getDate()).padStart(2, '0');
  var mm = String(dateStamp.getMonth() + 1).padStart(2, '0');
  var yyyy = dateStamp.getFullYear();
  dateStamp = dd + '/' + mm + '/' + yyyy;
  
  axios.patch("/api/task/" +id, { 
    complete: true,
    completedDate: dateStamp 
    
  }).then(function(response) {
      console.log(response)
  }).catch(function (error) {
      console.log(error);  
    }) 
  }  

useEffect(() => {
  getTasks();
}, );

function ColumnLabel (){

const [isVisible, setIsVisible] = useState(true);

  function setVisilility () { 
    return (tasks.length <1 && setIsVisible(false));

  }
      return (<div 
      className="task-title" ref={setVisilility} style={{visibility: isVisible ? "visible" : "hidden"}}>
      <h5>Tasks</h5>

      </div> );
  }
 

return ( <div>
    <Header />
    <Container>
    <CreateTask onAdd={addTask}/>
    <DropdownOptions />
    <ColumnLabel />  
    {tasks.map((taskItem, index) => (
    <Task 
    key={index}
    id={taskItem._id}
    title={taskItem.title}
    content={taskItem.content}
    date={taskItem.date}
    onChecked={deleteTask}
    onBlur={blurEditTask}
    onComplete={completeTask}
    />  
    ))}
    </Container>
    <Footer />   
</div>
)
}

export default App;