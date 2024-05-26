import { supabase } from '@/supabase'
import fetchColumnIdOfTask from '@/hooks/fetchColumnIdOfTask.js'
import fetchTableIdOfColumn from '@/hooks/fetchTableIdByColumn.js'

export default async function fetchProjectIdOfTask(task_id) {
    try {
        let column_id = await fetchColumnIdOfTask(task_id);
        let table_id = await fetchTableIdOfColumn(column_id);
        const { data, error } = await supabase
            .from('tables')
            .select('project_id')
            .eq('id', table_id);
        if (error) throw error;
        else return data[0].project_id;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}