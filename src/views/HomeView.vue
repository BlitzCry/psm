<script lang="ts">
import Question from "../components/Question.vue";

import { mapStores } from 'pinia'
import { useCounterStore } from "../stores/counter";
import { useQuestionStore } from "../stores/question";

import type QuestionType from "../types/Question.js";

import QuizReview from "../components/QuizReview.vue";

export default {
  components: {
    Question,
    QuizReview
  },

  data() {
    return {
      question: undefined,
      questions: [] as QuestionType[]
    }
  },

  computed: {
    ...mapStores(useCounterStore, useQuestionStore)
  },
};

</script>

<template>
  <div class="question-container">
    <div class="fixed-card">
      <Question v-if="!questionStore.isFinished" :question="questionStore.question()" />
      <QuizReview v-else />
    </div>
  </div>
</template>

<style scoped>
.question-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Full viewport height */
  grid-column: 1 / -1;
}

.fixed-card {
  width: 700px;
  min-width: 500px;
  /* Fixed width */
  height: 500px;
  /* Fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>
