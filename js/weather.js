document.addEventListener('DOMContentLoaded', () => {
    const weatherBtn = document.getElementById('weatherBtn');

    if (weatherBtn) {
        weatherBtn.addEventListener('click', () => {
            // 1. User Feedback
            addMessageToChat("Checking the weather for your location...", "system");

            // 2. Get Location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(fetchWeather, showError);
            } else {
                addMessageToChat("Geolocation is not supported by this browser.", "system");
            }
        });
    }
});

function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 3. Fetch from Open-Meteo (Free, No Key Required)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            const wind = data.current_weather.windspeed;
            
            // 4. Show Result in Chat
            const message = `Current Weather: ${temp}°C with wind speeds of ${wind} km/h.`;
            addMessageToChat(message, "ai");
            
            // Optional: Speak it out
            speakResponse(message);
        })
        .catch(error => {
            addMessageToChat("Unable to fetch weather data.", "system");
            console.error(error);
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            addMessageToChat("Please allow location access to check the weather.", "system");
            break;
        default:
            addMessageToChat("An error occurred while checking location.", "system");
    }
}

// Simple Text-to-Speech Helper
function speakResponse(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}
