import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks/hooks';

import { showMessage } from '../../features/slices/MessageSlice';

import { Container } from '@mui/material';

import { PreFilterType } from '../../types/types';

import Header from '../Header/Header';
import Search from '../Search/Search';
import RadioButtons from '../RadioButtons/RadioButtons';
import WorkArea from '../WorkArea/WorkArea';
import Snack from '../Snack/Snack';
import CustomModal from "../CustomModal/CustomModal";


import './App.scss';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {

    const dispatch = useAppDispatch();

    const message = useAppSelector(state => state.message);

    const [preFilter, setPreFilter] = useState<PreFilterType>('all');
    const [searchMask, setSearchMask] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const preFilterChange = (value: PreFilterType): void => {
        setPreFilter(value);
    }

    const searchMaskChange = (value: string): void => {
        setSearchMask(value);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

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

            <CustomModal isOpen={isModalOpen} onClose={handleModalClose} />

            <Snack
                isOpen={message.show}
                message={message.message}
                duration={message.duration}
                severity={message.severity}
                onClose={() => dispatch(showMessage({ show: false }))}
            />
        </>
    )
}

export default App;
