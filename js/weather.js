document.addEventListener("DOMContentLoaded", () => {
  // ========CONFIG ===================
  const WEATHER_API_KEY = "bf95db70f142f56a76cb84c0dfb5d384";
  const DEFAULT_CITY = "Delhi";

  // ============= ELEMENTS ==========================
  const weatherBtn = document.getElementById("quickWeatherBtn");
  const chatArea = document.getElementById("chatArea");

  if (!weatherBtn || !chatArea) {
    console.error("Weather button or chatArea not found");
    return;
  }

  // ===============CHAT MESSAGE ===============================
  function addChatMessage(html) {
    const msg = document.createElement("div");
    msg.className =
      "bg-white/5 border border-white/10 rounded-xl p-4 text-sm";

    msg.innerHTML = html;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // =============================== FETCH WEATHER ===============================
  window.fetchWeather = async function (city) {
    addChatMessage("🌦️ Fetching weather...");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      addChatMessage(`
        <div class="space-y-2">

  <div class="text-lg font-semibold flex items-center gap-2">
    <i class="ri-map-pin-2-fill text-primary"></i>
    ${data.name}, ${data.sys.country}
  </div>

  <div class="flex items-center gap-2">
    <i class="ri-temp-hot-line text-orange-500"></i>
    Temp: <b>${Math.round(data.main.temp)}°C</b>
  </div>

  <div class="flex items-center gap-2 capitalize">
    <i class="ri-cloud-line text-sky-500"></i>
    ${data.weather[0].description}
  </div>

  <div class="flex items-center gap-2">
    <i class="ri-drop-line text-blue-500"></i>
    Humidity: ${data.main.humidity}%
  </div>

  <div class="flex items-center gap-2">
    <i class="ri-windy-line text-cyan-500"></i>
    Wind: ${data.wind.speed} m/s
  </div>

</div>

      `);
    } catch (err) {
      addChatMessage("❌ Weather fetch failed");
      console.error(err);
    }
  }

  // ==================BUTTON CLICK =========================
  weatherBtn.addEventListener("click", () => {
    fetchWeather(DEFAULT_CITY);
  });

  console.log("✅ Weather button active");
});
