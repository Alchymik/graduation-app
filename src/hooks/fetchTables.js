import { supabase } from '@/supabase'

export default async function fetchTables(project_id) {
    try {
        const { data, error } = await supabase
            .from('tables')
            .select('*')
            .eq('project_id', project_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}