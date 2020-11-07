import React , {Component} from 'react';
import {Navbar,Form, FormControl ,Button ,Nav ,NavDropdown} from "react-bootstrap";
// import Nav from "react-bootstrap";
// import NavDropdown from "react-bootstrap";
// import Button from "react-bootstrap";

class NavBar extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Navbar bg="light" expand="lg" style={{paddingLeft:'250px',paddingRight:'250px'}}>
                {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">About</Nav.Link>
                        <NavDropdown title="Studios" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Studio 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Studio 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Studio 3</NavDropdown.Item>
                            {/*<NavDropdown.Divider />*/}
                            {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                    <div inline>
                        <Button variant="">Contact us</Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavBar;
