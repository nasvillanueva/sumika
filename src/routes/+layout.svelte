<script lang="ts">
  import dayjs from "dayjs";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  let { children } = $props();

  const darkMode = writable(false);

  onMount(() => {
    darkMode.subscribe((newDarkMode) => {
      document?.documentElement.classList.toggle("dark", newDarkMode);
    });

    const toggleDarkMode = () => {
      const currentHour = dayjs().hour();

      darkMode.set(currentHour >= 18 || currentHour <= 9);
    };

    const checkDarkModeInterval = setInterval(toggleDarkMode, 1000 * 60);

    toggleDarkMode();

    return () => {
      clearInterval(checkDarkModeInterval);
    };
  });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
