<template>
  <v-row class="px-4" justify="start" align="baseline">
    <v-checkbox
      v-for="(day, index) of days"
      :key="day"
      :disabled="isDisabled(day)"
      v-model="dayValues[index].value"
      readonly
      @click.stop="handleDayChange(day, index)"
      dense
      class="tick"
      :label="day"
    />
    <v-select v-if="value.day" dense class="select" multiple v-model="selectedItems" :items="items" label="" solo></v-select>
    <v-text-field type="number" v-if="aTextField" v-model="value.A" class="text" label="A"></v-text-field>
    <v-text-field type="number" v-if="bTextField" v-model="value.B" class="text" label="B"></v-text-field>
    <v-text-field type="number" v-if="cTextField" v-model="value.C" class="text" label="C"></v-text-field>
    <v-text-field type="number" v-if="dTextField" v-model="value.D" class="text" label="D"></v-text-field>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { IDayValue } from "@/models/IDayValue";

export default Vue.extend({
  props: {
    value: {
      type: Object as () => IDayValue,
      required: true
    },
    disabledDays: {
      type: Array as () => string[]
    }
  },
  data() {
    return {
      items: ["A", "B", "C", "D"],
      selectedItems: [] as string[],
      days: ["MON", "TUE", "WED", "THU", "FRI", "STA", "SUN"],
      dayValues: [
        { day: "MON", value: this.value.day === "MON" },
        { day: "TUE", value: this.value.day === "TUE" },
        { day: "WED", value: this.value.day === "WED" },
        { day: "THU", value: this.value.day === "THU" },
        { day: "FRI", value: this.value.day === "FRI" },
        { day: "STA", value: this.value.day === "STA" },
        { day: "SUN", value: this.value.day === "SUN" }
      ]
    };
  },
  computed: {
    aTextField(): boolean {
      return this.selectedItems.some(x => x === "A");
    },
    bTextField(): boolean {
      return this.selectedItems.some(x => x === "B");
    },
    cTextField(): boolean {
      return this.selectedItems.some(x => x === "C");
    },
    dTextField(): boolean {
      return this.selectedItems.some(x => x === "D");
    },
    anyDaySelected(): boolean {
      return this.dayValues.some(x => x.value === true);
    }
  },
  watch: {
    aTextField(newValue) {
      if (!newValue) {
        this.value.A = null;
      }
    },
    bTextField(newValue) {
      if (!newValue) {
        this.value.B = null;
      }
    },
    cTextField(newValue) {
      if (!newValue) {
        this.value.C = null;
      }
    },
    dTextField(newValue) {
      if (!newValue) {
        this.value.D = null;
      }
    }
  },
  methods: {
    handleDayChange(day: string, index: number) {
      if (this.isDisabled(day)) {
        return;
      }
      if (!this.anyDaySelected) {
        this.dayValues[index].value = !this.dayValues[index].value;
        this.value.day = day;
      } else {
        if (this.dayValues[index].value) {
          this.$emit("removeDay", day);
        } else {
          this.$emit("addDay", day);
        }
      }
    },
    isDisabled(day: string) {
      return this.disabledDays.some(x => x === day);
    }
  }
});
</script>

<style scoped>
.tick {
  margin-right: 20px;
}
.select {
  max-width: 200px !important;
  margin-right: 20px !important;
}
.text {
  max-width: 80px !important;
  margin-right: 20px;
}
</style>
