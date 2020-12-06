import UserAPI from "../../api/user";
import LOADING from "../../utils/constants";

export default {
  namespaced: true,
  state: {
    user: [],
    userCreationLoadStatus: LOADING.NOT_STARTED,
    userCreated: false,
    validationErrors: {
        createUser: "",
        editUser: "",
        login: ""
    }
  },

  actions: {
    // Create a new user
    createUser({ commit }, user) {
      commit("setUserCreationLoadStatus", LOADING.IN_PROGRESS);

      UserAPI.createUser(user)
        .then(response => {
          commit("setUserCreated", response.data.success);
          commit("setUserCreationLoadStatus", LOADING.SUCCESS);
          commit("setCreateUserValidationErrors", "");
        })
        .catch((error) => {
          console.log(error.response.data)
          commit("setUserCreated", false);
          commit('setCreateUserValidationErrors', error.response.data.error)
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
  },

  mutations: {

    setUserCreated(state, userCreated) {
      state.userCreated = userCreated;
    },

    setUserCreationLoadStatus(state, status) {
      state.userCreationLoadStatus = status;
    },
    setCreateUserValidationErrors(state, errors){
        state.validationErrors.createUser = errors;
    }
  },

  getters: {
    getCreateUserValidationErrors(state) {
      return state.validationErrors.createUser;
    }
  }
};
