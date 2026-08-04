<script setup lang="ts">
import { useAutoDarkMode } from "@/composables/useAutoDarkMode";

useAutoDarkMode();
</script>

<template>
  <div class="h-full w-full">
    <RouterView />
  </div>
</template>
