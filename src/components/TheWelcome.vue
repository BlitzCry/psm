<script setup lang="ts">
import Checkbox from 'primevue/checkbox';

import Card from 'primevue/card';
</script>

<template>
  <Card>
    <template #title>You have just been hired by a company new to Scrum. Your management has assigned you to be the
      Scrum Master of six new Scrum Teams. These teams will build one product. Select two conditions you should strive
      for in this scenario.</template>
    <template #subtitle>* Choose all that apply</template>
    <template #content>
      <div>
        <div class="checkbox-group">
          <input type="checkbox" id="ingredient1" name="pizza" value="Cheese" />
          <label for="ingredient1"> There should be six Product Owners, one for each Scrum Team. </label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="ingredient2" name="pizza" value="Mushroom" />
          <label for="ingredient2"> There should be six Product Owners, reporting to a chief Product Owner. </label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="ingredient3" name="pizza" value="Pepper" />
          <label for="ingredient3"> The product has one Product Backlog. </label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="ingredient4" name="pizza" value="Onion" />
          <label for="ingredient4"> Each Scrum Team should have a separate Product Backlog. </label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="ingredient5" name="pizza" value="Onion" />
          <label for="ingredient5"> There should be only one Product Owner. </label>
        </div>
      </div>

    </template>
  </Card>
</template>

<style>
.checkbox-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input[type="checkbox"] {
  accent-color: #4f46e5;
  /* Optional: Adjust color */
  width: 1.25rem;
  height: 1.25rem;
}

label {
  font-size: 1rem;
  cursor: pointer;
}
</style>
