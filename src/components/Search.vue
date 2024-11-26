<template>
  <div class="my-10 w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <Combobox v-model="cityStore.cityName" @update:modelValue="setSelected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-900 border border-emerald-500 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-sm"
        >
          <div class="flex items-center">
            <ComboboxInput
              class="w-full border-none py-3 pl-4 pr-12 text-base leading-5 text-gray-100 bg-gray-900 focus:ring-0"
              v-model="cityStore.cityName"
              @input="cityStore.onInputChange"
              placeholder="Search for a city..."
            />
            <ComboboxButton class="absolute inset-y-0 right-10 flex items-center pr-3">
            </ComboboxButton>
            <button
              type="button"
              class="text-emerald-500 hover:text-emerald-300 px-2 py-1 focus:outline-none"
              @click="onSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12.9 14.32a7 7 0 1 1 1.42-1.42l4.39 4.39a1 1 0 0 1-1.42 1.42l-4.39-4.39ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            v-if="cityStore.filteredCities.length > 0"
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="cityStore.filteredCities.length === 0 && cityStore.query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-400"
            >
              No cities found.
            </div>

            <ComboboxOption
              v-for="city in cityStore.filteredCities.slice(0, 4)"
              :key="city.id"
              :value="city"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{ 'bg-emerald-600 text-white': active, 'text-gray-100': !active }"
              >
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ city.name }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CheckIcon class="h-5 w-5 text-emerald-400" aria-hidden="true" />
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
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useCityStore } from '@/stores/citiesStore'
import { usePrayerTimesStore } from '@/stores/prayerTimes'

const cityStore = useCityStore()
const prayerStore = usePrayerTimesStore()
const selected = ref(null)

// Update the selected city in the cityStore
const setSelected = (selectedCity) => {
  cityStore.cityName = selectedCity?.name || ""
}

// Trigger prayer times search using the cityName, even if it's not found in the API
const onSearch = () => {
  const city = cityStore.cityName.trim();

  if (!city) {
    return;
  }

  // Set the city in the prayer store and trigger search for prayer times
  prayerStore.city = city;
  prayerStore.setPrayerTimes();
};
</script>
