import { supabase } from '@/supabase'

export default async function fetchUserInfo(user_id) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user_id);
        if (error) throw error;
        else return data;
    } catch (error) {
        alert(error.error_description || error.message);
    }
}