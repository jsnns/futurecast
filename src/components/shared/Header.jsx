import React from "react";

import Stats from "../Widgit/Stats";

import { Box, Button } from "grommet";
import { Edit as EditIcon, Logout, UserSettings, Home } from "grommet-icons/es6";
import { auth } from "../../routes";

const Header = (props) => {
    const currentPath = window.location.pathname

    return (
        <Box direction={"row-responsive"} pad={"medium"}>
            <Box flex={"grow"}>
                <Stats />
            </Box>
            <Box direction="row" alignSelf="center" gap={"small"}>
                <Button primary={currentPath === "/"} icon={<Home />} label="Home" href="/" />
                <Button primary={currentPath === "/edit"} icon={<EditIcon />} label="Edit" href="/edit" />
                <Button primary={currentPath === "/profile"} icon={<UserSettings />} label='Profile' href='/profile' />
                <Button primary={false} icon={<Logout />} label='logout' onClick={auth.logout} />
            </Box>
        </Box>
    )
}

export default Header;