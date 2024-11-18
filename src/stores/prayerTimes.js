import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePrayerTimesStore = defineStore('prayerTimes', () => {
  // Current date
  const date = ref(new Date().toISOString().split('T')[0]);

  // Prayer times data
  const prayerTimes = ref({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: ""
  });

 
  const setPrayerTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${date.value}?city=Youssoufia&country=Morocco`);
      const data = await response.json();
      // Only update prayerTimes with the timings part of the response
      prayerTimes.value = {
        Fajr: data.data.timings.Fajr,
        Sunrise: data.data.timings.Sunrise,
        Dhuhr: data.data.timings.Dhuhr,
        Asr: data.data.timings.Asr,
        Maghrib: data.data.timings.Maghrib,
        Isha: data.data.timings.Isha
      };
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
  };

  return { date, prayerTimes, setPrayerTimes };
});
