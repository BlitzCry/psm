<template>
  <Card>
    <template #title>{{ question.question }}</template>
    <template #subtitle>Question {{ questionStore.pointer + 1 }} of {{ questionStore.questions.length }}</template>
    <template #content>
      <div v-for="(option, index) in question.options" :key="index">
        <div class="checkbox-group" v-if="question.type === 'multiple_choice'">
          <Checkbox :inputId="`${index}`" :name="`choice-${index}`" :value="option.text" v-model="selectedOptions"
            @change="updateSelections" />
          <label :for="index">{{ option.text }}</label>
        </div>

        <div class="checkbox-group" v-else>
          <RadioButton :inputId="`${index}`" :name="`choice-${index}`" :value="option.text" v-model="selectedOption"
            @change="updateSelections" />
          <label :for="index">{{ option.text }}</label>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="button-group">
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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Question',
  components: {
    Checkbox,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Card,
    RadioButton,
  },

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedOptions: [] as string[],
      selectedOption: '' as string
    };
  },

  watch: {
    question: {
      immediate: true,
      handler() {
        this.initializeSelections();
      }
    }
  },

  computed: {
    ...mapStores(useQuestionStore),

    isBackButtonActive() {
      return this.questionStore.pointer !== 0;
    },

    isNextButtonActive() {
      return this.questionStore.pointer + 1 < this.questionStore.questions.length;
    }
  },

  methods: {
    initializeSelections() {
      if (this.question.type === 'multiple_choice') {
        this.selectedOptions = this.question.options
          .filter((option: Option) => option.is_selected)
          .map((option: Option) => option.text);
      } else {
        const selected = this.question.options.find((option: Option) => option.is_selected);
        this.selectedOption = selected ? selected.text : '';
      }
    },

    updateSelections() {
      this.question.options.forEach((option: Option) => {
        option.is_selected = this.question.type === 'multiple_choice'
          ? this.selectedOptions.includes(option.text)
          : option.text === this.selectedOption;
      });
    },

    next() {
      this.questionStore.next(this.selectedOptions.length ? this.selectedOptions : [this.selectedOption]);
      this.selectedOptions = [];
      this.selectedOption = '';
    },

    previous() {
      this.questionStore.previous();
    },

    submit() {
      this.questionStore.submit();
    }
  }
});
</script>

<style scoped>
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
}

.checkbox-group:last-child {
  border-bottom: none;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.full-width {
  width: 100%;
}
</style>
