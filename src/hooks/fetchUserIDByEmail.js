import { supabase } from '@/supabase'

export default async function fetchUserIDByEmail(email) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email);
        if (error) throw error;
        return data
    } catch (error) {
        alert(error.error_description || error.message);
    }
}