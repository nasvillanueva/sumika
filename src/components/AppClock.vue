<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, onMounted, onUnmounted, shallowRef } from "vue";

const TIME_FORMAT = "hh:mm A";
const DATE_FORMAT = "MMM DD YYYY, ddd";

const currentDateTime = shallowRef(dayjs());
const displayedDate = computed(() => currentDateTime.value.format(DATE_FORMAT));
const displayedTime = computed(() => currentDateTime.value.format(TIME_FORMAT));

let timerIntervalId = -1;

onMounted(() => {
  timerIntervalId = setInterval(() => {
    currentDateTime.value = dayjs();
  }, 1000);
});

onUnmounted(() => clearInterval(timerIntervalId));
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <p class="text-8xl font-bold text-orange">{{ displayedDate }}</p>
    <p class="text-6xl font-semibold">{{ displayedTime }}</p>
  </div>
</template>
