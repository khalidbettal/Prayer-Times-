<template>
  
  <div class="prayer-time-container  dark:bg-gray-800 dark:border-emerald-400">
      <!-- Language switch button -->
    <button 
      @click="toggleLanguage" 
      class="px-4 py-2 rounded bg-emerald-500 text-white mb-4"
    >
      Switch to {{ isArabic ? 'English' : 'Arabic' }}
    </button>
    <h1 class="title dark:text-white">Prayer Times for {{ prayerStore.city }}</h1>
    <h2 class="date dark:text-emerald-300 font-bold ">{{ prayerStore.cityCountry }}</h2>
    <p class="date dark:text-emerald-300 font-bold ">{{ prayerStore.date }}</p>

  

    <div class="prayer-times-list" v-show="!prayerStore.isLoading && !prayerStore.error">
      <div 
        v-for="(time, prayer) in prayerStore.prayerTimes" 
        :key="prayer" 
        class="prayer-item dark:bg-gray-700 dark:hover:bg-indigo-900"
      >
        <span class="prayer-name dark:text-emerald-400">
          {{ isArabic ? getArabicPrayerName(prayer) : prayer }}
        </span>
        <span class="prayer-time dark:text-white">{{ time }}</span>
      </div>
    </div>

    <div v-show="prayerStore.isLoading" class="text-center">
      <Spinner />
    </div>

    <div class="error text-center text-red-300" v-if="prayerStore.error">XX: {{ prayerStore.error }} </div>
  </div>
</template>






<script setup>
import { ref, onMounted } from 'vue';
import { usePrayerTimesStore } from '../stores/prayerTimes';
import Spinner from './tools/Spinner.vue';

const prayerStore = usePrayerTimesStore();
const isArabic = ref(false); // State to track language

onMounted(() => {
  prayerStore.setPrayerTimes();
});

function toggleLanguage() {
  isArabic.value = !isArabic.value;
}

function getArabicPrayerName(englishName) {
  const arabicNames = {
    "Fajr": "الفجر",
    "Dhuhr": "الظهر",
    "Asr": "العصر",
    "Maghrib": "المغرب",
    "Isha": "العشاء"
  };
  return arabicNames[englishName] || englishName;
}
</script>






<style >
/* General Container */
.prayer-time-container {
  max-width: 28rem;
  margin: 10rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #6366f1;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #4f46e5;
  text-align: center;
  margin-bottom: 1rem;
}

.date {
  font-size: 1rem;
  color: #4b5563;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

.prayer-times-list {
  display: grid;
  gap: 1rem;
}

.prayer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.prayer-name {
  font-weight: 800;
  color: #4f46e5;
}

.prayer-time {
  font-weight: 800;
  color: #4b5563;
}

.prayer-item:hover {
  background-color: #e0e7ff;
}

@media (min-width: 640px) {
  .prayer-time-container {
    max-width: 36rem;
  }
}

@media (min-width: 1024px) {
  .prayer-time-container {
    max-width: 44rem;
  }
}

@media (min-width: 1280px) {
  .prayer-time-container {
    max-width: 48rem;
  }
}
</style>
