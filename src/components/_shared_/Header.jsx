import React from "react";

import Stats from "../Dashboard/Stats";

import { Link } from "react-router-dom";
import { Box, Button } from "grommet";
import { auth } from "../../routes";
import { Edit as EditIcon, Home, Logout, UserSettings } from "grommet-icons";

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <Box direction={"row-responsive"} pad={"medium"} animation={{ type: "fadeIn", duration: 1000, delay: 0 }}>
      <Box flex={"grow"}>
        <Stats/>
      </Box>
      <Box direction="row-responsive" pad={{ top: "small" }} gap={"small"}>
        <Link to={"/"}>
          <Button primary={currentPath === "/"} icon={<Home/>} label="Home"/>
        </Link>

        <Link to={"/edit"}>
          <Button primary={currentPath === "/edit"} icon={<EditIcon/>} label="Edit"/>
        </Link>

        <Link to={"/decisions"}>
          <Button primary={currentPath === "/decisions"} icon={<UserSettings/>} label='Decisions'/>
        </Link>

        <Link to={"/"}>
          <Button primary={false} icon={<Logout/>} label='logout' onClick={auth.logout}/>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;