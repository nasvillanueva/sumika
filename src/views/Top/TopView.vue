<script lang="ts" setup>
import AppClock from "@/components/AppClock.vue";
import YuvomiTasks from "@/components/YuvomiTasks.vue";
</script>

<template>
  <div class="flex h-full w-full justify-center py-16">
    <div class="flex gap-4">
      <AppClock />
      <YuvomiTasks />
    </div>
  </div>
</template>
