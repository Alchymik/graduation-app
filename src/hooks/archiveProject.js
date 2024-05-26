import { supabase } from '@/supabase'

export default async function archiveProject(project_id) {
    try {
        const { error } = await supabase
            .from('projects')
            .update({
                state: 'Archived',
            })
            .eq('id', project_id);
        if (error) throw error;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}