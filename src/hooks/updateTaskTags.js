import { supabase } from '@/supabase'

export default async function updateTaskTags(task_id, new_tags) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                tag: new_tags,
            })
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}