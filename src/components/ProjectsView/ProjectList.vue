<script setup>
import ProjectListItem from "@/components/ProjectsView/ProjectListItem.vue"
const props = defineProps({
  projects: {type: Array, required: true}
})
</script>

<template>
  <div v-if="props.projects.length > 0">
    <transition-group name="project-list">
      <project-list-item v-for="project in props.projects" :project="project" :key="project.id"/>
    </transition-group>
  </div>
  <div v-else>
    <h3>Список проектов пуст</h3>
  </div>
</template>

<style></style>