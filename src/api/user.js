import axios from "axios";

import { DEVCAMPER_CONFIG } from "../config";

export default {
  createUser(user) {
    return axios.post(DEVCAMPER_CONFIG.API_URL + "auth/register", user);
  },

  login(user) {
    return axios.post(DEVCAMPER_CONFIG.API_URL + "auth/login", user);
  },

  getUser(id) {
    return axios.get(DEVCAMPER_CONFIG.API_URL + "users/" + id);
  },
};
