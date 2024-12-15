<template>
  <div class="p-10">
        <!-- Input field for user to enter the location -->
        <div class="flex gap-10">
            <input type="text" v-model="location" placeholder="Enter a location" @keyup.enter="fetchWeather" class="border-green-400 border-2"/>
            <button @click="fetchWeather" class="bg-green-600 text-white hover:bg-green-500">Get Weather</button>    
        </div>
    
        <div class="flex justify-center items-center gap-6 mt-10 border-4 rounded-[40px] w-[460px]">
            <div class="p-3 text-white">
                <!-- Display weather data -->
                <h1 v-if="weatherData.location" class="text-3xl pb-2 font-semibold">{{ weatherData.location.name }}, {{ weatherData.location.region }}</h1>
                <p v-if="weatherData.current" class="text-lg ">{{ weatherData.current.condition.text }}</p>
                <p v-if="weatherData.location" class="text-lg font-medium">{{ weatherData.location.localtime }}</p>
            </div>
            <div class="p-3 text-white">
                <p v-if="weatherData.current" class=" text-[50px] font-bold">{{ weatherData.current.temp_c }}°</p>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
    
    import { ref, onMounted } from "vue";
    import axios from "axios";
    
    // API Key
    const apiKey = "25c30d10e8144335aff14750242511"; // Replace with your API key
    
    // Reactive variables
    const location = ref(""); // To store user input for location
    const weatherData = ref({}); // To store the weather data
    
    // Function to fetch weather data
    const fetchWeather = async () => {
      if (!location.value) {
        console.warn("Location is empty");
        return;
      }
    
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.value}`;
    
      try {
        const response = await axios.get(url);
        weatherData.value = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    
    // Function to fetch weather data based on current location
    const fetchWeatherByLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser");
        return;
      }
    
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    
          try {
            const response = await axios.get(url);
            weatherData.value = response.data;
          } catch (error) {
            console.error("Error fetching weather data by location:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    };
    
    // Automatically fetch weather data for the current location when the component is mounted
    onMounted(() => {
        fetchWeatherByLocation();
    });
    
    </script>
    
    <style>
    /* Optional styling for input and button */
    input {
      padding: 8px;
      margin-right: 10px;
      font-size: 16px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
    </style>
    