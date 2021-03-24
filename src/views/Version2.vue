<template>
  <div class="flex flex-wrap">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <card-line-chart />
    </div>
  </div>
</template>
<script>
import CardLineChart from "@/components/CardLineChart.vue";

export default {
  components: {
    CardLineChart,
  },
};
</script>
