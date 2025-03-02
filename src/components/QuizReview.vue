<template>
  <div class="card">
    <QuizResults />
    <Tabs :value="selectedTab" class="tabs-container" @update="onTabChange">
      <TabList class="tab-list">
        <Tab style="width: 33%" v-for="tab in tabs" :key="tab.title" :value="tab.value" :disabled="tab.disabled">
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels class="tab-panels">
        <!-- All questions tab -->
        <TabPanel :key="'all_questions'" :value="0">
          <QuizReviewQuestion v-for="question in questionStore.questions" :question="question"
            :index="questionStore.questions.indexOf(question) + 1" :key="questionStore.questions.indexOf(question)" />
        </TabPanel>

        <!-- Correct questions tab -->
        <TabPanel :key="'correct'" :value="1">
          <QuizReviewQuestion v-for="question in correctQuestions" :question="question"
            :index="questionStore.questions.indexOf(question) + 1" :key="questionStore.questions.indexOf(question)" />
        </TabPanel>

        <!-- Incorrect questions tab -->
        <TabPanel :key="'incorrect'" :value="2">
          <QuizReviewQuestion v-for="question in wrongQuestions" :question="question"
            :index="questionStore.questions.indexOf(question) + 1" :key="questionStore.questions.indexOf(question)" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import QuizReviewQuestion from "./QuizReviewQuestion.vue";
import { mapStores } from 'pinia';
import { useQuestionStore } from "../stores/question";
import type Question from '../types/Question';
import QuizResults from './QuizResults.vue';

export default defineComponent({
  name: "QuizReview",
  components: {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    QuizReviewQuestion,
    QuizResults
  },

  data() {
    return {
      selectedTab: 0, // Keep track of the selected tab
      tabs: [] as unknown as [{ title: string, value: number, disabled: boolean }] // Tabs data will be populated in mounted()
    };
  },

  computed: {
    ...mapStores(useQuestionStore),

    correctQuestions() {
      return this.questionStore.questions.filter((question: Question) => {
        return question.is_correct;
      })
    },

    wrongQuestions() {
      return this.questionStore.questions.filter((question: Question) => {
        return !question.is_correct;
      })
    }
  },

  mounted() {
    this.tabs.push({
      title: "All Questions",
      value: 0,
      disabled: this.questionStore.questions.length === 0
    });

    this.tabs.push({
      title: this.questionStore.countCorrectAnswers + " Correct",
      value: 1,
      disabled: this.questionStore.correct === 0
    });

    this.tabs.push({
      title: this.questionStore.countIncorrectAnswers + " Incorrect",
      value: 2,
      disabled: (this.questionStore.questions.length - this.questionStore.correct) === 0
    });
  },

  methods: {
    onTabChange(newValue: number) {
      this.selectedTab = newValue;
    }
  }
});
</script>

<style scoped>
.tabs-container {
  min-width: 300px;
}

.tab-list {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  padding-bottom: 10px;
}

.tab-panels {
  max-height: 700px;
  overflow-y: auto;
}

.tab-list .p-tab {
  white-space: nowrap;
  /* Prevent the text from wrapping */
}

.card {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  overflow: hidden;
}

.full-width {
  width: 100%;
}
</style>
