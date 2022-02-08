import React, { useState } from 'react';

import { Container } from '@mui/material';

import Header from '../Header/Header';
import Search from '../Search/Search';
import Snack from '../Snack/Snack';

import './App.scss';

const App: React.FC = () => {

    const [isSnackOpen, setIsSnackOpen] = useState(false);

    const handleSnackOpen = () => {
        setIsSnackOpen(true);
    }

    return (
        <>
            <Container maxWidth="lg">
                <Header />
                <Search openSnack={handleSnackOpen} />

            </Container>
            <Snack
                isOpen={isSnackOpen}
                text={'New task succesfully added!'}
                duration={3000} 
                severity={'success'}
                onClose={() => setIsSnackOpen(false)}
            />
        </>
    )
}

export default App;
