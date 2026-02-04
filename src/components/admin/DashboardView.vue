<template>
  <div>
    <h3 class="mb-4">Dashboard Overview</h3>

    <div class="row">
      <div class="col-md-6">
        <canvas ref="postChart" style="max-height: 400px"></canvas>
      </div>

      <div class="col-md-6">
        <canvas ref="commentChart" style="max-height: 400px"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

const postChart = ref(null);
const commentChart = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get("https://localhost:7181/api/admin/dashboard");

    const postStats = res.data.postStats;
    const commentStats = res.data.commentStats;

    // Map data cho Post chart
    const postData = {
      labels: postStats.map((p) => p.category),
      datasets: [
        {
          data: postStats.map((p) => p.totalPosts),
        },
      ],
    };

    // Map data cho Comment chart
    const commentData = {
      labels: commentStats.map((c) => c.category),
      datasets: [
        {
          data: commentStats.map((c) => c.totalComments),
        },
      ],
    };

    // new Chart(postChart.value, {
    //   type: "pie",
    //   data: postData,
    // });

    // new Chart(commentChart.value, {
    //   type: "pie",
    //   data: commentData,
    // });
    new Chart(postChart.value, {
      type: "doughnut",
      data: postData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Tổng số bài viết theo thể loại",
            font: {
              size: 18,
            },
          },
        },
      },
    });

    new Chart(commentChart.value, {
      type: "doughnut",
      data: commentData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Tổng số comment theo thể loại",
            font: {
              size: 18,
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Lỗi load dashboard:", err);
  }
});
</script>
