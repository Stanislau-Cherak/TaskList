import React from "react";

import { useAppSelector } from "../../hooks/hooks";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

import { getStateTasks } from "../../helpers/getState";

import { TaskType, PreFilterType } from "../../types/types";

interface HeaderProps {
    onClick: (preFilter:PreFilterType) => void
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {

    const activeTasksList: TaskType[] = useAppSelector(getStateTasks).tasks.filter(task => {
        return task.status === 'active';
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
