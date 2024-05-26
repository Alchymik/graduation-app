import { supabase } from '@/supabase'

export default async function fetchProject(project_id) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', project_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}