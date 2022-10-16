


import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutInitiate } from '../store/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../store/Authentication/selector';
import { getAuth } from "firebase/auth";
import { db } from '../services/firebase';



export default function CustomizedList() {

    const auth = getAuth();
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const navigation = useNavigate('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (user) {
            db.ref('users').child(user.uid).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    setName(snapshot.val().username);
                    setEmail(snapshot.val().email);
                    setPhone(snapshot.val().phone);
                    setPhotoURL(snapshot.val().profile_picture);
                }
            })

        } else {
            navigation('/');
        }
    }, [])

    const handleExit = () => {
        if (auth.currentUser) {
            dispatch(logOutInitiate());
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



