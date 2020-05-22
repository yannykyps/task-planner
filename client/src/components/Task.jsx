import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from '@material-ui/core/Zoom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';


function Task(props) {


const [isExpanded, setExpanded] = useState(false)

function expand() {
    return isExpanded ? setExpanded(false) : setExpanded(true) 
}



  return (<div className="task"><div onClick={expand} className="task-row" style={isExpanded ? {height: "auto"}: {height: 50}}>
        <div className="task-button-check"><CheckCircleOutlineIcon /></div>
        <label  className="task-label"><div className="text-editable" contentEditable="true" style={isExpanded ? {height: "auto"}: {height: 20}}>{props.title}</div></label>
        <div className="task-button-delete" style={isExpanded ? {visibility: "visible"}: {visibility: "hidden"}} onClick={() => {props.onChecked(props.id)} }><DeleteIcon /></div>
        <br/> 
        {isExpanded && <label className="task-label" contentEditable="true"><div className="text-editable"><p>{props.content}</p></div></label>}
        {isExpanded && <label className="task-date"><p>{props.date}</p></label>}
        </div>
        </div>
    );
}

export default Task;


        {/* <Zoom in={isExpanded}><div className="task-button" onClick={() => {props.onChecked(props.id)} }><DeleteIcon /></div></Zoom> */}
        {/* <Zoom in={isExpanded}><div className="task-button-check" onClick={() => {props.onChecked(props.id)} }><CheckCircleOutlineIcon /></div></Zoom> */}



