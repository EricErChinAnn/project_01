const API_BASE_URL="https://api.foursquare.com/v3/places/";
const API_KEY="fsq3CM63NagEqTAv1JgvG1gQJPq+g89o8J+VGpv9dzdZG3M=";
const weatherAPI_KEY="a98a4d70a1d2cc9eca8357594caee0df";
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY    
}

let foodMarker = L.icon({
    iconUrl:`img/marker/eats.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let allMarker = L.icon({
    iconUrl:`img/marker/gym.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let boxingMarker = L.icon({
    iconUrl:`img/marker/boxing.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let bicycleMarker = L.icon({
    iconUrl:`img/marker/bicycle.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let musicMarker = L.icon({
    iconUrl:`img/marker/music.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let pilateMarker = L.icon({
    iconUrl:`img/marker/pilate.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let climbMarker = L.icon({
    iconUrl:`img/marker/rope.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let outdoorMarker = L.icon({
    iconUrl:`img/marker/tree.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});
let yogaMarker = L.icon({
    iconUrl:`img/marker/yoga.png`,

    iconSize: [45,50],
    iconAnchor: [22,40],
    popupAnchor: [0,-30]
});

function selectedCategory(data){
let categoriesList = {
    "all":[18021,allMarker],
    "boxing":[18022,boxingMarker],
    "climbing":[18023,climbMarker],
    "cycle":[18024,bicycleMarker],
    "dance":[18025,musicMarker],
    "outdoor":[18026,outdoorMarker],
    "pilates":[18027,pilateMarker],
    "yoga":[18028,yogaMarker]
}
return categoriesList[data];
}

async function search(lat, lng, categories, query="",radius="100000",limit="50") {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "search",{
        headers: headers,
        params: {
            'll': ll,
            'v': '20221017',  // YYYYMMDD format
            'query': query,
            'categories':categories,
            'radius': radius,
            'limit': limit
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

async function weatherForecast(lat,lng,weatherAPI_KEY){
    let database = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherAPI_KEY}`);
    return database.data;
}

async function weatherForecastIcon(iconNumber){
    let icon = await axios.get(`https://openweathermap.org/img/wn/${iconNumber}.png`);
    return icon;
}