window.addEventListener('DOMContentLoaded', async () => {

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


    let database = await search(1.3521, 103.8189);

    let markerClusterLayer = L.markerClusterGroup();
    markerClusterLayer.addTo(map);

    let data = database.results;
    for (let eachSearch of data) {
        let lat = eachSearch.geocodes.main.latitude;
        let lng = eachSearch.geocodes.main.longitude;
        let searchMarker = L.marker([lat, lng]);
        searchMarker.bindPopup(() => {
            let ele = document.createElement('div');
            ele.classList.add("card");
            ele.style.width = "18rem";
            async function getPic() {
                let picData = await searchPic(eachSearch.fsq_id);
                let picURL = picData[0]; 
                let picURLFull = picURL.prefix + "original" + picURL.suffix;
                ele.innerHTML += `<img class="card-img-top" src="${picURLFull}">`
            }
            getPic();
            ele.innerHTML += `
            <div class="card-body">
                <h5 class="card-title">${eachSearch.name}</h5>
                <p class="card-text">${eachSearch.location.formatted_address}</p>
            </div>`;
            return ele;
        })
            searchMarker.addTo(markerClusterLayer);
    }


})