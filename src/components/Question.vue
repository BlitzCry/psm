<template>
  <Card class="question-card">
    <template #title>{{ question.question }}</template>
    <template #subtitle>Question {{ questionStore.pointer + 1 }} of {{ questionStore.questions.length }}</template>

    <template #content>
      <div class="options-container">
        <div v-for="(option, index) in question.options" :key="index" class="option">
          <div class="checkbox-group" v-if="question.type === 'multiple_choice'">
            <Checkbox :inputId="`${index}`" :name="`choice-${index}`" :value="option.text" v-model="selectedOptions"
              @change="updateSelections" />
            <label :for="`${index}`">{{ option.text }}</label>
          </div>

          <div class="checkbox-group" v-else>
            <RadioButton :inputId="`${index}`" :name="`choice-${index}`" :value="option.text" v-model="selectedOption"
              @change="updateSelections" />
            <label :for="`${index}`">{{ option.text }}</label>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="button-group fixed-footer">
        <Button v-if="isBackButtonActive" class="full-width" label="Back" severity="secondary" @click="previous()" />
        <Button v-if="isNextButtonActive" class="full-width" label="Next" @click="next()" />
        <Button v-else class="full-width" label="Submit" @click="submit()" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';

import { mapStores } from 'pinia';
import { useQuestionStore } from "../stores/question";

import type Option from '../types/Option.js'
import type Question from "@/types/Question.ts";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Question',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Checkbox, Button, Card, RadioButton },

  props: { question: { type: Object as PropType<Question>, required: true } },

  data() {
    return { selectedOptions: [] as string[], selectedOption: '' as string };
  },

  watch: {
    question: { immediate: true, handler() { this.initializeSelections(); } }
  },

  computed: {
    ...mapStores(useQuestionStore),

    isBackButtonActive() { return this.questionStore.pointer !== 0; },
    isNextButtonActive() { return this.questionStore.pointer + 1 < this.questionStore.questions.length; }
  },

  methods: {
    initializeSelections() {
      if (this.question.type === 'multiple_choice') {
        this.selectedOptions = this.question.options.filter((option: Option) => option.isSelected).map((option: Option) => option.text);
      } else {
        const selected = this.question.options.find((option: Option) => option.isSelected);
        this.selectedOption = selected ? selected.text : '';
      }
    },

    updateSelections() {
      this.question.options.forEach((option: Option) => {
        option.isSelected = this.question.type === 'multiple_choice' ? this.selectedOptions.includes(option.text) : option.text === this.selectedOption;
      });
    },

    next() {
      this.questionStore.next(this.selectedOptions.length ? this.selectedOptions : [this.selectedOption]);
      this.selectedOptions = [];
      this.selectedOption = '';
    },

    previous() { this.questionStore.previous(); },
    submit() { this.next(); this.questionStore.submit(); }
  }
});
</script>

<style scoped>
.question-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 2rem;
}

.options-container {
  flex: 1;
  overflow-y: auto;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.full-width {
  width: 100%;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 25%;
  width: 50%;
  padding: 16px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

@media (max-width: 768px) {
  .question-card {
    padding: 1rem;
  }
}
</style>
