
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { loginInitiate } from '../store/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
// import { auth } from '../services/firebase';
import { getAuth } from "firebase/auth";
import { error } from '../store/Authentication/selector';

export default function User() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigate('');
    const err = useSelector(error);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function login(e) {
        e.preventDefault();
        if (!password || !email) {
            return;
        }
        dispatch(loginInitiate(email, password));
        const auth = getAuth();
        const user = auth.currentUser;
        console.log('login user', user)
        if (user) { navigation('/chats'); }
    }

    return (
        <Box component='form' style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: 300,
            height: '250px',
            borderRadius: 5,
            padding: '20px',
            border: '1px solid green'
        }}
            noValidate
            onSubmit={login}>
            <TextField
                id="mail"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='off'
            />
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
            <div className='login_error'>{err}</div>
            <Button type='submit' variant="contained">Sign IN</Button>
            <div className='btn_signup' onClick={() => navigation('/signup')}>Registration &#10144;</div>
        </Box >


    )

}
