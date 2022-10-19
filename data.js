const API_BASE_URL="https://api.foursquare.com/v3/places/";
const API_KEY="fsq36vWuvzc4ASQhuuv+TktgLmcCAI4WKFykx0ewzgChlkQ="
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY    
}
const categoriesList = {
    "all":18021,
    "boxing":18022,
    "climbing":18023,
    "cycle":18024,
    "dance":18025,
    "outdoor":18026,
    "pilates":18027,
    "yoga":18028
}
async function search(lat, lng, query="",categories=18021) {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "search",{
        headers: headers,
        params: {
            'll': ll,
            'v': '20221017',  // YYYYMMDD format
            'query': query,
            'categories':categories,
            'radius': 10000,
            'limit': 50
        }
    })
    return response.data;
}

async function searchPic(fsq_id){
    let response = await axios.get(API_BASE_URL+fsq_id+"/photos",{
        "headers":headers,
        params: {
            'fsq_id': fsq_id
                    }
    });
    return response.data;
}

