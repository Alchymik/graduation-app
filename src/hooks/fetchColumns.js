import { supabase } from '@/supabase'

export default async function fetchColumns(table_id) {
    try {
        const { data, error } = await supabase
            .from('columns')
            .select('*')
            .eq('table_id', table_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}