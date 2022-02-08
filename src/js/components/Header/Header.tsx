import React from "react";

import { useAppSelector } from "../hooks/hooks";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

import { TaskType } from "../../types/types";

const Header: React.FC = () => {

    const activeTasksList: TaskType[] = useAppSelector(state => state.tasks).filter(task=>{
        return task.state==='active';
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
