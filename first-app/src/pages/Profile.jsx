


import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutInitiate } from '../store/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
import { user } from '../store/Authentication/selector';
import { getAuth } from "firebase/auth";



export default function CustomizedList() {

    const auth = getAuth();
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const navigation = useNavigate('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [phone, setPhone] = useState('');

    // React.useEffect(() => {
    //     if (user) {
    //         console.log(user);
    //         setName(user.displayName);
    //         setEmail(user.email);
    //         setPhone(user.phoneNumber);
    //         setPhotoURL(user.photoURL);
    //     } else {
    //         navigate('/');
    //     }
    // }, [])

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setName(user.displayName);
                setEmail(user.email);
                setPhone(user.phoneNumber);
                setPhotoURL(user.photoURL);
            } else {
                navigation('/');
            }
        })
    }, [])

    const handleExit = () => {
        if (user) {
            dispatch(logOutInitiate());
            //console.log(currentUser);
            setTimeout(() => navigation('/'), 1000);
        }
    }

    return (
        <div className='profile'>
            <img className='profile_avatar' src={photoURL} alt="photoUser" />
            <div className='profile_name'>{name}</div>
            <div className='profile_email'><b>Email:  </b>{email}</div>
            <div className='profile_phone'><b>Phone:  </b>{phone}</div>
            <img className='profile_exit' src="exit.png" alt="exit" onClick={() => handleExit()} />
        </div>

    );
}



