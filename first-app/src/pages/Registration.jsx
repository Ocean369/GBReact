import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { registerInitial } from '../store/Authentication/reducer';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { error } from '../store/Authentication/selector';


export const Registration = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const err = useSelector(error);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigate('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function handleSubmit(e) {
        e.preventDefault();
        if (password !== passConfirm) {
            return;
        }
        dispatch(registerInitial(name, email, phone, password));
        setTimeout(() => navigation('/chats'), 1000);
    }

    return (
        <Box component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: 300,
                height: '450px',
                borderRadius: 5,
                padding: '20px',
                border: '1px solid lightblue'
            }}
            noValidate
            onSubmit={handleSubmit}>
            <FormLabel style={{
                paddingBottom: '20px'
            }}
            >Registration </FormLabel>
            <TextField
                id="name"
                label="Name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            <TextField id="email"
                label="Mail"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField id="phone"
                label="Phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />

            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>


            <TextField id="passConfirm"
                label="Password Confirm"
                type="password"
                value={passConfirm}
                onChange={(e) => setPassConfirm(e.target.value)} />
            <Box component='div' style={{ fontSize: '10px', color: 'red' }}>{err}</Box>
            <Button type='submit' variant="contained">Зарегистрироваться</Button>
        </Box >
    )
}