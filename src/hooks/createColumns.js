import { supabase } from '@/supabase'

export default async function createColumns(columns_array) {
    try {
        const { data, error } = await supabase
            .from('columns')
            .insert(columns_array)
            .select();
        if (error) throw error;
        return data
    } catch (error) {
        alert(error.error_description || error.message);
    }
}