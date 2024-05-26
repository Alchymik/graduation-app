import { supabase } from '@/supabase'

export default async function fetchProjectSprints(project_id) {
    try {
        const { data, error } = await supabase
            .from('tables')
            .select('*')
            .eq('project_id', project_id)
            .eq('type', 'scrum_sprint');
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}