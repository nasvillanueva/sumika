import dayjs from "dayjs";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";

const CHECK_DARK_MODE_INTERVAL = 1000 * 60; // 1 minute

export const useAutoDarkMode = () => {
  const shouldEnableDarkMode = () => {
    const currentHour = dayjs().hour();

    return currentHour >= 18 || currentHour <= 8;
  };

  const isDarkMode = ref(shouldEnableDarkMode());
  let intervalId = -1;

  watchEffect(() => {
    document?.documentElement.classList.toggle("dark", isDarkMode.value);
  });

  onMounted(() => {
    intervalId = setInterval(() => {
      isDarkMode.value = shouldEnableDarkMode();
    }, CHECK_DARK_MODE_INTERVAL);
  });

  onUnmounted(() => clearInterval(intervalId));
};
