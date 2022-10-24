function initMap() {
    let singapore = [1.3521, 103.8198];
    let map = L.map('map').setView(singapore, 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
    }).addTo(map);

    return map;
}

function placeholderPic() {
    let placeholderPics = ["img/wip1.jpg", "img/wip2.jpg", "img/wip3.jpg"];
    let randomNum = Math.floor(Math.random() * placeholderPics.length);
    return placeholderPics[randomNum];
}

window.addEventListener('DOMContentLoaded', async () => {
    let map = initMap();
    let markerClusterLayer = L.markerClusterGroup();
    markerClusterLayer.addTo(map);
    let foodLayer = L.layerGroup();

    let searchBtn = document.querySelector(`#searchBtn`).addEventListener(`click`, async () => {
        let inputQuery = (document.querySelector(`#inputQuery`).value).trim();
        let inputCategories = (document.querySelector(`#floatingSelect`).selectedOptions)[0].value;
        let selectedCateID = selectedCategory(inputCategories);

        let bound = map.getBounds();
        let boundCenter = bound.getCenter();
        let boundCenterLat = boundCenter.lat;
        let boundCenterLng = boundCenter.lng;
        let database = await search(boundCenterLat, boundCenterLng, selectedCateID[0], inputQuery);

        markerClusterLayer.clearLayers();

        let data = database.results;
        let resultDisplay = document.querySelector(`#resultDisplay`);
        resultDisplay.innerHTML = "";

        for (let eachSearch of data) {
            let lat = eachSearch.geocodes.main.latitude;
            let lng = eachSearch.geocodes.main.longitude;
            let searchMarker = L.marker([lat, lng],{icon: (selectedCateID[1])}).addTo(markerClusterLayer);
            searchMarker.addEventListener(`click`,()=>{
                map.flyTo([lat, lng]);
            })
            searchMarker.bindPopup(() => {
                let ele = document.createElement('div');
                ele.classList.add("card");
                ele.style.width = "18rem";
                ele.innerHTML += `
                <div class="card-body">
                    <h5 class="card-title">${eachSearch.name}</h5>
                    <p class="card-text">${eachSearch.location.formatted_address}</p>
                </div>`;
                async function getPic() {
                    let picData = await searchPic(eachSearch.fsq_id);
                    let picURL = picData[0];
                    if(picURL){
                        let picURLFull = picURL.prefix + "original" + picURL.suffix;
                        ele.innerHTML += `<img class="card-img-top" src="${picURLFull}">`
                    } else {
                        ele.innerHTML += `<img class="card-img-top" src="${placeholderPic()}">`
                    }
                    
                }
                getPic();
                return ele;
            })

            let clickOnHolder = document.createElement(`div`);
            clickOnHolder.classList.add("card");
            clickOnHolder.innerHTML =
                `<div class="card-body d-flex flex-row justify-content-between p-2">
                    <h5 class="card-title fs-6">${eachSearch.name}</h5>
                    <p class="btn btn-outline-info btn-sm rounded-circle card-text">Go</p>
                </div>`;
            clickOnHolder.addEventListener(`click`,()=>{
                map.flyTo([lat, lng], 18);
                searchMarker.openPopup(); 
            })

            resultDisplay.appendChild(clickOnHolder);
        }
    })
})