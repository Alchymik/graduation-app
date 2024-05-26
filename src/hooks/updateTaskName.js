import { supabase } from '@/supabase'

export default async function updateTaskName(task_id, new_name) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                name: new_name,
            })
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}