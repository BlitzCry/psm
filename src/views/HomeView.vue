<script lang="ts">
import Question from "../components/Question.vue";
import Result from "../components/Result.vue";

import { mapStores } from 'pinia'
import { useCounterStore } from "../stores/counter";

export default {
  components: {
    Question,
    Result
  },

  data() {
    return {
      question: undefined
    }
  },

  computed: {
    ...mapStores(useCounterStore)
  },
};

</script>

<template>
  <div>
    <Question v-if="counterStore.getCurrentQuestion" :title="counterStore.getCurrentQuestion.question"
      subtitle="Choose all that apply" :choices="counterStore.getCurrentQuestion.choices" />
    <Result v-else />
  </div>

</template>
