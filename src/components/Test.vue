<template>
    <div class="my-10 w-auto sm:w-1/2 mx-auto">
      <Combobox v-model="selected">
        <div class="relative mt-1">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-lg bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              :displayValue="(city) => city?.name"
              @input="onInputChange"
            />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              v-if="filteredCities.length > 0"
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <!-- Show if no cities found -->
              <div
                v-if="filteredCities.length === 0 && query !== ''"
                class="relative cursor-default select-none px-4 py-2 text-gray-700"
              >
                No cities found.
              </div>
  
              <!-- Limit options to 4 cities -->
              <ComboboxOption
                v-for="city in filteredCities.slice(0, 4)"
                :key="city.id"
                :value="city"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{ 'bg-teal-600 text-white': active, 'text-gray-900': !active }"
                >
                  <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                    {{ city.name }}
                  </span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <CheckIcon class="h-5 w-5 text-teal-600" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import debounce from 'lodash/debounce'
  import axios from 'axios'
  import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
  } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  
  const selected = ref(null)
  const query = ref('')
  const filteredCities = ref([])
  
  // Debounced function to fetch cities from the API
  const fetchCities = debounce(async (searchQuery) => {
    if (!searchQuery) {
      filteredCities.value = []
      return
    }
  
    try {
      console.log('Fetching cities for query:', searchQuery)
      const response = await axios.get('https://api.thecompaniesapi.com/v2/locations/cities', {
        params: { search: searchQuery },
        headers: {
          Authorization: 'Bearer YOUR_API_KEY', // Replace with your API key
        },
      })
  
      // Map response data to city format
      filteredCities.value = response.data.cities.map((city) => ({
        id: city.id,
        name: city.name,
      }))
      console.log('Fetched cities:', filteredCities.value)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }, 300)
  
  // Update query and fetch cities on input
  const onInputChange = (event) => {
    query.value = event.target.value
    fetchCities(query.value)
  }
  </script>
  