import React, {useState} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function DropdownOptions (props) {

const [selected, setSelected] = useState("one");

    const options = [
        'one', 'two', 'three'
      ];


function dropdownChange(option) {
    console.log("You selected", option.value);
    return setSelected(option.value);
    
    
} 
      


    return(
       <Dropdown options={options} onChange={dropdownChange} value={selected} placeholder="Select an option" />

    );

}

export default DropdownOptions;