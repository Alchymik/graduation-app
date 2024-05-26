import { supabase } from '@/supabase'

export default async function fetchProjectsList(user_id) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}