<script>
import { Line, mixins } from 'vue-chartjs'
import { defaultConfig } from '@components/chartConfig.js'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: function() {
        return defaultConfig
      },
    },
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
