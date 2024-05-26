import { supabase } from '@/supabase'
import fetchUserIDByEmail from '@/hooks/fetchUserIDByEmail.js'

export default async function addUserToTeam(project_id, user_email) {
    try {
        let user_id = await fetchUserIDByEmail(user_email);
        const { data, error } = await supabase
            .from('teams')
            .insert({
                project_id: project_id,
                user_id: user_id[0].id
            })
            .select();
        if (error) throw error;
        return data
    } catch (error) {
        alert(error.error_description || error.message);
    }
}