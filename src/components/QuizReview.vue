<template>
  <div class="card">
    <Tabs :value="selectedTab" class="tabs-container" @update:value="onTabChange">
      <TabList class="tab-list">
        <Tab style="width: 33%" v-for="tab in tabs" :key="tab.title" :value="tab.value" :disabled="tab.disabled">
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels class="tab-panels">
        <TabPanel :key="'all_questions'" :value="0">
          <QuizReviewQuestion v-for="(question, index) of questionStore.questions" :question="question"
            :index="index + 1" :key="index" />
        </TabPanel>

        <TabPanel :key="'correct'" :value="1">
          <QuizReviewQuestion v-for="(question, index) of questionStore.questions.filter(q => q.is_correct)"
            :question="question" :index="index + 1" :key="index" />
        </TabPanel>

        <TabPanel :key="'incorrect'" :value="2">
          <QuizReviewQuestion v-for="(question, index) of questionStore.questions.filter(q => !q.is_correct)"
            :question="question" :index="index + 1" :key="index" />
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

export default defineComponent({
  name: "QuizReview",
  components: {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    QuizReviewQuestion
  },

  data() {
    return {
      selectedTab: 0, // Keep track of the selected tab
      tabs: [] // Tabs data will be populated in mounted()
    };
  },

  computed: {
    ...mapStores(useQuestionStore),
  },

  mounted() {
    this.tabs.push({
      title: "All Questions",
      value: 0,
      disabled: this.questionStore.questions.length === 0
    });

    this.tabs.push({
      title: this.questionStore.correct + " Correct",
      value: 1,
      disabled: this.questionStore.correct === 0
    });

    this.tabs.push({
      title: this.questionStore.questions.length - this.questionStore.correct + " Incorrect",
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
</style>
