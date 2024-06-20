import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    email:' ',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state,{ payload }) => {
            state.token = payload;
        },
        logoutSuccess: (state) => {
            state.token = '';
        },
        setEmail:(state,{ payload })=>{
            state.email=payload;
        }
    }
});

export const { loginSuccess, logoutSuccess,setEmail} = AuthSlice.actions;
export default AuthSlice.reducer;