<script setup>
import { supabase } from '@/supabase'
import { useStore } from 'vuex'
import archiveItem from '@/hooks/archiveProject.js'

const store = useStore();
const props = defineProps({
    project: { type: Object, required: true },
});


</script>

<template>
    <div class="project">
        <div class="project-body">
            <div><strong>{{ props.project.title }}</strong><br /></div>
            <div>{{ props.project.methoda }}</div>
        </div>
        <div class="project-btns">
            <my-button @click="$router.push(`/projects/${props.project.id}`)">Открыть</my-button>
            <my-button v-if="props.project.state !== 'Archived' && store.state.session.user.id === props.project.user_id" @click="archiveItem(props.project.id)">В архив</my-button>
        </div>
    </div>
</template>

<style scoped>
 .project {
    padding: 15px;
    background-color: white;
    border: 2px solid #2a52be;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: space-between;
}

.project-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.project-btns {
    display: flex;
    justify-content: space-between;
}

.project-btns>* {
    margin-left: 5px;
} 
</style>