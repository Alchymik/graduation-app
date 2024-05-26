import { supabase } from '@/supabase'

export default async function updateTaskDetails(task_id, new_details) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                details: new_details,
            })
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}