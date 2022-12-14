window.addEventListener('DOMContentLoaded', async () => {
    quoteGetter();
    loginSetUp();

    document.querySelector(`#logo`).addEventListener(`click`,()=>{location.reload()})

    let map = initMap();
    let markerClusterLayer = L.markerClusterGroup();
    markerClusterLayer.addTo(map);

    let toggleDisplay = document.querySelector(`#toggleDisplay`);
    let btnToggle = document.querySelector(`#toggleDisplayBtn`);
    btnToggle.addEventListener(`click`, () => {
        if (toggleDisplay.style.display == "none") {
            btnToggle.textContent = "▲";
            toggleDisplay.style.display = "block";
            let resultDisplay = document.querySelector(`#resultDisplay`);
            resultDisplay.style.display = "block";
        } else {
            btnToggle.textContent = "▼";
            toggleDisplay.style.display = "none";
            let resultDisplay = document.querySelector(`#resultDisplay`);
            resultDisplay.style.display = "none";
        }
    })

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
        if (!(data[0] == undefined)) {
            for (let eachSearch of data) {
                let lat = eachSearch.geocodes.main.latitude;
                let lng = eachSearch.geocodes.main.longitude;
                let searchMarker = L.marker([lat, lng], { icon: (selectedCateID[1]) }).addTo(markerClusterLayer);
                searchMarker.addEventListener(`click`, () => {
                    map.flyTo([lat, lng], 18);
                })
                searchMarker.bindPopup(() => {
                    let ele = document.createElement('div');
                    ele.classList.add("card");
                    ele.style.width = "18rem";
                    ele.innerHTML += `
                <div class="card-body">
                    <h5 class="card-title">${eachSearch.name}</h5>
                    <p class="card-text">${eachSearch.location.formatted_address}</p>
                    <button class="btn btn-primary">Attend</button>
                </div>`;
                    async function getPic() {
                        let picData = await searchPic(eachSearch.fsq_id);
                        let picURL = picData[0];
                        if (picURL) {
                            let picURLFull = picURL.prefix + "original" + picURL.suffix;
                            ele.innerHTML += `<img class="card-img-top" src="${picURLFull}">`
                        } else {
                            ele.innerHTML += `<img class="card-img-top" src="${placeholderPic()}">`
                        }

                    }
                    getPic();
                    async function getReviews() {
                        let reviewData = await searchReviews(eachSearch.fsq_id);
                        if(!(reviewData[0]==undefined)){
                            let numberOfReview = reviewData.length
                            let randomNum = Math.floor(Math.random() * (numberOfReview-1));
                            ele.innerHTML += `
                                <h5 class="card-title m-0 mt-2 px-2">Reviews</h5>
                                <p class="card-text m-0 p-2">${reviewData[randomNum].text}</p>
                        `;
                        }
                    }
                    setTimeout(()=>{getReviews()}, 3000);
                    return ele;
                })

                let clickOnHolder = document.createElement(`div`);
                clickOnHolder.classList.add("card");
                clickOnHolder.innerHTML =
                    `<div class="card-body d-flex flex-row justify-content-between p-2">
                    <h5 class="card-title fs-6">${eachSearch.name}</h5>
                    <p class="btn btn-outline-info btn-sm card-text">Go</p>
                </div>`;
                clickOnHolder.addEventListener(`click`, () => {
                    map.flyTo([lat, lng], 18);
                    let resultDisplay = document.querySelector(`#resultDisplay`);
                    resultDisplay.style.display = "none";
                    setTimeout(() => {
                        searchMarker.openPopup();
                    }, 4000)
                })

                resultDisplay.appendChild(clickOnHolder);
            }
        } else {
            L.circle([boundCenterLat, boundCenterLng], {
                color: 'green',
                fillColor: "green",
                fillOpacity: 0.2,
                radius: 10000
            }).addTo(markerClusterLayer)
            alert(`There is no Gym or Studio in a 10 KM radius. Please center your view to another location`)
        }
    })

    let foodLayer = L.layerGroup();
    foodLayer.addTo(map);
    let toggleFood = document.querySelector(`#foodBtn`);
    toggleFood.addEventListener(`click`, async () => {
        if (toggleFood.ariaPressed == "true") {
            let bound = map.getBounds();
            let boundCenter = bound.getCenter();
            let boundCenterLat = boundCenter.lat;
            let boundCenterLng = boundCenter.lng;
            let database = await search(boundCenterLat, boundCenterLng, 13000, "", "500", "10");
            let data = database.results;
            if (!(data[0] == undefined)) {
                L.circle([boundCenterLat, boundCenterLng], {
                    color: 'black',
                    fillColor: "black",
                    fillOpacity: 1,
                    radius: 1
                }).addTo(foodLayer)
                L.circle([boundCenterLat, boundCenterLng], {
                    color: 'black',
                    fillColor: "red",
                    fillOpacity: 0.2,
                    radius: 500
                }).addTo(foodLayer)
                for (let eachFood of data) {
                    let lat = eachFood.geocodes.main.latitude;
                    let lng = eachFood.geocodes.main.longitude;
                    let searchMarker = L.marker([lat, lng], { icon: foodMarker }).addTo(foodLayer);

                    searchMarker.addEventListener(`click`, () => {
                        map.flyTo([lat, lng], 18);
                    })
                    searchMarker.bindPopup(() => {
                        let ele = document.createElement('div');
                        ele.classList.add("card");
                        ele.style.width = "18rem";
                        ele.innerHTML += `
                    <div class="card-body">
                        <h5 class="card-title">${eachFood.name}</h5>
                        <p class="card-text">${eachFood.location.formatted_address}</p>
                    </div>`;
                        async function getPic() {
                            let picData = await searchPic(eachFood.fsq_id);
                            let picURL = picData[0];
                            if (picURL) {
                                let picURLFull = picURL.prefix + "original" + picURL.suffix;
                                ele.innerHTML += `<img class="card-img-top" src="${picURLFull}">`
                            } else {
                                ele.innerHTML += `<img class="card-img-top" src="img/foodWIP.png">`
                            }

                        }
                        getPic();
                        return ele;
                    })
                }
            } else {
                L.circle([boundCenterLat, boundCenterLng], {
                    color: 'black',
                    fillColor: "black",
                    fillOpacity: 1,
                    radius: 1
                }).addTo(foodLayer)
                L.circle([boundCenterLat, boundCenterLng], {
                    color: 'black',
                    fillColor: "red",
                    fillOpacity: 0.2,
                    radius: 500
                }).addTo(foodLayer)
                alert(`There are no diners in a 500m radius, please change your view location`);
            }

        } else {
            foodLayer.clearLayers()
        }

    });

    let weatherLayer = L.layerGroup();
    weatherLayer.addTo(map);
    let weatherDisplay = document.querySelector(`#weatherDisplay`);
    let toggleWeather = document.querySelector(`#weatherBtn`);
    toggleWeather.addEventListener(`click`, async () => {
        if (toggleWeather.ariaPressed == "true") {
            let bound = map.getBounds();
            let boundCenter = bound.getCenter();
            let boundCenterLat = boundCenter.lat;
            let boundCenterLng = boundCenter.lng;
            let database = await weatherForecast(boundCenterLat, boundCenterLng, weatherAPI_KEY);
            L.marker([boundCenterLat, boundCenterLng], { icon: weatherMarker }).addTo(weatherLayer);
            L.circle([boundCenterLat, boundCenterLng], {
                color: 'blue',
                fillColor: "blue",
                fillOpacity: 0.1,
                radius: 3500
            }).addTo(weatherLayer);
            let mainWeather = (database.weather[0].main).toLowerCase();
            let weatherDisplay = document.querySelector(`#weatherDisplay`);
            let placeholderDiv = document.createElement(`div`);
            placeholderDiv.classList.add("card", "border-0", "d-flex", "flex-row", "justify-content-evenly", "align-items-center");
            placeholderDiv.style.backgroundColor = "rgba(255,255,255,0)";
            placeholderDiv.innerHTML = `
                <h1 class="fs-1 m-0">${selectedWeather(mainWeather)}</h1>
                <div class="d-flex flex-column">
                <h5 class="m-0 p-0 text-warning">${database.weather[0].main}</h5>
                <p class="m-0 p-0 text-warning">Temp: ${kToCel(database.main.temp)}℃</p>
                <div>
            `
            weatherDisplay.appendChild(placeholderDiv);
        } else {
            weatherLayer.clearLayers();
            weatherDisplay.innerHTML = "";

        }
    })

})