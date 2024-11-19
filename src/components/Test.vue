<template>
  <div class="my-10 w-auto sm:w-1/2 mx-auto">
    <Combobox v-model="cityStore.cityName" @update:modelValue="setSelected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            v-model="cityStore.cityName"
            @input="cityStore.onInputChange"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="cityStore.query = ''"
        >
          <ComboboxOptions
            v-if="cityStore.filteredCities.length > 0"
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <!-- Limit options to 4 cities -->
            <ComboboxOption
              v-for="city in cityStore.filteredCities.slice(0, 4)"
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
import { useCityStore } from '@/stores/citiesStore'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const cityStore = useCityStore()

// Update the selected city in the cityStore
const setSelected = (selectedCity) => {
  cityStore.cityName = selectedCity?.name || ""
}
</script>
