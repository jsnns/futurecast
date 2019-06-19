import React from "react";

import Stats from "../Widgit/Stats";

import { Link } from "react-router-dom";
import { Box, Button } from "grommet";
import { Edit as EditIcon, Home, Logout, UserSettings } from "grommet-icons/es6";
import { auth } from "../../routes";

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <Box direction={"row-responsive"} pad={"medium"} animation={{ type: "fadeIn", duration: 1000, delay: 0 }}>
      <Box flex={"grow"}>
        <Stats/>
      </Box>
      <Box direction="row" pad={{ top: "small" }} gap={"small"}>
        <Link to={"/"}>
          <Button primary={currentPath === "/"} icon={<Home/>} label="Home"/>
        </Link>

        <Link to={"/edit"}>
          <Button primary={currentPath === "/edit"} icon={<EditIcon/>} label="Edit"/>
        </Link>

        <Link to={"/profile"}>
          <Button primary={currentPath === "/profile"} icon={<UserSettings/>} label='Profile'/>
        </Link>
        <Link to={"/"}>
          <Button primary={false} icon={<Logout/>} label='logout' onClick={auth.logout}/>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;