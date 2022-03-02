import React from "react";

import { Box, Typography } from '@mui/material';

import Todo from "../Todo/Todo";
import Progress from "../Progress/Progress";

import { TaskType, TodoListType, TodoType } from "../../types/types";

interface TodoListProps {
  selectedTask: TaskType,
  selected: boolean,
}

const TodoList: React.FC<TodoListProps> = ({ selectedTask, selected }) => {

  const todos: TodoListType = selectedTask?.todoList;

  const completedTodos: TodoListType = selectedTask?.todoList.filter((todo) => {
    return todo.status === 'done'
  });

  const progress=(completedTodos?.length/todos?.length)*100;

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
              <Progress value={progress}/>
              {todos?.map((todo: TodoType) => {
                return (
                  <Todo key={todo.id} {...todo} />
                )
              })}
              </>
              :
              <Typography
                variant='h5'
                component='span'
                textAlign={'center'}
              >
                Job list is empty. Please, add some job.
              </Typography>
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
