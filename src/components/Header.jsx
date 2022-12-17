import React from "react";
import {Link} from  "react-router-dom";
import logo from "../img/Alight Motion Logo Transparent.png";

class Header extends React.Component {
    render() {
    return <header>
        <div className="header">        
            <div>
              <Link to="/">  <img src={logo} alt="logo" className="logo"/> </Link>
            </div>
            <div>
                <a href="https://twitter.com" target={"_blank"} rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://facebook.com" target={"_blank"} rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://github.com" target={"_blank"} rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                <a href="https://instagram.com" target={"_blank"} rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            </div>
        </div>
    </header>
    }
}

export default Header;