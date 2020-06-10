import React, {useState, useEffect, useCallback, useRef} from "react";

import Header from "./Header";
import Footer from "./Footer";
import CreateTask from "./CreateTask";
import Task from "./Task";
import DropdownOptions from "./DropdownOptions";

import Container from "react-bootstrap/Container";
import axios from "axios";

function App () {

const [tasks, setTasks] = useState([]);
const forceUpdate = useCallback(() => setTasks([]),[]);
const isComplete = useRef("false");

function addTask(newTask) {
  axios.post("/api/task", {
    title: newTask.title,
    content: newTask.content,
    date: newTask.date,
    complete: newTask.complete
  })
  .then(function (response){
    console.log(response);
    getTasks();
  })        
}

function deleteTask(id) {
  axios.delete("/api/task/" +id, {
    params: {id}
  }).then(function(response) {
      console.log(response);
      getTasks();
  }).catch(function (error) {
      console.log(error);  }
)}          
  
async function getTasks() {
    try {  
    const response = await axios.get("/api/task", {params: {complete:isComplete.current}});
    forceUpdate();
    setTasks(response.data);  
  } catch (error) {
    console.error(error);
    }
}

function patchEditTask(patchTask, id) {
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
  var dd = String(dateStamp.getDate()).padStart(2, "0");
  var mm = String(dateStamp.getMonth() + 1).padStart(2, "0");
  var yyyy = dateStamp.getFullYear();
  dateStamp = dd + "/" + mm + "/" + yyyy;

  axios.patch("/api/task/" +id, { 
    complete: true,
    completedDate: dateStamp  
  }).then(function(response) {
    console.log(response)
    getTasks();
  }).catch(function (error) {
    console.log(error);  
  }) 
}  

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

function dropdownValue (event) {
  const value = event.value;
  
  value === "true" ? isComplete.current = "true" 
  : !value === "false" ? isComplete.current = "false"
  : isComplete.current = null
  getTasks(); 
} 

useEffect(() => {
  getTasks(); 
}, []);

return ( <div>
    <Header />
    <Container>
    <CreateTask onAdd={addTask}/>
    <DropdownOptions onSelect={dropdownValue}/>
    <ColumnLabel />  
    {tasks.map((taskItem, index) => (
    <Task 
    key={index}
    id={taskItem._id}
    title={taskItem.title}
    date={taskItem.date}
    onChecked={deleteTask}
    onBlur={patchEditTask}
    onComplete={completeTask}
    onCompleteTick={() => taskItem.complete}
    />  
    ))}
    </Container>
    <Footer />   
</div>
)
}

export default App;