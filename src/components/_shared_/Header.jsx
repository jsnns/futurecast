import React from "react";

import Stats from "../Dashboard/Stats";

import { Box, ResponsiveContext } from "grommet";
import { Navbar, Nav } from "react-bootstrap";
import DropdownUserReports from "./DropdownUserReports";

const Header = () => {
	const currentPath = window.location.pathname;

	return (
		<Box style={{ width: "100vw", zIndex: 1000 }}>
			<Navbar expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="/">Futurecast</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto" activeKey={currentPath}>
						<Nav.Link href="/">Dashboard</Nav.Link>
						<Nav.Link href="/decisions">Tools</Nav.Link>
						<Nav.Link href="/edit">Edit</Nav.Link>
						<DropdownUserReports />
					</Nav>
					<ResponsiveContext.Consumer>
						{(size) => (
							<div>
								{size !== "small" && <Stats />}
							</div>
						)}
					</ResponsiveContext.Consumer>
				</Navbar.Collapse>
			</Navbar>
		</Box>
	);
};

export default Header;
