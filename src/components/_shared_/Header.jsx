import React from "react";

import Stats from "../Dashboard/Stats";

import { Box, ResponsiveContext } from "grommet";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <Box style={{width: "100vw"}} animation={{ type: "fadeIn", duration: 1000, delay: 0 }}>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Futurecast</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={currentPath}>
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/decisions">Tools</Nav.Link>
            <Nav.Link href="/edit">Edit</Nav.Link>
          </Nav>
          <ResponsiveContext.Consumer>
            {(size) => (
                <div>
                  {size !== "small" && <Stats/>}
                </div>
            )}
          </ResponsiveContext.Consumer>
        </Navbar.Collapse>
      </Navbar>
    </Box>
  );
};

      // {/*<Box flex={"grow"}>*/}
      // {/*  */}
      // {/*</Box>*/}
      // {/*<Box direction="row-responsive" pad={{ top: "small" }} gap={"small"}>*/}
      // {/*  <a href={"/"}>*/}
      // {/*    <Button primary={currentPath === "/"} icon={<Home/>} label="Home"/>*/}
      // {/*  </a>*/}
      //
      // {/*  <Link to={"/edit"}>*/}
      // {/*    <Button primary={currentPath === "/edit"} icon={<EditIcon/>} label="Edit"/>*/}
      // {/*  </Link>*/}
      //
      // {/*  <Link to={"/decisions"}>*/}
      // {/*    <Button primary={currentPath === "/decisions"} icon={<Tools />} label='Tools'/>*/}
      // {/*  </Link>*/}
      //
      // {/*  <Link to={"/"}>*/}
      // {/*    <Button primary={false} icon={<Logout/>} label='logout' onClick={auth.logout}/>*/}
      // {/*  </Link>*/}
      // {/*</Box>*/}
export default Header;