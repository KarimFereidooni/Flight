<template>
  <v-data-table :headers="headers" :items="value" :items-per-page="5" class="elevation-1">
    <template v-slot:item.MON="{ item }">
      {{ getDayValues(item.days, "MON") }}
    </template>
    <template v-slot:item.TUE="{ item }">
      {{ getDayValues(item.days, "TUE") }}
    </template>
    <template v-slot:item.WED="{ item }">
      {{ getDayValues(item.days, "WED") }}
    </template>
    <template v-slot:item.THU="{ item }">
      {{ getDayValues(item.days, "THU") }}
    </template>
    <template v-slot:item.FRI="{ item }">
      {{ getDayValues(item.days, "FRI") }}
    </template>
    <template v-slot:item.STA="{ item }">
      {{ getDayValues(item.days, "STA") }}
    </template>
    <template v-slot:item.SUN="{ item }">
      {{ getDayValues(item.days, "SUN") }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import { IFlight } from "@/models/IFlight";
import { IDayValue } from "@/models/IDayValue";

export default Vue.extend({
  props: {
    value: {
      type: Array as () => IFlight[]
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Flight",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "MON",
          align: "start",
          sortable: false,
          value: "MON"
        },
        {
          text: "TUE",
          align: "start",
          sortable: false,
          value: "TUE"
        },
        {
          text: "WED",
          align: "start",
          sortable: false,
          value: "WED"
        },
        {
          text: "THU",
          align: "start",
          sortable: false,
          value: "THU"
        },
        {
          text: "FRI",
          align: "start",
          sortable: false,
          value: "FRI"
        },
        {
          text: "STA",
          align: "start",
          sortable: false,
          value: "STA"
        },
        {
          text: "SUN",
          align: "start",
          sortable: false,
          value: "SUN"
        }
      ]
    };
  },
  methods: {
    getDayValues(data: IDayValue[], day: string) {
      const value = data.find(x => x.day === day);
      if (value) {
        return `A:${value.A} B:${value.B} C:${value.C} D:${value.D}`;
      } else {
        return `A:${0} B:${0} C:${0} D:${0}`;
      }
      return "";
    }
  }
});
</script>
