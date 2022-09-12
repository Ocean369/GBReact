
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';



const Form = React.forwardRef((props, ref) => {

    return (
        <Box
            onSubmit={props.onSubmit}
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1
            }}
            noValidate
            autoComplete="off"
        >
            <TextareaAutosize ref={ref}
                aria-label="empty textarea"
                style={{
                    width: 230, height: 30,
                    borderRadius: 10, overflow: 'scroll'
                }}
                autoFocus={true}
            />
            <Button
                type='submit'
                variant="contained"
                sx={{ width: 45 }}
                endIcon={<SendIcon />}>

            </Button>
        </Box>
    );
})

export default Form;