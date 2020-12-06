import axios from "axios";

import { DEVCAMPER_CONFIG } from "../config";

export default {
  createUser(user) {
    return axios.post(DEVCAMPER_CONFIG.API_URL + "auth/register", user);
  }

  // /*
  //  POST  /api/v1/cafes/{cafeID}/like
  //  */
  // postLikeCafe: function( slug ){
  //     return axios.post( ROAST_CONFIG.API_URL + '/cafes/' + slug + '/like' );
  // },
  // /*
  //  DELETE /api/v1/cafes/{cafeID}/like
  //  */
  // deleteLikeCafe: function( slug ){
  //     return axios.delete( ROAST_CONFIG.API_URL + '/cafes/' + slug + '/like' );
  // },

  // deleteCafe: function( slug ){
  //     return axios.delete( ROAST_CONFIG.API_URL + '/cafes/' + slug );
  // }
};
