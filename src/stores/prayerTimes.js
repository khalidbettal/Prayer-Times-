import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usePrayerTimesStore = defineStore('prayerTimes', () => {
  const date = ref(new Date().toISOString().split('T')[0]);
  const city = ref("youssoufia");
  const country = ref("");
  const prayerTimes = ref({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: ""
  });
  const isLoading = ref(false);
  const error = ref(null);
  const cityCountry = ref("");

  // Helper function to format time to 12-hour format with AM/PM
  const formatTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${suffix}`;
  };

  // Fetch and set prayer times
  const setPrayerTimes = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: {
          country: country.value,
          city: city.value,
          date: date.value
        }
      });

      if (data.code !== 200) {
        error.value = 'Invalid location';
        return;
      }

      // Update prayerTimes with formatted timings
      const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
      prayerTimes.value = {
        Fajr: formatTo12Hour(Fajr),
        Sunrise: formatTo12Hour(Sunrise),
        Dhuhr: formatTo12Hour(Dhuhr),
        Asr: formatTo12Hour(Asr),
        Maghrib: formatTo12Hour(Maghrib),
        Isha: formatTo12Hour(Isha)
      };

      // Update cityCountry
      cityCountry.value = data.data.meta.method.name

    } catch (err) {
      console.error(err);
      error.value = 'Unable to fetch prayer times';
    } finally {
      isLoading.value = false;
    }
  };

  return { date, prayerTimes, city, country, isLoading, error, cityCountry, setPrayerTimes };
});
