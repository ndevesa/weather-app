/*
Nicolas D. 2020
www.nicolasdev.com
www.linkedin.com/in/nicolasdevesa
________________________________________
Simple Weather App.
    _Vanilla JS
    _Fetching data from external API.
    _Show it dynamically on the frontend.
    _Use arrows functions
    _Use Geolocation
*/

//Get latitud y longitud del usuario
window.addEventListener('load', ()=>{
    let longitud;
    let latitud;
    //get elementos
    let pais = document.querySelector('#pais');
    let ciudad = document.querySelector('#ciudad');
    let temperatura = document.querySelector('#temperatura');
    let humedad = document.querySelector('#humedad');
    let presion = document.querySelector('#presion');
    let sensacion_termica = document.querySelector('#sensacion_termica');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //solo para testear la geolocation: console.log(position);
            longitud = position.coords.longitude;
            latitud = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=a33038793e7ea13d4ded1a2858c55664`;

            document.getElementById('#loader').style.display = 'block';

            fetch(api)//Traer la info de la api
                .then(response =>{ //Solo una vez que recibe informacion, responde con un JSON
                    return response.json();
                })
                .then(data =>{ //Solo una vez que responde con el JSON declara constantes.
                    console.log(data); //Print para chequear el objeto.
                    
                    const {temp, feels_like, humidity, pressure} = data.main;                
                    const city = data.name;
                    const country = data.sys.country;
                    //En este caso el objeto main tiene varios parametros que podemos extraer, no es el caso de city o country que tienen un unico parametro.
                    
                    pais.textContent = country;
                    ciudad.textContent = city;
                    temperatura.textContent = Math.round(temp-273) + 'ºC'; //La API provee la temperatura actual y la sensacion termica en grados Kelvin, -273 para pasar a Celsius, Math.round para cortar decimales.
                    humedad.textContent = humidity + '%';
                    sensacion_termica.textContent = Math.round(feels_like-273) + 'ºC';
                    presion.textContent = pressure + 'hPa';
                })
        });
    }//endif
    else{
        document.querySelector('.error').textContent = 'La geolocalización no está activada :(';
    }
});