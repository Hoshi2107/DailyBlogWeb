<template>
  <div>
    <h3 class="mb-4">Dashboard Overview</h3>

    <div class="row">
      <div class="col-md-6">
        <canvas ref="postChart"></canvas>
      </div>

      <div class="col-md-6">
        <canvas ref="commentChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const postChart = ref(null);
const commentChart = ref(null);

onMounted(() => {
  // Fake data (sau này gọi API)
  const postData = {
    labels: ["Fantasy", "Romance", "Action", "Drama"],
    datasets: [
      {
        data: [5, 3, 7, 2],
      },
    ],
  };

  const commentData = {
    labels: ["Fantasy", "Romance", "Action", "Drama"],
    datasets: [
      {
        data: [12, 8, 20, 5],
      },
    ],
  };

  new Chart(postChart.value, {
    type: "pie",
    data: postData,
  });

  new Chart(commentChart.value, {
    type: "pie",
    data: commentData,
  });
});
</script>
