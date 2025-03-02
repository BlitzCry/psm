<template>
  <Card>
    <template #title>{{ question.question }}</template>
    <template #subtitle> Question {{ index }} of {{ questionStore.questions.length }}</template>
    <template #content>
      <div v-for="(option, index) in question.options" :key="index">
        <div class="checkbox-group" v-if="question.type === 'multiple_choice'">
          <Button style="height: 34px; width: 34px" disabled variant="outlined" :severity="severity(option)">
            <i :class="icon(option)" :style="{ visibility: icon(option) ? 'visible' : 'hidden' }"></i>
          </Button>

          <label :for="`${index}`">{{ option.text }}</label>
        </div>

        <div class="checkbox-group" v-else>
          <Button style="height: 34px; width: 34px; border-radius: 100%" disabled variant="outlined"
            :severity="severity(option)">
            <i :class="icon(option)" :style="{ visibility: icon(option) ? 'visible' : 'hidden' }"></i>
          </Button>
          <label :for="`${index}`">{{ option.text }}</label>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';

import { mapStores } from 'pinia';
import { useQuestionStore } from "../stores/question";
import type Option from '../types/Option';

// import type Question from "../types/Question.ts";

export default {
  name: "QuizReviewQuestion",
  components: {
    Checkbox,
    Card,
    Button,
    RadioButton
  },

  props: {
    question: {
      type: Object,
      required: true
    },
    index: {
      required: true
    }
  },

  computed: {
    ...mapStores(useQuestionStore),
  },

  methods: {
    severity(option: Option) {
      return option.is_correct == true ? "success" : "danger";
    },

    icon(option: Option) {
      return option.is_selected ? 'pi pi-check' : '';
    },
  }
}
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

.hidden-icon::before {
  visibility: hidden;
}
</style>
