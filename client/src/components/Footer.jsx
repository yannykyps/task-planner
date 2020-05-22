import React from "react";

function Footer () {
    const year = new Date().getFullYear();
    return ( <div>
            <footer>Yanny Kyprianou ⓒ {year}</footer>
    </div>)
}

export default Footer;