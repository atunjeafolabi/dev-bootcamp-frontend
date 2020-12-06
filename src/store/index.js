import Vue from "vue";
import Vuex from "vuex";
import bootcamp from "./modules/bootcamp";
import review from "./modules/review";
import course from "./modules/course";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bootcamp,
    review,
    course,
    user
  }
});
