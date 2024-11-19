<template>
  <div class="prayer-time-container mb-4 dark:bg-gray-800 dark:border-emerald-400">
    <h2 class="title dark:text-white">Prayer Times for {{ prayerStore.city }}/{{ prayerStore.country }}</h2>
    <p class="date dark:text-emerald-300 font-bold ">{{ prayerStore.date }}</p>

    <div class="prayer-times-list">
      <div 
        v-for="(time, prayer) in prayerStore.prayerTimes" 
        :key="prayer" 
        class="prayer-item dark:bg-gray-700 dark:hover:bg-indigo-900"
      >
        <span class="prayer-name dark:text-emerald-400">{{ prayer }}</span>
        <span class="prayer-time dark:text-white">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePrayerTimesStore } from '../stores/prayerTimes';
import { onMounted } from 'vue';

const prayerStore = usePrayerTimesStore();

onMounted(() => {
  prayerStore.setPrayerTimes();
});
</script>

<style >
/* General Container */
.prayer-time-container {
  max-width: 28rem;
  margin: 1.5rem auto;
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
