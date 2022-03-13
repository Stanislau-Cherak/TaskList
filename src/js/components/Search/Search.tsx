import React, { useState } from "react";

import { Grid, Button, TextField, InputAdornment, Box, IconButton } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    searchMask: string,
    onSearchChange: (value: string) => void,
    onModalOpen: () => void
}

const Search: React.FC<SearchProps> = ({ searchMask, onSearchChange, onModalOpen }) => {

    const [mask, setMask] = useState<string>(searchMask);

    const handleModalOpen = () => {
        onModalOpen();
    };

    const handleSearchChange = (event) => {
        setMask(event.target.value);
        onSearchChange(event.target.value.trim());
    }

    const handleRenew = () => {
        onSearchChange('');
        setMask('');
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
                        <IconButton
                            size="large"
                            color='primary'
                            sx={{
                                mr: 2
                            }}
                            onClick={handleRenew}
                        >
                            <AutorenewIcon />
                        </IconButton>
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
                            value={mask}
                            onChange={handleSearchChange}
                        />
                        <Button
                            variant='contained'
                            onClick={() => setMask('')}
                        >
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Search;
