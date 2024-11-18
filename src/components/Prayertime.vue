<template>
    <div class="prayer-time-container">
      <h2 class="title">Prayer Times for {{ prayerStore.city }}/{{ prayerStore.country }}</h2>
      <p class="date">{{ prayerStore.date }}</p>
  
      <div class="prayer-times-list">
        <div 
          v-for="(time, prayer) in prayerStore.prayerTimes" 
          :key="prayer" 
          class="prayer-item"
        >
          <span class="prayer-name">{{ prayer }}</span>
          <span class="prayer-time">{{ time }}</span>
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
   })
   
   
  </script>
  
  <style scoped>
  /* General Container */
  .prayer-time-container {
    max-width: 28rem; /* 448px */
    margin: 1.5rem auto;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #6366f1; /* Indigo Border */
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #4f46e5; /* Indigo */
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .date {
    font-size: 1rem;
    color: #4b5563; /* Gray */
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
    background-color: #f3f4f6; /* Light Gray */
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  .prayer-name {
    font-weight: 800;
    color: #4f46e5; /* Indigo */
  }
  
  .prayer-time {
    font-weight: 800;
    color: #4b5563; /* Gray */
  }
  
  /* Hover effect */
  .prayer-item:hover {
    background-color: #e0e7ff; /* Light Indigo */
  }
  
  /* Responsive Styles */
  
  /* Tablet (640px) */
  @media (min-width: 640px) {
    .prayer-time-container {
      max-width: 36rem; /* 576px */
    }
  }
  
  /* Laptop (1024px) */
  @media (min-width: 1024px) {
    .prayer-time-container {
      max-width: 44rem; /* 704px */
    }
  }
  
  /* Large Screens (1280px) */
  @media (min-width: 1280px) {
    .prayer-time-container {
      max-width: 48rem; /* 768px */
    }
  }
  </style>
  