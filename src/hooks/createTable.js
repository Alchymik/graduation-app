import { supabase } from '@/supabase'

export default async function createTable(project_id, type, start_date, end_date) {
    try {
        const { data, error } = await supabase
            .from('tables')
            .insert({
                project_id: project_id,
                type: type,
                start_date: start_date,
                end_date: end_date,
            })
            .select();
        if (error) throw error;
        return data
    } catch (error) {
        alert(error.error_description || error.message);
    }
}