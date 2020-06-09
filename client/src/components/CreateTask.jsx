import React, {useState} from "react";
import Form from "react-bootstrap/Form";
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
  date: dateStamp,
  complete: false,
  completedDate: ""
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
    date: dateStamp,
    complete: false,
    completeDate: ""
  });
  event.preventDefault();
}

    return (
      <Form className="task-form" onSubmit={(event) => {props.onAdd(newTask); }}>
        <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Control onClick={expand} onChange={handleNewTask} name="title" value={newTask.title} type="textarea" placeholder="Add a task..." autoComplete="off" rows={1}/>
        </Form.Group><div onChange={handleNewTask} name="date" type="text" value={newTask.date}/>
        <div onChange={handleNewTask} name="complete" type="text" value={newTask.complete}/>
        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
        {isExpanded && <Form.Control onChange={handleNewTask} name="content" value={newTask.content} as="textarea" placeholder="Task Content..." rows={isExpanded ? 3 : 1} />}
        </Form.Group> */}
          <Zoom in={isExpanded}><AddCircleOutlineIcon className="task-button-add" type="submit" onClick={submitTask} fontSize="large"/></Zoom>
      </Form>
      );
    }

export default CreateTask;

//<Zoom in={isExpanded}><Button className="task-button-add" variant="outline-secondary" type="submit" onClick={submitTask}><AddCircleOutlineIcon/></Button></Zoom>
