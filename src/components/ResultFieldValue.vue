<template>
  <span v-if="value"> {{ value.A }}&nbsp;|&nbsp;{{ value.B }}&nbsp;|&nbsp;{{ value.C }}&nbsp;|&nbsp;{{ value.D }} </span>
</template>

<script lang="ts">
import Vue from "vue";
import { IDayValue } from "@/models/IDayValue";

export default Vue.extend({
  props: {
    value: {
      type: Object as () => IDayValue,
      required: false
    }
  }
});
</script>
