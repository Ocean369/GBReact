import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, loadingSelector, errorSelector } from "../store/UsersFetchingReducer/selectors";
import { getData_thunk } from '../store/UsersFetchingReducer/actionCreator';


function User_Card({ user }) {
    return <div className='user_card'>
        <div><span>Name:</span> {user.name}</div>
        <div><span>Phone:</span> {user.phone}</div>
        <div><span>Company:</span> {user.company.name}</div>
    </div>
}


function UserFetching() {

    const users = useSelector(usersSelector);
    const loading = useSelector(loadingSelector);
    const error = useSelector(errorSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData_thunk());
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getData_thunk());
    }

    if (loading) {
        return <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className='loader'></div>
            Идет загрузка страницы...
        </div>
    }

    if (error) {
        return <div className='error'>
            <img src="mouse_error.png" alt="error" style={{ width: '400px' }} />
            <button className='error_button'
                onClick={handleClick}>Отправить заново</button>
        </div>
    }

    return <div className='cards'>
        {users.map(user => <User_Card key={user.id} user={user} />)}
    </div>
}

export default UserFetching