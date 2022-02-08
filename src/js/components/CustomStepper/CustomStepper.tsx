import React, { useState } from 'react';

import { useAppDispatch } from '../hooks/hooks';

import { Box, Stepper, Step, StepLabel, Button, Typography, TextField } from '@mui/material';

import uniqid from 'uniqid';

import { addTask } from '../../features/Task/TaskSlice';

import { TaskType, todoListType } from '../../types/types';

const steps = ['Enter task name', 'Create work list', 'Create and ad'];

interface CustomStapperProps {
  openSnack: () => void;
}

const CustomStepper: React.FC<CustomStapperProps> = ({ openSnack }) => {

  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [taskName, setTaskName] = useState('defaultTask');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoList, setTodoList] = useState<todoListType[]>([]);

  const handleAddTodo = () => {
    if (todoDescription) {
      todoList.push({
        parentTask: taskName,
        description: todoDescription,
        state: 'active',
        id: uniqid('todo-')
      })
    }
    setTodoList(todoList);
    setTodoDescription('');
  }

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 2) {
      const task: TaskType = {
        name: taskName,
        todoList: todoList,
        state: 'active',
        id: uniqid('task-')
      }
      dispatch(addTask(task));
      setTodoList([]);
      openSnack();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Add new task</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

          {
            activeStep === 0
              ? <TextField
                id="standard-basic"
                label="Enter task name"
                variant="standard"
                size='small'
                color='primary'
                fullWidth
                value={taskName}
                sx={{ mr: 2 }}
                onChange={(e) => setTaskName(e.target.value)}
              />
              : null
          }

          {
            activeStep === 1
              ? <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="standard-basic"
                  label="Enter work"
                  variant="standard"
                  size='small'
                  color='primary'
                  sx={{ mr: 2, flexGrow: 1 }}
                  value={todoDescription}
                  onChange={(e) => setTodoDescription(e.target.value.trim())}
                />
                <Button onClick={handleAddTodo}>Add</Button>
              </Box>
              : null
          }

          {
            activeStep === 2
              ? <Typography
                variant='h6'
                component='span'
              >
                Click FINISH to complete the create cases.
              </Typography>
              : null
          }

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default CustomStepper;
