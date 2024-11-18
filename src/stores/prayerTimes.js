import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePrayerTimesStore = defineStore('prayerTimes', () => {
  // Current date
  const date = ref(new Date().toISOString().split('T')[0]);

  // Prayer times data
  const prayerTimes = ref({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: ""
  });

 
  const setPrayerTimes = () => {
    prayerTimes.value = {
      Fajr: "6:00 AM",
      Dhuhr: "12:00 PM",
      Asr: "3:00 PM",
      Maghrib: "6:00 PM",
      Isha: "8:00 PM"
    };
  };

  return { date, prayerTimes, setPrayerTimes };
});
