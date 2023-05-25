const search = document.querySelector('.search');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const value = document.querySelector('.value');
const shortDesc = document.querySelector('.short-desc');
const visibility = document.querySelector('.visibility span');
const wind = document.querySelector('.wind span');
const sun = document.querySelector('.sun span');
const time = document.querySelector('.time');
const content = document.querySelector('.content');
const body = document.querySelector('.body');

async function changeWeatherUI(){
    let capitalSearch =  search.value.trim();
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=1d9397712e0e080341651a2e96715e04`;
    let data = await fetch(apiURL).then(res => res.json());

    if(data.cod == 200){
        content.classList.remove('hide');
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + ' m';
        wind.innerText = data.wind.speed + ' m/s';
        sun.innerText = data.main.humidity + ' %';
        let temperature = Math.round((data.main.temp - 273.15));
        value.innerText = temperature;
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : '';
        time.innerText = new Date().toLocaleDateString('vi');

        body.setAttribute('class', 'hot');
        if (temperature <= 25) {
            body.setAttribute('class', 'cool');
        }

        if (temperature <= 22) {
            body.setAttribute('class', 'warm');
        }

        if (temperature <= 19) {
            body.setAttribute('class', 'cool');
        }
    } else {
        content.classList.add('hide');
    }
}

search.addEventListener('keypress', function (e) {
    if(e.code === 'Enter'){
        changeWeatherUI();
    }
})