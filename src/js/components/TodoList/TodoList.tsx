import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

import { Box, Typography } from '@mui/material';

import { getStateTodos } from "../../helpers/getState";

import Todo from "../Todo/Todo";
import Progress from "../Progress/Progress";
import AddTodo from "../AddTodo/AddTodo";

import { TodoListType, TodoType, PreFilterType, StatusType } from "../../types/types";
import { asyncToggleTask } from "../../features/slices/TaskSlice";

interface TodoListProps {
  taskID: string,
  status?: StatusType,
  selected: boolean,
  preFilter: PreFilterType,
  searchMask: string,
}

const TodoList: React.FC<TodoListProps> = ({ taskID, status, selected, preFilter, searchMask }) => {

  const dispatch = useAppDispatch();
  const todos: TodoListType = useAppSelector(getStateTodos).todos.filter(todo => todo.parentTaskID === taskID);

  const prefilteredTodos: TodoListType = (preFilter === 'all'
    ? todos
    : todos?.filter((todo) => todo.status === preFilter)
  );

  const postfilteredTodo: TodoListType = prefilteredTodos?.filter((todo) => {
    return todo.description.toLowerCase().includes(searchMask.toLowerCase())
  }
  );

  const activeTodos: TodoListType = postfilteredTodo?.filter((todo) => {
    return todo.status === 'active';
  });

  const completedTodos: TodoListType = postfilteredTodo?.filter((todo) => {
    return todo.status === 'done';
  });

  const totalCompletedTodos: TodoListType = todos?.filter((todo) => {
    return todo.status === 'done';
  })

  const progress = (totalCompletedTodos?.length / todos?.length) * 100;

  useEffect(()=>{
    if (status === 'active' && progress === 100) {
      dispatch(asyncToggleTask(taskID));
    }  
    if (status === 'done' && progress !== 100) {
      dispatch(asyncToggleTask(taskID));
    }
  }, [progress])

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {selected
        ?
        <>
          {
            todos.length != 0
              ?
              <>
                <Typography
                  variant='h5'
                  component='span'
                  sx={{
                    mb: 2
                  }}
                >
                  Complete:
                </Typography>
                <Progress value={progress} />
                <AddTodo taskID={taskID}  />
                {[...activeTodos, ...completedTodos].map((todo: TodoType) => {
                  return (
                    <Todo key={todo.id} {...todo} />
                  )
                })}
              </>
              :
              <>
                <Typography
                  variant='h5'
                  component='span'
                  textAlign={'center'}
                  sx={{
                    mb: 3,
                  }}
                >
                  Job list is empty. Please, add some job.
                </Typography>
                <AddTodo taskID={taskID}  />
              </>
          }
        </>
        :
        <Typography
          variant='h5'
          component='span'
          textAlign={'center'}
        >
          Please, choose task.
        </Typography>
      }
    </Box>
  )
}

export default TodoList;
