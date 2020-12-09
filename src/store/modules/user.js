import UserAPI from "../../api/user";
import LOADING from "../../utils/constants";

export default {
  namespaced: true,
  state: {
    // user
    user: [],
    userLoadStatus: LOADING.NOT_STARTED,

    // user creation
    userCreationLoadStatus: LOADING.NOT_STARTED,
    userCreated: false,

    // login
    loginRequestStatus: LOADING.NOT_STARTED,
    isLoggedIn: false,
    token: "",

    // Validation errors from server
    validationErrors: {
      createUser: "",
      editUser: "",
      login: ""
    }
  },

  actions: {
    createUser({ commit }, user) {
      commit("setUserCreationLoadStatus", LOADING.IN_PROGRESS);

      UserAPI.createUser(user)
        .then(response => {
          commit("setUserCreated", response.data.success);
          commit("setUserCreationLoadStatus", LOADING.SUCCESS);
          commit("setCreateUserValidationErrors", "");
        })
        .catch(error => {
          commit("setUserCreated", false);
          commit("setCreateUserValidationErrors", error.response.data.error);
          commit("setUserCreationLoadStatus", LOADING.FAILURE);
        });
    },

    loadUser({ commit }, id) {
      commit("setUserLoadStatus", LOADING.IN_PROGRESS);

      UserAPI.getUser(id)
        .then(response => {
          commit("setUser", response.data);
          commit("setUserLoadStatus", LOADING.SUCCESS);
        })
        .catch(function() {
          commit("setUserLoadStatus", LOADING.FAILURE);
        });
    },

    login({ commit }, user) {
      commit("setLoginRequestStatus", LOADING.IN_PROGRESS);
      return UserAPI.login(user)
        .then(response => {
          commit("setLoginRequestStatus", LOADING.SUCCESS);
          commit("setIsLoggedIn", response.data.success);
          commit("setToken", response.data.token);
          commit("setLoginValidationErrors", "");
        })
        .catch(error => {
          if (error.response.data.error != undefined) {
            // Request successful but with validation errors
            // i.e 400/401 status
            commit("setLoginRequestStatus", LOADING.SUCCESS);
            commit("setLoginValidationErrors", error.response.data.error);
            commit("setIsLoggedIn", error.response.data.success);
          } else {
            // Request not successful
            commit("setLoginRequestStatus", LOADING.FAILURE);
          }
        });
    },

    logout({ commit }) {
      // make request to logout

      // Then clear local storage
      commit("setIsLoggedIn", false);
      commit("setToken", "");
    }
  },

  mutations: {
    setUserCreated(state, userCreated) {
      state.userCreated = userCreated;
    },

    setUserCreationLoadStatus(state, status) {
      state.userCreationLoadStatus = status;
    },
    setCreateUserValidationErrors(state, errors) {
      state.validationErrors.createUser = errors;
    },
    setLoginRequestStatus(state, loginRequestStatus) {
      state.loginRequestStatus = loginRequestStatus;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLoginValidationErrors(state, errors) {
      state.validationErrors.login = errors;
    },
    setUserLoadStatus(state, loadUserStatus){
        state.loadUserStatus = loadUserStatus
    },
    setUser(state, user){
      state.user = user;
    }
  },

  getters: {
    getCreateUserValidationErrors(state) {
      return state.validationErrors.createUser;
    },
    getLoginRequestStatus(state) {
      return state.loginRequestStatus;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    getLoginValidationErrors(state) {
      return state.validationErrors.login;
    },
    getLoadUserStatus(state){
      return state.loadUserStatus;
    },
    getUser(state){
      return state.user;
    }
  }
};
