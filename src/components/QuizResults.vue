<template>
  <Card class="result-card">

    <template #content>
      <div class="result-container">
        <h2 class="score">Your score is</h2>
        <p class="score-value" :class="statusClass">{{ score }}%</p>
        <p :class="statusClass">Status: {{ status }}</p>
      </div>
    </template>
    <template #footer>
      <Button class="full-width" label="Retry" @click="reset()" />
    </template>
  </Card>
</template>

<script lang="ts">
import Card from 'primevue/card';
import { mapStores } from 'pinia';
import { useQuestionStore } from "../stores/question";
import Button from 'primevue/button';

export default {
  name: "QuizResults",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Card, Button },

  computed: {
    ...mapStores(useQuestionStore),

    score() {
      return this.questionStore.countCorrectAnswers / this.questionStore.questions.length * 100;
    },

    status() {
      return this.score >= 85 ? "PASSED" : "FAILED"
    },

    statusClass() {
      return this.score >= 85 ? "status-passed" : "status-failed";
    }
  },

  methods: {
    reset() {
      this.questionStore.$reset()
    }
  }
}
</script>

<style scoped>
.result-card {
  text-align: center;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
}

.score-value {
  font-size: 3rem;
  font-weight: bold;
}

.status-passed {
  color: #4caf50;
  font-weight: bold;
}

.status-failed {
  color: #f44336;
  font-weight: bold;
}

.full-width {
  width: 100%;
}
</style>
