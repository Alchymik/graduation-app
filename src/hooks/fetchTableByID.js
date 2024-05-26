import { supabase } from '@/supabase'

export default async function fetchTablebyID(table_id) {
    try {
        const { data, error } = await supabase
            .from('tables')
            .select('*')
            .eq('id', table_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}