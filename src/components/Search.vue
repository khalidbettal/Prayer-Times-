<template>
  <h1 class="text-center py-6 underline">Here will be Using Search By Cities and Countries</h1>
  <div class="flex flex-col items-center justify-center">
    <div class="flex max-sm:flex-col  items-center justify-center gap-4 ">

<input 
  id="city" 
  v-model="prayerStore.city" 
  type="text" 
  class=" p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" 
  placeholder="Enter city name"
/>


<input 
  id="country" 
  v-model="prayerStore.country" 
  type="text" 
  class="p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" 
  placeholder="Enter country name"
/>

  </div>

  <button class="p-3 mb-4 border-2 rounded-lg bg-green-400" @click="prayerStore.setPrayerTimes">Search</button>
  </div>

</template>

<script setup>
   import { usePrayerTimesStore } from '../stores/prayerTimes';

   const prayerStore = usePrayerTimesStore();
</script>