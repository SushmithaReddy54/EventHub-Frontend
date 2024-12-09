import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { APP_BASE_URL } from './GlobalUrls';
import { doLogout } from '../store/reducers/UserReducers';
import { useEffect, useRef } from 'react';

export const Api = () => {
    // const dispatch = useDispatch();
    const history = useNavigate();
    const authState = useSelector((state) => state.user.value);

    const axiosInstanceRef = useRef(null);

    useEffect(() => {
        if (authState) {
            axiosInstanceRef.current = authState.isUserAuthenticated ? axios.create({
                baseURL: APP_BASE_URL,
                withCredentials: true,
                headers: {
                    'sessionid': localStorage.getItem('sessionid')
                }
            }) : 
            axios.create({
                baseURL: APP_BASE_URL,
                withCredentials: true
            });

            axiosInstanceRef.current.interceptors.response.use(
                response => response,
                error => {
                    if (error?.response?.data?.status === 401 && authState.isUserAuthenticated ) {
                        // dispatch(doLogout());
                        history('/logout');
                    }
                    return Promise.reject(error);
                }
            );
        }
    }, [authState,  history]);

    return axiosInstanceRef.current;
};
