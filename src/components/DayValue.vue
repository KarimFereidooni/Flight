<template>
  <v-row class="px-4" justify="start" align="baseline">
    <v-checkbox :disabled="isDisabled('MON')" v-model="value.MON" readonly @click.stop="handleDayChange('MON')" dense class="tick" label="MON"></v-checkbox>
    <v-checkbox v-model="value.TUE" readonly @click.stop="handleDayChange('TUE')" dense class="tick" label="TUE"></v-checkbox>
    <v-checkbox
      :disabled="isDisabled('WED')"
      v-model="value.WED"
      readonly
      @click.stop="handleDayChange('WED')"
      dense
      class="tick"
      label="WED"
    ></v-checkbox>
    <v-checkbox disabled v-model="value.THU" readonly @click.stop="handleDayChange('THU')" dense class="tick" label="THU"></v-checkbox>
    <v-checkbox v-model="value.FRI" readonly @click.stop="handleDayChange('FRI')" dense class="tick" label="FRI"></v-checkbox>
    <v-checkbox v-model="value.STA" readonly @click.stop="handleDayChange('STA')" dense class="tick" label="STA"></v-checkbox>
    <v-checkbox v-model="value.SUN" readonly @click.stop="handleDayChange('SUN')" dense class="tick" label="SUN"></v-checkbox>
    <v-select dense class="select" multiple v-model="selectedItems" :items="items" label="" solo></v-select>
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
      selectedItems: [] as string[],
      items: ["A", "B", "C", "D"]
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
      let r = false;
      const keys = Object.keys(this.value);
      for (const key of keys) {
        if (this.value[key] === true) {
          r = true;
          break;
        }
      }
      return r;
    }
  },
  methods: {
    handleDayChange(day: string) {
      if (!this.anyDaySelected) {
        this.value[day] = !this.value[day];
        this.value.day = day;
      } else {
        if (this.value[day]) {
          this.$emit("removeDay", day);
        } else {
          this.$emit("addDay", day);
        }
      }
    },
    isDisabled(day: string) {
      return this.disabledDays.findIndex(x => x === day) >= 0;
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
