// const host = "http://localhost:27017"
// const host = "mongodb+srv://admin:test1234@divert.rziyj6y.mongodb.net/?retryWrites=true&w=majority"
const host = "https://eu-west-1.aws.data.mongodb-api.com/app/divert-wllgf/endpoint"

export const registerRoute = `${host}/api/auth/register`; 
export const loginRoute = `${host}/api/auth/login`;
export const updateRoute = `${host}/api/auth/update`;

export const register_team_1_1 = `${host}/api/team/register_team_1_1`;

export const getTeams = `${host}/api/team/getTeams`;
export const getTeamApi = `${host}/get/team`;
export const usersInTeam = `${host}/api/teamUsers`
export const deleteTeamApi = `${host}/api/deleteTeam`

export const allUsersRoute = `${host}/api/users`;
export const findSingleUSer = `${host}/api/findSingleUSer`;
export const addNewUserToTeam = `${host}/api/addNewUserToTeam`;
export const updateMember = `${host}/api/updateMember`
export const updateTeamMemberEmail = `${host}/api/updateTeamMemberEmail`
export const removeUserApi = `${host}/api/removeUserApi`

export const newTask = `${host}/api/createNewTask`
export const getTasks = `${host}/api/getTasks`
export const deleteTask = `${host}/api/deleteTask`
export const updateTask = `${host}/api/UpdateTask`

export const newGroup = `${host}/api/newGroup`
export const getGroups = `${host}/api/getGroups`
export const deleteGroup = `${host}/api/deleteGroup`
export const updateGroup = `${host}/api/updateGroup`
