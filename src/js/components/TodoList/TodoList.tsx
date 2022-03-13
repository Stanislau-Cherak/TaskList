import React from "react";

import { Box, Typography } from '@mui/material';

import Todo from "../Todo/Todo";
import Progress from "../Progress/Progress";
import AddTodo from "../AddTodo/AddTodo";

import { TaskType, TodoListType, TodoType, PreFilterType } from "../../types/types";

interface TodoListProps {
  selectedTask: TaskType,
  selected: boolean,
  preFilter: PreFilterType,
  searchMask: string,
}

const TodoList: React.FC<TodoListProps> = ({ selectedTask, selected, preFilter, searchMask }) => {

  const todos: TodoListType = selectedTask?.todoList;

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

  const totalCompletedTodos: TodoListType=selectedTask?.todoList.filter((todo)=>{
    return todo.status === 'done';
  })

  const progress = (totalCompletedTodos?.length / todos?.length) * 100;

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
                <AddTodo taskID={selectedTask?.id} />
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
                <AddTodo taskID={selectedTask?.id} />
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
