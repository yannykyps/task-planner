import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Zoom from '@material-ui/core/Zoom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function CreateTask (props) {

var dateStamp = new Date();
var dd = String(dateStamp.getDate()).padStart(2, '0');
var mm = String(dateStamp.getMonth() + 1).padStart(2, '0');
var yyyy = dateStamp.getFullYear();
dateStamp = dd + '/' + mm + '/' + yyyy;

const [isExpanded, setExpanded] = useState(false)
const [newTask, setNewTask] = useState({
  title:"",
  content:"",
  date: dateStamp
})

function handleNewTask(event) {
  const {value, name} = event.target;
     setNewTask(prevValue => ({
         ...prevValue, [name]: value
      
        }));
         
}

function expand() {
  setExpanded(true);
}

function submitTask(event) {
  props.onAdd(newTask);
  setNewTask({
    title: "",
    content: "",
    date: ""
  });
  event.preventDefault();
  }

    return (
      <Form className="task-form" onSubmit={(event) => {props.onAdd(newTask); }}>
        <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Control onClick={expand} onChange={handleNewTask} name="title" value={newTask.title} type="textarea" placeholder="Add a task..." autoComplete="off" rows={1}/>
        </Form.Group><div onChange={handleNewTask} name="date" type="text" value={newTask.date}/>
        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
        {isExpanded && <Form.Control onChange={handleNewTask} name="content" value={newTask.content} as="textarea" placeholder="Task Content..." rows={isExpanded ? 3 : 1} />}
        </Form.Group> */}
          <Zoom in={isExpanded}><Button variant="outline-secondary" type="submit" onClick={submitTask}><AddCircleOutlineIcon/></Button></Zoom>
         
      </Form>
      );
    }

export default CreateTask;


