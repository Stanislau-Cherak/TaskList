import React, { useState } from "react";
import { Grid, Button, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import CustomModal from "../CustomModal/CustomModal";

interface SearchProps {
    openSnack: () => void;
}

const Search: React.FC <SearchProps>= ({ openSnack }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Grid
                container
                spacing={4}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 5 }}
            >
                <Grid item xs='auto' >
                    <Button
                        variant='contained'
                        onClick={handleModalOpen}
                    >
                        Create
                    </Button>
                </Grid>

                <Grid item xs={12} sm={9} md={10}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id='outlined-search'
                            label='Search task'
                            type='search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            size='small'
                            color='primary'
                            fullWidth
                            sx={{ mr: 2 }}
                        />
                        <Button variant='contained'>Search</Button>
                    </Box>
                </Grid>
            </Grid>
            {
                isModalOpen
                    ? <CustomModal isOpen={isModalOpen} onClose={handleModalClose} openSnack={openSnack} />
                    : null
            }
        </>
    )
}

export default Search;
