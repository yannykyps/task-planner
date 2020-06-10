import React, {useState} from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function DropdownOptions (props) {

const [selected, setSelected] = useState("Incomplete Tasks");

    const options = [
        {value: "false", label: "Incomplete Tasks"}, 
        {value: "true", label: "Complete Tasks"},
        {value: null, label: "All Items"}
      ];

function dropdownChange(event) {
  setSelected(event.label);
    }  

    return(
    <Dropdown className="dropdown" options={options} onChange={(event) => {dropdownChange(event); props.onSelect(event)}} value={selected}/>     
    );

}

export default DropdownOptions;