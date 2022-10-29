const API_BASE_URL = "https://api.foursquare.com/v3/places/";
const API_KEY = "fsq3CM63NagEqTAv1JgvG1gQJPq+g89o8J+VGpv9dzdZG3M=";
const weatherAPI_KEY = "a98a4d70a1d2cc9eca8357594caee0df";
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY
}

let foodMarker = L.icon({
    iconUrl: `img/marker/eats.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let allMarker = L.icon({
    iconUrl: `img/marker/gym.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let boxingMarker = L.icon({
    iconUrl: `img/marker/boxing.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let bicycleMarker = L.icon({
    iconUrl: `img/marker/bicycle.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let musicMarker = L.icon({
    iconUrl: `img/marker/music.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let pilateMarker = L.icon({
    iconUrl: `img/marker/pilate.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let climbMarker = L.icon({
    iconUrl: `img/marker/rope.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let outdoorMarker = L.icon({
    iconUrl: `img/marker/tree.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let yogaMarker = L.icon({
    iconUrl: `img/marker/yoga.png`,

    iconSize: [45, 50],
    iconAnchor: [22, 40],
    popupAnchor: [0, -30]
});
let weatherMarker = L.icon({
    iconUrl: `img/marker/sunrise.png`,

    iconSize: [30, 35],
    iconAnchor: [15, 28],
    popupAnchor: [0, -30]
});

function selectedCategory(data) {
    let categoriesList = {
        "all": [18021, allMarker],
        "boxing": [18022, boxingMarker],
        "climbing": [18023, climbMarker],
        "cycle": [18024, bicycleMarker],
        "dance": [18025, musicMarker],
        "outdoor": [18026, outdoorMarker],
        "pilates": [18027, pilateMarker],
        "yoga": [18028, yogaMarker]
    }
    return categoriesList[data];
}

function selectedWeather(data) {
    let obj = {
        "clear sky": "☼",
        "clear": "☼",
        "few clouds": "🌥",
        "clouds": "🌥",
        "scattered clouds": "☁",
        "broken clouds": "☁",
        "shower rain": "🌦",
        "rain": "🌧",
        "thunderstorm": "⛈",
        "snow": "❄",
        "mist": "🌫"
    }
    return obj[data];
}

async function search(lat, lng, categories, query = "", radius = "10000", limit = "50") {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "search", {
        headers: headers,
        params: {
            'll': ll,
            'v': '20221017',  // YYYYMMDD format
            'query': query,
            'categories': categories,
            'radius': radius,
            'limit': limit
        }
    })
    return response.data;
}

async function searchPic(fsq_id) {
    let response = await axios.get(API_BASE_URL + fsq_id + "/photos", {
        "headers": headers,
        params: {
            'fsq_id': fsq_id
        }
    });
    return response.data;
}

async function weatherForecast(lat, lng, weatherAPI_KEY) {
    let database = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherAPI_KEY}`);
    return database.data;
}

function kToCel(num) {
    num = Number(num);
    let returnNum = (num - 273.15).toFixed(2);
    return returnNum;
}

function initMap() {
    let singapore = [1.3521, 103.8198];

    let transitView = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });

    let simpleView = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    let roadView = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg',
    })

    let map = L.map('map', {
        layers: [roadView, transitView, simpleView],
        position: 'bottomright'
    }).setView(singapore, 12);

    var baseMaps = {
        "Road": roadView,
        "Detailed": transitView,
        "Simple": simpleView
    };

    let layerControl = L.control.layers(baseMaps, {}, { position: 'bottomright' }).addTo(map);

    return map;
}

function placeholderPic() {
    let placeholderPics = ["img/wip1.jpg", "img/wip2.jpg", "img/wip3.jpg"];
    let randomNum = Math.floor(Math.random() * placeholderPics.length);
    return placeholderPics[randomNum];
}

async function quoteGetter() {
    let quotesDatabase = (await axios.get(`quotes.json`)).data;
    let randomGen = Math.floor(Math.random() * quotesDatabase.length);
    let slogan = document.createElement("div");
    let holder = document.querySelector(`#offcanvasTop`);
    let loading = document.querySelector(`.center`);
    holder.removeChild(loading);
    slogan.innerHTML = `
        <div class="container d-flex justify-content-center mt-0 pt-0 animate__animated animate__fadeIn">
            <h5 id="slogan">${quotesDatabase[randomGen].text}</h5>
        </div>
        <div class="d-flex justify-content-end mt-0 pt-0 me-5 pe-5 animate__animated animate__fadeIn">
            <h5 class="justify-content-end" id="sloganBy">- ${quotesDatabase[randomGen].author}</h5>
        </div>`;
    holder.appendChild(slogan);
}
