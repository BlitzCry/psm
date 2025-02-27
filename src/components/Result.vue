<script lang="ts">
import { defineComponent } from 'vue';

import Card from 'primevue/card';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import { mapStores } from 'pinia'
import { useCounterStore } from "../stores/counter";

type Choice = {
  text: string;
};


export default defineComponent({
  name: 'QuizCheckboxes',
  components: {
    Button,
    Checkbox,
    Card,
  },

  props: {
    title: String,
    subtitle: String,

  },

  mounted() {
    this.setQuestion(this.currentQuestionIndex);
  },

  data() {
    return {
      answer: [] as unknown[],
      currentQuestion: {
        question: '',
        choices: [] as { text: string; correct: boolean; chosen: boolean }[]
      },
      currentQuestionIndex: 0 as number,
      choices: [] as Choice[],
    };
  },

  computed: {
    ...mapStores(useCounterStore),

    nextButtonMessage() {
      return this.counterStore.currentQuestion >= this.counterStore.questions.length - 1 ? "Retry" : "Next"
    },
  },

  methods: {
    setQuestion(index: number) {
      this.currentQuestionIndex = index;
      this.currentQuestion = {
        ...this.counterStore.getQuestion(index),
        choices: this.counterStore.getQuestion(index).choices.map((choice: any) => ({
          ...choice,
          chosen: false // or whatever default makes sense
        }))
      };
    },

    buttonVariant() {

    },

    retry() {
      this.counterStore.reset();
    },

    chosenIcon(choice: { text: string; correct: boolean; chosen?: boolean }) {
      return choice?.chosen ? "pi pi-times" : "pi";
    }

  }
});
</script>

<template>
  <h1>Overview</h1>
  {{ counterStore.getScoreMessage }}

  <h2>Questions</h2>
  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <Button v-for="(question, index) of counterStore.questions" :key="index"
      :severity="question.isCorrect ? 'success' : 'danger'" @click="setQuestion(index)"
      :variant="index !== currentQuestionIndex ? 'outlined' : 'text'">
      {{ index + 1 }}
    </Button>

  </div>
  <Card style=" width: 50rem; overflow: hidden">
    <template #title>{{ currentQuestion.question }}</template>
    <template #subtitle>

    </template>
    <template #content>
      <div v-for="(choice, index) in currentQuestion.choices" :key="index">
        <div class="checkbox-group">
          <div v-if="choice.correct">
            <Button :icon="chosenIcon(choice)" variant="outlined" severity="success" style="height: 2rem; width: 2rem"
              disabled>

            </Button> {{
              choice.text
            }}
          </div>
          <div v-else>
            <Button :icon="chosenIcon(choice)" variant="outlined" severity="danger" style="height: 2rem; width: 2rem"
              disabled /> {{ choice.text }}
          </div>
        </div>
      </div>
    </template>


    <template #footer>
      <div class="button-group">
        <Button :label="nextButtonMessage" class="full-width" @click="retry()" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  /* Increases spacing between checkbox and label */
  padding: 0.5rem 0;
  /* Vertical padding for each group */
  border-bottom: 1px solid #eaeaea;
  /* Optional: adds a light divider */
  margin-bottom: 0.5rem;
  /* Space after each group */
}

.checkbox-group:last-child {
  border-bottom: none;
  /* Remove border for the last item */
}

.button-group {
  display: flex;
  gap: 1rem;
  /* Space between buttons */
  margin-top: 0.25rem;
  /* Top margin */
}

.full-width {
  width: 100%;
}
</style>
