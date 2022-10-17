const API_BASE_URL="https://api.foursquare.com/v3";
const API_KEY="fsq36vWuvzc4ASQhuuv+TktgLmcCAI4WKFykx0ewzgChlkQ="
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY    
}

async function search(lat, lng, query) {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search",{
        headers: {
            ...headers
        },
        params: {
            'll': ll,
            'v': '20221017',  // YYYYMMDD format
            'query': query,
            'radius': 10000,
            'limit': 50
        }
    })
    return response.data;
}

const API_BASE_URL_PIC="https://api.foursquare.com/v3/places/";

async function searchPic(fsq_id) {
    let response = await axios.get(API_BASE_URL_PIC + fsq_id + "/photos",{
        headers: {
            ...headers
        },
        params: {
            'fsq_id': fsq_id
        }
    })
    return response.data;
}