import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = data => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = data => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data)
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
export const postJwtLogin = data => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = data => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => api.create(url.SOCIAL_LOGIN, data);


// Tasks
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = task => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = task => api.update(url.UPDATE_TASK + '/' + task._id, task);

// delete Task
export const deleteTask = task => api.delete(url.DELETE_TASK + '/' + task);

// Pages > Team
export const getTeamData = (team) => api.get(url.GET_TEAMDATA, team);
export const deleteTeamData = (team) => api.delete(url.DELETE_TEAMDATA, { headers: { team } });
export const addTeamData = (team) => api.create(url.ADD_NEW_TEAMDATA, team);
export const updateTeamData = (team) => api.put(url.UPDATE_TEAMDATA, team);

// Kanban Board
export const getTasks = () => api.get(url.GET_TASKS);
export const addNewTasks = (card) => api.create(url.ADD_TASKS, card)
export const updateTasks = (card) => api.put(url.UPDATE_TASKS, card)
export const deleteTasks = (card) => api.delete(url.DELETE_TASKS, { headers: {card} })