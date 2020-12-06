import axios from "axios";

import { DEVCAMPER_CONFIG } from "../config";

export default {
  getReviews(id) {
    return axios.get(DEVCAMPER_CONFIG.API_URL + `bootcamps/${id}/reviews`);
  },

  getReview(id) {
    return axios.get(DEVCAMPER_CONFIG.API_URL + "reviews/" + id);
  },

  createReview(review, bootcampId) {
    return axios.post(
      DEVCAMPER_CONFIG.API_URL + `bootcamps/${bootcampId}/reviews`,
      review
    );
  }
};
