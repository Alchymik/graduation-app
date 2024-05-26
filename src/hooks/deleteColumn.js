import { supabase } from '@/supabase'

export default async function deleteColumn(column_id) {
    try {
        const { error } = await supabase
            .from('columns')
            .delete()
            .eq('id', column_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}