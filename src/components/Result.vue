<template>
  <v-data-table :headers="headers" :items="value" :items-per-page="50" hide-default-footer class="elevation-1">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>
          <span class="disabled" v-if="isDisabled('MON')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'MON')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('TUE')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'TUE')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('WED')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'WED')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('THU')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'THU')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('FRI')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'FRI')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('STA')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'STA')" />
        </td>
        <td>
          <span class="disabled" v-if="isDisabled('SUN')">Disabled</span>
          <ResultFieldValue v-else :value="getDay(item.days, 'SUN')" />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import { IFlight } from "@/models/IFlight";
import { IDayValue } from "@/models/IDayValue";
import ResultFieldValue from "@/components/ResultFieldValue.vue";

export default Vue.extend({
  components: {
    ResultFieldValue
  },
  props: {
    value: {
      type: Array as () => IFlight[]
    },
    disabledDays: {
      type: Array as () => string[]
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
    getDay(data: IDayValue[], day: string): IDayValue | undefined {
      return data.find(x => x.day === day);
    },
    isDisabled(day: string) {
      return this.disabledDays.some(x => x === day);
    }
  }
});
</script>

<style scoped>
.disabled {
  font-size: 12px;
  color: #b5acac;
}
</style>
