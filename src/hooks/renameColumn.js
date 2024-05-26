import { supabase } from '@/supabase'

export default async function renameColumn(column_id, new_name) {
    try {
        const { error } = await supabase
            .from('columns')
            .update({
                name: new_name,
            })
            .eq('id', column_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}