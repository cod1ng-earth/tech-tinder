<template>
    <section>
        <stats-chart :data-holder="{
          labels: ['January', 'Feb'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20]
            }
          ]
      }" :options="{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ]
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 0,
            fontSize: 20,
            fontStyle: 'Bold'
          }
        }
      }"></stats-chart>
    </section>
</template>

<script>
import StatsChart from '@/StatsChart';

export default {
    components: {
        StatsChart
    }
};
</script>

