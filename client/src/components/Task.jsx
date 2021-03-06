import React, {useState, useRef} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ContentEditable from "react-contenteditable";

function Task(props) {

const [isExpanded, setExpanded] = useState(false);
const patchTask = useRef(props.title);

function expand() {
    return isExpanded ? setExpanded(false) : setExpanded(true) 
}

function handleEditTask(event) {
       patchTask.current = event.target.value;
}

return (<div className="task"><div onClick={expand} className="task-row" style={isExpanded ? {height: "auto"}: {height: 50}}>
  <div className={"task-button-check-" + props.onCompleteTick(props.complete)} value="complete" onClick={() => {props.onComplete(props.id)}}><CheckCircleOutlineIcon /></div>
  <label className="task-label"><ContentEditable className="text-editable" html={patchTask.current} onChange={handleEditTask} onBlur={() => {props.onBlur(patchTask.current, props.id)}} /></label>
  <div className="task-button-delete" style={isExpanded ? {visibility: "visible"}: {visibility: "hidden"}} onClick={() => {props.onChecked(props.id)} }><DeleteIcon /></div>
  <br/>
  {isExpanded && <label className="task-date"><p>Created: {props.date}</p></label>}
  </div>
  </div>
    );
}

export default Task;
// style={isExpanded ? {height: "auto"}: {height: 20}} 
//{"task-button-check-" + props.onCompleteTick()}
