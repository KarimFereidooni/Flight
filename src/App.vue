<template>
  <v-app>
    <div class="header"></div>
    <v-content class="pa-2">
      <v-stepper v-model="stepperValue">
        <v-stepper-header>
          <template v-for="(flight, index) of flights">
            <v-stepper-step :key="`step${index}`" :step="index + 1">{{ flight.name }}</v-stepper-step>
            <v-divider :key="`divider${index}`"></v-divider>
          </template>
          <v-stepper-step step="4">Result</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :key="flight.name" :step="index + 1" v-for="(flight, index) of flights">
            <div class="stepper-content">
              <Flight :value="flight" :disabledDays="disabledDays" />
            </div>
            <v-card-actions>
              <v-btn color="primary" @click="goPrev">
                Previous
              </v-btn>
              <v-btn color="primary" @click="goNext">
                Next
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content :step="flights.length + 1">
            <div class="stepper-content">
              <Result :value="flights" />
            </div>
            <v-card-actions>
              <v-btn color="primary" @click="stepperValue--">
                Previous
              </v-btn>
              <v-btn color="primary" disabled>
                Next
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { IFlight } from "@/models/IFlight";
import Flight from "@/components/Flight.vue";
import Result from "@/components/Result.vue";

export default Vue.extend({
  components: {
    Flight,
    Result
  },
  data() {
    return {
      stepperValue: 1,
      disabledDays: ["WED", "FRI"],
      flights: [
        {
          name: "Flight 1",
          days: [{ day: "", MON: false, TUE: false, WED: false, THU: false, FRI: false, STA: false, SUN: false, A: 0, B: 0, C: 0, D: 0 }]
        },
        {
          name: "Flight 2",
          days: [{ day: "", MON: false, TUE: false, WED: false, THU: false, FRI: false, STA: false, SUN: false, A: 0, B: 0, C: 0, D: 0 }]
        },
        {
          name: "Flight 3",
          days: [{ day: "", MON: false, TUE: false, WED: false, THU: false, FRI: false, STA: false, SUN: false, A: 0, B: 0, C: 0, D: 0 }]
        }
      ] as IFlight[]
    };
  },
  methods: {
    goPrev() {
      if (this.stepperValue > 1) {
        this.stepperValue--;
      }
    },
    goNext() {
      if (this.stepperValue <= this.flights.length) {
        this.stepperValue++;
      }
    }
  }
});
</script>

<style scoped>
.header {
  background-image: url(/header.png);
  background-size: cover;
  background-position: center;
  height: 90px;
}
.stepper-content {
  min-height: 200px;
}
</style>
