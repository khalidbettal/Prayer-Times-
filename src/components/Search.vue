<template>
  <div class="filter-container max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
    <h2 class="text-2xl font-extrabold text-center text-indigo-600 mb-4">Filter by City and Country</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- City Search -->
      <div class="city-search">
        <label for="city" class="block text-gray-700 text-lg font-semibold mb-2">City</label>
        <div class="relative">
          <input 
            id="city" 
            v-model="search.city" 
            type="text" 
            placeholder="Search for a city..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @input="handleCitySearch"
            @focus="showCitySuggestions = true"
          />
          <!-- Auto-suggestions for city -->
          <ul v-if="showCitySuggestions && filteredCities.length > 0" class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <li v-for="(city, index) in filteredCities" :key="index" class="px-4 py-2 cursor-pointer hover:bg-indigo-100" @click="selectCity(city)">
              {{ city }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Country Search -->
      <div class="country-search">
        <label for="country" class="block text-gray-700 text-lg font-semibold mb-2">Country</label>
        <div class="relative">
          <input 
            id="country" 
            v-model="search.country" 
            type="text" 
            placeholder="Search for a country..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @input="handleCountrySearch"
            @focus="showCountrySuggestions = true"
          />
          <!-- Auto-suggestions for country -->
          <ul v-if="showCountrySuggestions && filteredCountries.length > 0" class="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <li v-for="(country, index) in filteredCountries" :key="index" class="px-4 py-2 cursor-pointer hover:bg-indigo-100" @click="selectCountry(country)">
              {{ country }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="mt-6 text-center">
      <button 
        @click="submitForm" 
        :disabled="!search.city || !search.country" 
        class="px-8 py-3 bg-green-400 text-white rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold disabled:bg-gray-400"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Initial state for search
const search = ref({
  city: '',
  country: ''
});

// State to control suggestion visibility
const showCitySuggestions = ref(false);
const showCountrySuggestions = ref(false);

// State to hold the fetched cities and countries
const cities = ref([]);
const countries = ref([]);

// Fetch countries and cities from the API
onMounted(async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');
    const data = response.data.data;

    // Extract cities and countries from the response
    countries.value = data.map(item => item.country);
    cities.value = data.flatMap(item => item.cities); // Flatten cities array
  } catch (error) {
    console.error('Error fetching data from API', error);
  }
});

// Computed properties to filter cities and countries
const filteredCities = computed(() => {
  return cities.value.filter(city => city.toLowerCase().includes(search.value.city.toLowerCase()));
});

const filteredCountries = computed(() => {
  return countries.value.filter(country => country.toLowerCase().includes(search.value.country.toLowerCase()));
});

// Handle city search input
const handleCitySearch = () => {
  showCitySuggestions.value = search.value.city.length > 0;
};

// Handle country search input
const handleCountrySearch = () => {
  showCountrySuggestions.value = search.value.country.length > 0;
};

// Select city from suggestions and hide dropdown
const selectCity = (city) => {
  search.value.city = city;
  showCitySuggestions.value = false; // Hide the dropdown
};

// Select country from suggestions and hide dropdown
const selectCountry = (country) => {
  search.value.country = country;
  showCountrySuggestions.value = false; // Hide the dropdown
};

// Submit form
const submitForm = () => {
  if (search.value.city && search.value.country) {
    alert(`Submitted City: ${search.value.city}, Country: ${search.value.country}`);
    // You can handle your form submission logic here, like sending the data to an API.
  } else {
    alert('Please select both a city and a country!');
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
