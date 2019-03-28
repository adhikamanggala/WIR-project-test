import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    USER_NOT_FOUND,
    LOGIN_SYSTEM_ERROR,
    LOGIN_LOADING, LOGOUT,
    REGISTER_LOADING,
    COOKIE_CHECKED,
    HARUS_DIISI,
    USERNAME_TIDAK_TERSEDIA,
    ADD_TO_ITINERARY,
    ADD_TO_ITINERARY_FAILED,
    DELETE_ITINERARY,
    DELETE_ITINERARY_ERROR
} from './types';

export const onUserLogout = () => {
    return { type: LOGOUT }
}
export const keepLogin = (username) => {
    return (dispatch) => {
        axios.get('http://localhost:1991/keeplogin', {
            params: {
                username
            }
        }).then((res) => {
            if (res.data.length > 0) {
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: username
                })
            }
        })
    }
}
export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}
export const onUserLogin = ({ username, password }) => {
    return (dispatch) => {
        if (username === '' || password === '') {
            return dispatch({ type: HARUS_DIISI })
        }
        dispatch({ type: LOGIN_LOADING })
        axios.post('http://localhost:1991/login', {
            username,
            password
        }).then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: username })
            } else {
                dispatch({ type: USER_NOT_FOUND })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({ type: LOGIN_SYSTEM_ERROR })
        })
    }
}
export const onUserRegister = ({ username, email, password }) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_LOADING })
        if (username === '' || password === '' || email === '') {
            dispatch({ type: HARUS_DIISI })
        } else {
            axios.get('http://localhost:1991/usercheck', {
                params: {
                    username
                }
            }).then((res) => {
                if (res.data.length === 0) {
                    axios.post('http://localhost:1991/register', {
                        username, email, password
                    }).then((res) => {
                        console.log(res)
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: username })
                    }).catch((err) => {
                        console.log(err);
                        dispatch({ type: LOGIN_SYSTEM_ERROR })
                    })
                } else {
                    dispatch({ type: USERNAME_TIDAK_TERSEDIA })
                }
            }).catch((err) => {
                dispatch({ type: LOGIN_SYSTEM_ERROR })
            })

        }

    }
}
export const addToItinerary = ({ username, id_product, now }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_LOADING })
        axios.post('http://localhost:1991/addtoitinerary', {
            username,
            id_product,
            date: now
        }).then((res) => {
            console.log('dari action')
            console.log(res)
            dispatch({ type: ADD_TO_ITINERARY })
        }).catch((err) => {
            console.log(err)
            dispatch({ type: ADD_TO_ITINERARY_FAILED })
        })
    }
}

export const deleteItinerary = (id) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_LOADING })
        axios.post('http://localhost:2019/deleteitinerary/' + id)
            .then((res) => {
                console.log(res)
                dispatch({ type: DELETE_ITINERARY })
            }).catch((err) => {
                console.log(err)
                dispatch({ type: DELETE_ITINERARY_ERROR })
            })
    }
}
