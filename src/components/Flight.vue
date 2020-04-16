<template>
  <div>
    <DayValue
      :key="dayValue.day"
      :value="dayValue"
      v-for="dayValue in value.days"
      :disabledDays="disabledDays"
      @addDay="handleAddDay"
      @removeDay="handleRemoveDay"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DayValue from "@/components/DayValue.vue";
import { IFlight } from "@/models/IFlight";

export default Vue.extend({
  components: {
    DayValue
  },
  props: {
    value: {
      type: Object as () => IFlight
    },
    disabledDays: {
      type: Array as () => string[]
    }
  },
  methods: {
    handleAddDay(day: string) {
      if (!this.value.days.some(x => x.day === day)) {
        this.value.days.push({
          day,
          A: null,
          B: null,
          C: null,
          D: null
        });
      }
    },
    handleRemoveDay(day) {
      if (this.value.days.some(x => x.day === day)) {
        const index = this.value.days.findIndex(x => x.day === day);
        if (this.value.days.length > 1) {
          this.value.days.splice(index, 1);
        } else {
          this.value.days[index].day = "";
          this.value.days[index].A = null;
          this.value.days[index].B = null;
          this.value.days[index].C = null;
          this.value.days[index].D = null;
        }
      }
    }
  }
});
</script>
