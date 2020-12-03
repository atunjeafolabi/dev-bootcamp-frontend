import review from "../../api/review";

// initial state
const state = () => ({
  all: []
});

const getters = {
  getReviews(state){
    return state.all;
  }
};

const actions = {
  getAllReviews({ commit }) {
    review.getReviews(reviews => {
      commit("setReviews", reviews);
    });
  }
};

const mutations = {
  setReviews(state, reviews) {
    state.all = reviews;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
