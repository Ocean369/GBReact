
import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function User() {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Box component='form' sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: 300,
            height: '200px',
            borderRadius: 5,
            padding: '20px',
            border: '1px solid green'
        }}
            noValidate
            onSubmit={handleSubmit}>
            <TextField
                id="name"
                label="Name"
                defaultValue="Anastasia"
            />
            <TextField id="password"
                label="Password"
                type="password"
                autoComplete="current-password" />
            <Button type='submit' variant="contained">Enter</Button>
        </Box >

    )

}
