import { supabase } from '@/supabase'

export default async function fetchTasks(column_id) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('column_id', column_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}