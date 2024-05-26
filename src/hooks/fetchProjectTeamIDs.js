import { supabase } from '@/supabase'

export default async function fetchProjectTeamIDs(project_id) {
    try {
        const { data, error } = await supabase
            .from('teams')
            .select('user_id')
            .eq('project_id', project_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}