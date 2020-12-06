import ReviewAPI from "../../api/review";
import LOADING from "../../utils/constants";

export default {
  namespaced: true,
  state: {
    reviews: [],
    reviewsLoadStatus: LOADING.NOT_STARTED,

    review: {},
    reviewLoadStatus: LOADING.NOT_STARTED,

    reviewCreated: "",
    reviewCreationLoadStatus: LOADING.NOT_STARTED,

    validationErrors: {
      createReview: "",
      editReview: ""
    }
  },

  actions: {
    loadReviews({ commit }, bootcampId) {
      commit("setReviewsLoadStatus", LOADING.IN_PROGRESS);
      ReviewAPI.getReviews(bootcampId)
        .then(response => {
          commit("setReviews", response.data);
          commit("setReviewsLoadStatus", LOADING.SUCCESS);
        })
        .catch(() => {
          commit("setReviews", []);
          commit("setReviewsLoadStatus", LOADING.FAILURE);
        });
    },

    createReview({ commit }, { review, bootcampId }) {
      commit("setReviewCreationLoadStatus", LOADING.IN_PROGRESS);

      ReviewAPI.createReview(review, bootcampId)
        .then(response => {
          commit("setReviewCreated", response.data.success);
          commit("setReviewCreationLoadStatus", LOADING.SUCCESS);
          commit("setCreateReviewValidationErrors", "");
        })
        .catch(error => {
          console.log(error.response.data);
          commit("setReviewCreated", false);
          commit("setCreateReviewValidationErrors", error.response.data.error);
          commit("setReviewCreationLoadStatus", LOADING.FAILURE);
        });
    }
  },

  mutations: {
    setReviews(state, reviews) {
      state.reviews = reviews;
    },

    setReviewsLoadStatus(state, status) {
      state.reviewsLoadStatus = status;
    },

    setReview(state, review) {
      state.review = review;
    },

    setReviewLoadStatus(state, status) {
      state.reviewLoadStatus = status;
    },

    setReviewCreated(state, reviewCreated) {
      state.userCreated = reviewCreated;
    },

    setReviewCreationLoadStatus(state, status) {
      state.userCreationLoadStatus = status;
    },
    setCreateReviewValidationErrors(state, errors) {
      state.validationErrors.createReview = errors;
    }
  },

  getters: {
    getReviewsLoadStatus(state) {
      return state.reviewsLoadStatus;
    },
    getReviews(state) {
      return state.reviews;
    },
    getCreateReviewValidationErrors(state) {
      return state.validationErrors.createReview;
    }
  }
};
