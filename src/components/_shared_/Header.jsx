import React from "react";

import Stats from "../Dashboard/Stats";

import { Link } from "react-router-dom";
import { Box, Button } from "grommet";
import { auth } from "../../routes";
import { Edit as EditIcon, Home, Logout, Tools } from "grommet-icons";

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <Box direction={"row-responsive"} pad={"medium"} animation={{ type: "fadeIn", duration: 1000, delay: 0 }}>
      <Box flex={"grow"}>
        <Stats/>
      </Box>
      <Box direction="row-responsive" pad={{ top: "small" }} gap={"small"}>
        <a href={"/"}>
          <Button primary={currentPath === "/"} icon={<Home/>} label="Home"/>
        </a>

        <Link to={"/edit"}>
          <Button primary={currentPath === "/edit"} icon={<EditIcon/>} label="Edit"/>
        </Link>

        <Link to={"/decisions"}>
          <Button primary={currentPath === "/decisions"} icon={<Tools />} label='Tools'/>
        </Link>

        <Link to={"/"}>
          <Button primary={false} icon={<Logout/>} label='logout' onClick={auth.logout}/>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;