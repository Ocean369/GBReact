import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { loginInitiate, registerInitial } from '../store/Authentication/reducer';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { error } from '../store/Authentication/selector';
import { getAuth } from "firebase/auth";
import { cleanError } from '../store/Authentication/actionCreator';

export const Registration = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const signUpError = useSelector(error);
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);
    const navigation = useNavigate('');
    const auth = getAuth();
    const user = auth.currentUser;
    const [photoURL, setPhotoURL] = useState('https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg');

    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordConfirm = (e) => {
        setShowPassConfirm(!showPassConfirm);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (user) { navigation('/chats') }
        else {
            // dispatch(cleanError()); 
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== passConfirm) return;
        dispatch(registerInitial(name, email, phone, password, photoURL));
        setErr(signUpError);
        if (!err) {
            setTimeout(() => navigation('/chats'), 1000);
        }
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
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password confirm</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassConfirm ? 'text' : 'password'}
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordConfirm}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password confirm"
                />
            </FormControl>
            <Box component='div' style={{ fontSize: '10px', color: 'red' }}>{err}</Box>
            <Button type='submit' variant="contained">Зарегистрироваться</Button>
        </Box >
    )
}