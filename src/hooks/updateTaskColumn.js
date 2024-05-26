import { supabase } from '@/supabase'

export default async function updateTaskColumn(task_id, new_column_id) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                column_id: new_column_id,
            })
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}