import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouter({ children }) {
    
    const isLoggedIn = useSelector((state) => state.auth.token);
    useEffect(() => {
        console.log(!isLoggedIn);
        if (!isLoggedIn) {
            window.location.href = '/login';
        }
    }, [isLoggedIn]);
    return isLoggedIn ? children : null;
}
