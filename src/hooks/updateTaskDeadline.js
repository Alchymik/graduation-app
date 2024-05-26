import { supabase } from '@/supabase'

export default async function updateTaskDeadline(task_id, new_deadline) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                deadline_date: new_deadline,
            })
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}