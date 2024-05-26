import { supabase } from '@/supabase'

export default async function fetchTableIdOfColumn(column_id) {
    try {
        const { data, error } = await supabase
            .from('columns')
            .select('table_id')
            .eq('id', column_id);
        if (error) throw error;
        else return data[0].table_id;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}