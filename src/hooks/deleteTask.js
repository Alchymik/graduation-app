import { supabase } from '@/supabase'

export default async function deleteTask(task_id) {
    try {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', task_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}