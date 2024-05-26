<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import ProjectTableColumn from '@/components/ProjectIDView/ProjectTableColumn.vue'
import fetchColumns from '@/hooks/fetchColumns.js'
import { useStore } from 'vuex'

const store = useStore();
const props = defineProps({
  tableID: Number,
  tableType: String
});
const columns = ref([]);
const isTableDataLoaded = ref(false);

function handleColumnCreation() {
  store.commit('setDialogComponentsProps', { tableID: props.tableID });
  store.commit('setShowDialogWindowType', 'createColumn');
}

onMounted(async () => {
  columns.value = await fetchColumns(props.tableID);
  isTableDataLoaded.value = true;
});

supabase
  .channel('columns')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'columns' },
    payload => {
      fetchColumns(props.tableID).then((data) => columns.value = data);
    })
  .subscribe();
</script>

<template>
  <div class="scrum-backlog-column" v-if="props.tableType === 'scrum_backlog'">
    <ProjectTableColumn v-for="column in columns" :column="column" :key="column.id"/>
  </div>
  <div class="column-list" v-else>
    <ProjectTableColumn v-for="column in columns" :column="column" :key="column.id" />
    <my-nav-btn class="new_col_btn" @click="handleColumnCreation">+ Добавить колонку</my-nav-btn>
  </div>
</template>

<style scoped>
.scrum-backlog-column {
  margin: 20px;
}
.column-list {
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: (0, auto);
}

.new_col_btn {
  margin: 5px;
}
</style>