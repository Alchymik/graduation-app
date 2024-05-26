import { supabase } from '@/supabase'
import createTable from '@/hooks/createTable.js'
import createColumns from '@/hooks/createColumns.js'

export default async function createProject(user_id, title, methoda) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert({
                user_id: user_id,
                title: title,
                state: 'Active',
                methoda: methoda,
            })
            .select();
        if (error) throw error;

        if (methoda === 'kanbun') {
            const createdKanbunTable = await createTable(data[0].id, 'kanbun', null, null);

            createColumns([
                { table_id: createdKanbunTable[0].id, name: 'Бэклог' },
                { table_id: createdKanbunTable[0].id, name: 'В работе' },
                { table_id: createdKanbunTable[0].id, name: 'Тестирование' },
                { table_id: createdKanbunTable[0].id, name: 'К исправлению' },
                { table_id: createdKanbunTable[0].id, name: 'Выполнено' },
            ]);
        } else {
            const createdScrumBacklog = await createTable(data[0].id, 'scrum_backlog', null, null);

            createColumns([
                { table_id: createdScrumBacklog[0].id, name: 'Бэклог проекта' },
            ]);
        }
    } catch (error) {
        alert(error.error_description || error.message);
    }
}
