<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["dataHolder", "options"],
  mounted() {    
    this.renderChart(
      this.dataHolder,
      this.options
    );
  }
};
</script>