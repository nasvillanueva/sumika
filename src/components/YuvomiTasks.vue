<script lang="ts" setup>
import dayjs from "dayjs";
import { onMounted, ref } from "vue";

const TASKS_URL = `${import.meta.env.SUMIKA_YUVOMI_BASE_URL}/api/v1/tasks`;

const tasks = ref([]);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const queryParams = {
      status: "open",
    };
    const queryParamsString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${TASKS_URL}?${queryParamsString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.SUMIKA_YUVOMI_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("something's wrong");
    }

    const twoDaysAfterNow = dayjs().add(2, "day");

    const { data } = await response.json();
    const filteredTasks = data.flatMap((task) => {
      const { id, title, due_date, due_time, category, assigned_users } = task;

      const dueTime = due_time ?? "00:00";
      const dueDate = dayjs(`${due_date}T${dueTime}+09:00`);

      const isDueSoon = twoDaysAfterNow.isBefore(dueDate, "day");

      if (isDueSoon) {
        return [];
      }

      return {
        id,
        title,
        category,
        assigned_users,
        due_date,
        due_time,
      };
    });

    tasks.value = filteredTasks;
  } catch (e) {
    errorMessage.value = e.message;
  }
});
</script>

<template>
  <div class="flex flex-col py-4 w-2xl">
    <p class="text-4xl font-bold text-orange">Tasks</p>
    <p v-if="errorMessage" class="text-2xl font-semibold text-blue">{{ errorMessage }}</p>
    <ul v-if="!errorMessage">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex my-4 p-2 rounded-md border border-gray-300"
      >
        <div class="grow">
          <p class="text-2xl font-medium text-blue mb-2">{{ task.title }}</p>
          <p class="flex">{{ task.due_date }} {{ task.due_time }}</p>
          <p class="uppercase text-sm text-fg-muted">{{ task.category }}</p>
        </div>
        <div>
          <div class="flex gap-2">
            <p
              v-for="assignee in task.assigned_users"
              :key="assignee.id"
              class="h-8 w-8 flex items-center justify-center text-sm rounded-full border border-gray-300"
            >
              {{ assignee.display_name.slice(0, 1) }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
