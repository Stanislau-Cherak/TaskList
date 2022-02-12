import React from "react";

import { useAppSelector } from "../hooks/hooks";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

import { TaskType } from "../../types/types";

interface HeaderProps {
    onClick: (preFilter:string) => void
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {

    const activeTasksList: TaskType[] = useAppSelector(state => state.tasks).filter(task => {
        return task.state === 'active';
    });

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
                    onClick={()=>onClick('active')}
                >
                    <Badge
                        color='warning'
                        badgeContent={activeTasksList.length}
                    >
                        <WorkIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>

    )
}

export default Header;
