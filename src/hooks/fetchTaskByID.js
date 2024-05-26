import { supabase } from '@/supabase'

export default async function fetchTaskByID(id) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}