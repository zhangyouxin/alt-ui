<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    console.log('char data is,', this.chartData)
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
