import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const apiKey = 'AIzaSyANMujShPwmVeAUXyvIm6d4yYgmFc-Fifo';
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+apiKey;
        if(authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+apiKey
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
                dispatch(authStoreToken(data.idToken, data.expiresIn));
                startMainTabs();
            }
        });
    };
};

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn*1000;
        AsyncStorage.setItem('ap:auth:token', token);
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString);
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
        promise.catch(err => {
            dispatch(authClearStorage());
        })
        return promise;
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