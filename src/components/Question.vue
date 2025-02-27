<script lang="ts">
import { defineComponent } from 'vue';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';

import { mapStores } from 'pinia'
import { useCounterStore } from "../stores/counter";

type Choice = {
  text: string;
};

export default defineComponent({
  name: 'QuizCheckboxes',
  components: {
    Checkbox,
    Button,
    Card,
    ProgressBar
  },

  props: {
    title: String,
    subtitle: String,
    choices: {
      type: Array as () => Choice[],
      required: true
    }
  },

  data() {
    return {
      answer: [] as string[]
    };
  },

  computed: {
    ...mapStores(useCounterStore),

    nextButtonMessage() {
      return this.counterStore.currentQuestion >= this.counterStore.questions.length - 1 ? "Submit" : "Next"
    },

    progress() {
      const totalQuestions = this.counterStore.questions.length;
      const currentIndex = this.counterStore.currentQuestion;

      if (totalQuestions === 0) return 0;

      return Math.round((currentIndex / totalQuestions) * 100);
    },
  },

  methods: {
    nextQuestion() {
      this.counterStore.nextQuestion(this.answer);

      this.answer = [];
    }
  }
});
</script>

<template>
  <Card style="width: 50rem; overflow: hidden">
    <template #header>
      <ProgressBar :value="progress"></ProgressBar>
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <div v-for="(choice, index) in choices" :key="choice.text">
        <div class="checkbox-group">
          <Checkbox v-model="answer" :inputId="`choice-${index}`" name="choice" :value="choice.text" checked />
          <label :for="`choice-${index}`">{{ choice.text }}</label>
        </div>
      </div>

    </template>


    <template #footer>
      <div class="button-group">
        <Button label="Back" severity="secondary" outlined class="full-width" @click="counterStore.previousQuestion" />
        <Button :label="nextButtonMessage" class="full-width" @click="nextQuestion()" />
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
