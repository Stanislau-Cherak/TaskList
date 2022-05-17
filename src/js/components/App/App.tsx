import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import { showMessage } from '../../features/slices/MessageSlice';
import { getTasks, resetTaskError } from '../../features/slices/TaskSlice';
import { getTodos, resetTodoError } from '../../features/slices/TodoSlice';

import { Container } from '@mui/material';

import { getStateMessage, getStateTasks, getStateTodos } from '../../helpers/getState';

import { PreFilterType, AlertType } from '../../types/types';

import Header from '../Header/Header';
import Search from '../Search/Search';
import RadioButtons from '../RadioButtons/RadioButtons';
import WorkArea from '../WorkArea/WorkArea';
import Snack from '../Snack/Snack';
import InputModal from '../Modal/InputModal';
import AlertModal from '../Modal/AlertModal'
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

import './App.scss';

const App: React.FC = () => {

    const dispatch = useAppDispatch();

    const message = useAppSelector(getStateMessage);

    const firstRender = useRef<boolean>(true);

    const [preFilter, setPreFilter] = useState<PreFilterType>('all');
    const [searchMask, setSearchMask] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertType>({ isAlert: false, alertMessage: '' });

    const preFilterChange = (value: PreFilterType): void => {
        setPreFilter(value);
    }

    const searchMaskChange = (value: string): void => {
        setSearchMask(value);
    }

    const handleModalOpen = (): void => {
        setIsModalOpen(true);
    }

    const handleModalClose = (): void => {
        setIsModalOpen(false);
    }

    const handleAlertClose = (): void => {
        dispatch(resetTaskError());
        dispatch(resetTodoError());
        setAlert({ isAlert: false, alertMessage: '' });
    }

    useEffect(() => {
        dispatch(getTasks());
        dispatch(getTodos());
    }, []);

    const tasksStatus = useAppSelector(getStateTasks).status;
    const todosStatus = useAppSelector(getStateTodos).status;
    const taskAlert = useAppSelector(getStateTasks).error;
    const todoAlert = useAppSelector(getStateTodos).error;

    const isTaskAlert = (tasksStatus === 'rejected');
    const isTodoAlert = (todosStatus === 'rejected');

    const isTaskLoading = (tasksStatus === 'loading');
    const isTodoLoading = (todosStatus === 'loading') || (todosStatus === 'pending');

    useEffect(() => {
        if (isTaskAlert || isTodoAlert) {
            setAlert({ isAlert: true, alertMessage: `${taskAlert} ${todoAlert}` });
        }
    }, [isTaskAlert, isTodoAlert]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else if (loading && (!isTaskLoading || !isTodoLoading)) {
            setLoading(false);
        } else if (!loading && (isTaskLoading || isTodoLoading)) {
            setLoading(true);        
        }
    }, [isTaskLoading, isTodoLoading]);

    return (
        <>
            <Container maxWidth="lg">
                <Header onClick={preFilterChange} />
                <Search searchMask={searchMask} onSearchChange={searchMaskChange} onModalOpen={handleModalOpen} />
                <RadioButtons preFilter={preFilter} onChange={preFilterChange} />

                <Routes>
                    <Route path='/' element={<WorkArea preFilter={preFilter} searchMask={searchMask} />}>
                        <Route path='Task/:name' element={<WorkArea preFilter={preFilter} searchMask={searchMask} />} />
                    </Route>
                </Routes>

            </Container>

            <InputModal isOpen={isModalOpen} onClose={handleModalClose} />
            <AlertModal isOpen={alert.isAlert} alertMessage={alert.alertMessage} onClose={handleAlertClose} />
            <CustomBackdrop isOpen={loading} />

            <Snack
                isOpen={message.show}
                message={message.message}
                duration={message.duration}
                severity={message.severity}
                onClose={() => dispatch(showMessage(false))}
            />
        </>
    )
}

export default App;
