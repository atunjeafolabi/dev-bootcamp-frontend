import UserAPI from "../../api/user";
import LOADING from "../../utils/constants";

export default {
  namespaced: true,
  state: {
    user: [],
    // user creation
    userCreationLoadStatus: LOADING.NOT_STARTED,
    userCreated: false,

    // login
    loginRequestStatus: LOADING.NOT_STARTED,
    isLoggedIn: false,
    token: '',

    // validation
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

    // loadUser({ commit }, data) {
    //   commit("setUserLoadStatus", 1);

    //   UserAPI.getUser(data.id)
    //     .then(response => {
    //       commit("setUser", response.data);
    //       commit("setUserLoadStatus", 2);
    //     })
    //     .catch(function() {
    //       commit("setUser", {});
    //       commit("setUserLoadStatus", 3);
    //     });
    // }


    login({commit}, user){
        commit('setLoginRequestStatus', LOADING.IN_PROGRESS);
        return UserAPI.login(user)
            .then((response) => {
                commit('setLoginRequestStatus', LOADING.SUCCESS);
                commit('setIsLoggedIn', response.data.success);
                commit('setToken', response.data.token);
                commit('setLoginValidationErrors', '')
            }).catch((error) => {
                if(error.response.data.error != undefined){
                    // Request successful but with validation errors
                    // i.e 400/401 status
                    commit('setLoginRequestStatus', LOADING.SUCCESS);
                    commit('setLoginValidationErrors', error.response.data.error)
                    commit('setIsLoggedIn', error.response.data.success);
                }else {
                    // Request not successful
                    commit('setLoginRequestStatus', LOADING.FAILURE);
                }
            })
    },

    logout({commit}){
        // make request to logout

        // Then clear local storage
        commit('setIsLoggedIn', false);
        commit('setToken', '');
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
    setLoginRequestStatus(state, loginRequestStatus){
        state.loginRequestStatus = loginRequestStatus;
    },
    setIsLoggedIn(state, isLoggedIn){
        state.isLoggedIn = isLoggedIn;
    },
    setToken(state, token){
        state.token = token;
    },
    setLoginValidationErrors(state, errors){
        state.validationErrors.login = errors;
    }
  },

  getters: {
    getCreateUserValidationErrors(state) {
      return state.validationErrors.createUser;
    },
    getLoginRequestStatus(state){
        state.loginRequestStatus;
    },
    getIsLoggedIn(state){
        state.isLoggedIn;
    },
    getToken(state){
        state.token;
    },
    getLoginValidationErrors(state){
        state.validationErrors.login;
    }
  }
};
