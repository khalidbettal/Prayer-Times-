import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePrayerTimesStore = defineStore('prayerTimes', () => {
  // Current date
  const date = ref(new Date().toISOString().split('T')[0]);

  // City name
  const city = ref('Smara');

  // Country name
  const country = ref('Morocco');

  // Prayer times data
  const prayerTimes = ref({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: ""
  });

  // Helper function to convert 24-hour time to 12-hour format with AM/PM
  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 or 12 to 12
    return `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${suffix}`;
  };

  // Set prayer times with converted 12-hour format
  const setPrayerTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${date.value}?country=${country.value}&city=${city.value}`);
      const data = await response.json();
      
      // Update prayerTimes with the formatted timings
      prayerTimes.value = {
        Fajr: convertTo12HourFormat(data.data.timings.Fajr),
        Sunrise: convertTo12HourFormat(data.data.timings.Sunrise),
        Dhuhr: convertTo12HourFormat(data.data.timings.Dhuhr),
        Asr: convertTo12HourFormat(data.data.timings.Asr),
        Maghrib: convertTo12HourFormat(data.data.timings.Maghrib),
        Isha: convertTo12HourFormat(data.data.timings.Isha)
      };
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
  };

  return { date, prayerTimes, city, country, setPrayerTimes };
});
