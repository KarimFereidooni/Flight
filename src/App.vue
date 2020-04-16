<template>
  <v-app>
    <div class="header"></div>
    <v-content class="pa-2">
      <v-stepper v-model="stepperValue">
        <v-stepper-header>
          <template v-for="(flight, index) of flights">
            <v-stepper-step editable :key="`step${index}`" :step="index + 1">{{ flight.name }}</v-stepper-step>
            <v-divider :key="`divider${index}`"></v-divider>
          </template>
          <v-stepper-step editable :step="lastStep">Result</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :key="flight.name" :step="index + 1" v-for="(flight, index) of flights">
            <div class="stepper-content">
              <Flight :value="flight" :disabledDays="disabledDays" />
            </div>
            <v-card-actions>
              <v-btn :disabled="stepperValue === 1" color="primary" @click="goPrev">
                Previous
              </v-btn>
              <v-btn color="primary" @click="goNext">
                Next
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content :step="lastStep">
            <div class="stepper-content">
              <Result :value="flights" :disabledDays="disabledDays" />
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Setting</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field dense outlined type="number" :min="3" label="Flight Count" v-model.number="flightCount"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select dense outlined multiple v-model="disabledDays" :items="days" label="Disabled Days"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: true,
      flightCount: 3,
      stepperValue: 1,
      days: ["MON", "TUE", "WED", "THU", "FRI", "STA", "SUN"],
      disabledDays: [],
      flights: [] as IFlight[]
    };
  },
  methods: {
    goPrev() {
      if (this.stepperValue > 1) {
        this.stepperValue--;
      }
    },
    goNext() {
      if (this.stepperValue <= this.flightCount) {
        this.stepperValue++;
      }
    },
    async closeDialog() {
      for (let i = 0; i < this.flightCount; i++) {
        this.flights.push({
          name: "Flight " + (i + 1),
          days: [{ day: "", A: null, B: null, C: null, D: null }]
        });
      }
      this.dialog = false;
      this.stepperValue = this.lastStep;
      await this.$nextTick();
      this.stepperValue = 1;
    }
  },
  computed: {
    lastStep(): number {
      return parseInt(this.flightCount.toString(), 10) + 1;
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
