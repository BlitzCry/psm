<script lang="ts">
import Question from "../components/Question.vue";
import Result from "../components/Result.vue";
import questions from "../stores/questions.js";

import { mapStores } from 'pinia'
import { useCounterStore } from "../stores/counter";
import QuestionEntity from "../entities/QuestionEntity";
import type QuestionType from "../types/Question.js";

export default {
  components: {
    Question,
    Result
  },

  data() {
    return {
      question: undefined,
      questions: [] as QuestionType[]
    }
  },

  computed: {
    ...mapStores(useCounterStore)
  },

  mounted() {
    questions.forEach((question: QuestionType) => {
      this.questions.push(QuestionEntity.fromObject(question))
    })
  }
};

</script>

<template>
  <div>
    <Question v-if="counterStore.getCurrentQuestion" :title="counterStore.getCurrentQuestion.question"
      subtitle="Choose all that apply" :choices="counterStore.getCurrentQuestion.choices" />
    <Result v-else />
  </div>

</template>
