import fetchTeamProjects from '@/hooks/fetchTeamProjects.js'
import fetchProject from '@/hooks/fetchProject.js'

export default async function fetchTeamProjectsList(user_id) {
        let teamProjectsByID = await fetchTeamProjects(user_id);
        let teamProjectsList = [];
        if (teamProjectsByID.length > 0) teamProjectsList = await Promise.all(teamProjectsByID.map((el) => fetchProject(el.project_id)));
        return teamProjectsList
}