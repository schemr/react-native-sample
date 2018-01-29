import { ADD_PLACE, DELETE_PLACE, SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(()=>{
            alert("No valid token")
        })
        .then(token => {
            authToken = token;
            return fetch("https://us-central1-test-183c9.cloudfunctions.net/storeImage", {
                method: "POST",
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    "Authorization": "Bearer "+authToken
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            const placeData = {
                name: placeName,
                location: location,
                image: data.imageUrl,
                imagePath: data.imagePath
            };
            return fetch('https://test-183c9.firebaseio.com/places.json?auth='+authToken, {
                method: 'POST',
                body: JSON.stringify(placeData)
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(uiStopLoading());
        })
        .catch(err => {
            console.log(err);
            alert('Error add place')
            dispatch(uiStopLoading());
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://test-183c9.firebaseio.com/places.json?auth="+token)
            })
            .catch(()=>{
                alert("No valid token")
            })
            .then(res => res.json())
            .then(data => {
                const places = [];
                for(let key in data) {
                    places.push({
                        ...data[key],
                        image: {
                            uri: data[key].image
                        },
                        key: key
                    })
                }
                console.log(places)
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert('Error get place');
                console.log(err);
            });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(err=>{
                alert("No valid token")
            })
            .then(token => {
                dispatch(removePlace(key));
                return fetch("https://test-183c9.firebaseio.com/places/"+key+".json?auth="+token, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    
                })
                .catch(err => {
                    alert('Error delete place');
                    console.log(err);
                })
            })
    }
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};