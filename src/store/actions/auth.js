import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyANMujShPwmVeAUXyvIm6d4yYgmFc-Fifo'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+API_KEY;
        if(authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+API_KEY
        }
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                email:authData.email,
                password:authData.password,
                returnSecureToken: true
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
            alert("Authentication failed");
        })
        .then(res => res.json())
        .then(data => {
            dispatch(uiStopLoading());
            if(!data.idToken) {
                alert("Authentication failed :" + data.error.message)
            }else{
                dispatch(authStoreToken(data.idToken, data.expiresIn, data.refreshToken));
                startMainTabs();
            }
        });
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem('ap:auth:token', token);
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
        AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject)=>{
            const token = getState().auth.token;
            if(!token) {
                let fetchedToken;
                AsyncStorage.getItem('ap:auth:token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                        }
                        return AsyncStorage.getItem('ap:auth:expiryDate')
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken))
                            resolve(fetchedToken);
                        }else{
                            reject();
                        }
                    })
                    .catch(err=>reject());
            }else{
                resolve(token);
            }
        });
        return promise.catch(err => {
            return AsyncStorage.getItem('ap:auth:refreshToken')
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key="+API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token="+refreshToken
                    });
                })
                .then(res => res.json())
                .then(data => {
                    if(data.id_token) {
                        console.log("Refresh Token Success")
                        dispatch(authStoreToken(data.id_token, data.expires_in, data.refresh_token));
                        return data.id_token;
                    }else{
                        dispatch(authClearStorage());
                    }
                })
        })
        .then(token => {
            if(!token) {
                throw(new Error());
            }else{
                return token;
            }
        })
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            startMainTabs();
        })
        .catch(err => console.log("Failed to fetch to token"))
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('ap:auth:token');
        AsyncStorage.removeItem('ap:auth:expiryDate');
    }
};