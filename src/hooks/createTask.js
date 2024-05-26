import { supabase } from '@/supabase'

export default async function createTask(column_id, name, details, tag, deadline_date) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert({
                column_id: column_id,
                name: name,
                details: details,
                tag: tag,
                deadline_date: deadline_date,
            })
            .select();
        if (error) throw error;
        return data
    } catch (error) {
        alert(error.error_description || error.message);
    }
}