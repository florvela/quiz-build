import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//fixed="top"
function NavBar(props) {
	return (
		<>
			<Navbar bg="danger" className="nav-link" variant="dark">
				<Navbar.Brand className="brand" href="/home">
					Quiz Builder
				</Navbar.Brand>
				
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/home">
							Home
						</Nav.Link>
						<Nav.Link href="/quiz/1">
							Test quiz
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default NavBar;