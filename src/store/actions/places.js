import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
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

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};