import { defineStore } from 'pinia'
import { ref } from 'vue'
import debounce from 'lodash/debounce'
import axios from 'axios'

export const useCityStore = defineStore('cityStore', () => {
  const cityName = ref('')
  const query = ref('')
  const filteredCities = ref([])

  // Debounced function to fetch cities from the API
  const fetchCities = debounce(async (searchQuery) => {
    if (!searchQuery) {
      filteredCities.value = []
      return
    }

    try {
      const response = await axios.get('https://api.thecompaniesapi.com/v2/locations/cities', {
        params: { search: searchQuery },
      })

      // Map API response to required format
      filteredCities.value = response.data.cities.map((city) => ({
        id: city.id,
        name: city.name,
      }))
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }, 300)

  // Handles input change and triggers city fetch
  const onInputChange = (event) => {
    query.value = event.target.value
    fetchCities(query.value)
  }

  return { cityName, query, filteredCities, onInputChange }
})
