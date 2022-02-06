import React from "react";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

import './Header.scss';

const Header: React.FC = () => {
    return (
        <AppBar
            position='static'
            sx={{ mb: 5 }}
        >
            <Toolbar>
                <Typography
                    variant='h5'
                    component='span'
                    sx={{ flexGrow: 1 }}
                >
                    TaskList
                </Typography>
                <IconButton
                    color='inherit'
                >
                    <Badge
                    color='warning'
                    badgeContent={5}
                    >
                        <WorkIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>

    )
}

export default Header;
