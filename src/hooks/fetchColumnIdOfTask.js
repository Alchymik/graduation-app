import { supabase } from '@/supabase'

export default async function fetchColumnIdOfTask(task_id) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('column_id')
            .eq('id', task_id);
        if (error) throw error;
        else return data[0].column_id;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}