import { ADD_PLACE, DELETE_PLACE, SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading} from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-test-183c9.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert('Upload Error')
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(data => {
            const placeData = {
                name: placeName,
                locaton: location,
                image: data.imageUrl
            };
            return fetch('https://test-183c9.firebaseio.com/places.json', {
                method: 'POST',
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
            console.log(err);
            alert('Upload Error')
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(uiStopLoading());
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://test-183c9.firebaseio.com/places.json")
        .catch(err => {
            alert('Error get place');
            console.log(err);
        })
        .then(res => res.json())
        .then(data => {
            const places = [];
            for(let key in place) {
                places.push({
                    ...place[key],
                    image: {
                        uri: place[key].image
                    },
                    key: key
                })
            }
            dispatch(setPlaces(places));
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
        fetch("https://test-183c9.firebaseio.com/places/"+key+".json", {
            method: "DELETE"
        })
        .catch(err => {
            alert('Error get place');
            console.log(err);
        })
        .then(res => res.json())
        .then(data => {
            dispatch(removePlace(key));
        });
    }
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};