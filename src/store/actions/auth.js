import { TRY_AUTH } from './actionTypes';
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
            if(data.error) {
                alert("Authentication failed :" + data.error.message)
            }else{
                startMainTabs();
            }
        });
    };
};