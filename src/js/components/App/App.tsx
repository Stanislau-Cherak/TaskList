import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks/hooks';

import { showMessage } from '../../features/Task/MessageSlice';

import { Container } from '@mui/material';

import Header from '../Header/Header';
import Search from '../Search/Search';
import RadioButtons from '../RadioButtons/RadioButtons';
import Snack from '../Snack/Snack';

import './App.scss';

const App: React.FC = () => {

    const dispatch = useAppDispatch();

    const message = useAppSelector(state => state.message);

    const [preFilter, setPreFilter] = useState<string>('all');

    const preFilterChange = (value: string): void => {
        setPreFilter(value);
    }

    return (
        <>
            <Container maxWidth="lg">
                <Header onClick={preFilterChange} />
                <Search />
                <RadioButtons preFilter={preFilter} onChange={preFilterChange} />

            </Container>
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
