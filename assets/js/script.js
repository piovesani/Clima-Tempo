var key = 'Digite sua API key';

const getInput = (e) => {
    e.preventDefault();

    let input = document.querySelector('#search-input').value;

    if (input !== '') {
        clear();
        warning('carregando...');
        getData(input);
    }
    else{
        clear();
    }
}

const getData = async (input) => {
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&appid=${key}&units=metric&lang=pt_br&`;

    const request = await fetch(url);
    const response = await request.json();

    let message = "";

    switch (parseInt(response.cod)) {
        case 200:
            info({
                name: response.name,
                country: response.sys.country,
                temp: response.main.temp,
                tempIcon: response.weather[0].icon,
                windSpeed: response.wind.speed,
                windAngle: response.wind.deg
            });
            break;

        case 404:
            clear();
            message = "Não encontramos esta localização.";
            break;
    }

    warning(message);
}

const clear = () => {
    document.querySelector('.result').style.display = 'none';
    warning('');

}

document.querySelector('.search').addEventListener('submit', getInput);

const info = (json) => {
    warning('');

    document.querySelector('.result-title').innerHTML =
        `${json.name}, ${json.country}`;

    document.querySelector('.temp-info').innerHTML =
        `${parseInt(json.temp)} <sup>ºC</sup>`;

    document.querySelector('.wind-info').innerHTML =
        `${parseInt(json.windSpeed)} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

    document.querySelector('.wind-deg').style.transform =
        `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.result').style.display = 'block';

}

const warning = (message) => {
    document.querySelector('.alert').innerHTML = message;
}

