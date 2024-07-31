import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";

import {

  team,

} from "../../common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });



  mock.onGet(url.GET_TEAMDATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team) {
          // Passing fake JSON data as response
          resolve([200, team]);
        } else {
          reject([400, "Cannot get team data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TEAMDATA).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.team]);
        } else {
          reject([400, "Cannot delete team data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TEAMDATA).reply((team) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot add team data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TEAMDATA).reply((team) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot update team data"]);
        }
      });
    });
  });

  
};

export default fakeBackend;