import { supabase } from '@/supabase'

export default async function fetchProjectOwnerID(project_id) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('user_id')
            .eq('id', project_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}