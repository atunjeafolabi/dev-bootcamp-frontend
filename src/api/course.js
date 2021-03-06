import axios from "axios";

import { DEVCAMPER_CONFIG } from "../config";

export default {
  getCourses(bootcampId) {
    return axios.get(
      DEVCAMPER_CONFIG.API_URL + `bootcamps/${bootcampId}/courses`
    );
  },

  getCourse(id) {
    return axios.get(DEVCAMPER_CONFIG.API_URL + "courses/" + id);
  }

  // /*
  //  GET 	/api/v1/cafes/{slug}/edit
  //  */
  // getCafeEdit: function( slug ){
  //     return axios.get( ROAST_CONFIG.API_URL + '/cafes/' + slug + '/edit' );
  // },

  // /*
  //  PUT 	/api/v1/cafes/{slug}
  //  */
  // putEditCafe: function( slug, companyName, companyID, companyType, website, locationName, address, city, state, zip, lat, lng, brewMethods, matcha, tea ){

  //     let formData = new FormData();

  //     formData.append('_method', 'PUT');
  //     formData.append('company_name', companyName);
  //     formData.append('company_id', companyID);
  //     formData.append('company_type', companyType);
  //     formData.append('website', website);
  //     formData.append('location_name', locationName);
  //     formData.append('address', address);
  //     formData.append('city', city);
  //     formData.append('state', state);
  //     formData.append('zip', zip);
  //     formData.append('lat', lat);
  //     formData.append('lng', lng);
  //     formData.append('brew_methods', JSON.stringify( brewMethods ) );
  //     formData.append('matcha', matcha);
  //     formData.append('tea', tea);

  //     return axios.post( ROAST_CONFIG.API_URL + '/cafes/'+slug,
  //         formData
  //     );
  // },

  // /*
  //  POST  /api/v1/cafes
  //  */
  // postAddNewCafe: function( companyName, companyID, companyType, website, locationName, address, city, state, zip, lat, lng, brewMethods, matcha, tea ){

  //     let formData = new FormData();

  //     formData.append('company_name', companyName);
  //     formData.append('company_id', companyID);
  //     formData.append('company_type', companyType);
  //     formData.append('website', website);
  //     formData.append('location_name', locationName);
  //     formData.append('address', address);
  //     formData.append('city', city);
  //     formData.append('state', state);
  //     formData.append('zip', zip);
  //     formData.append('lat', lat);
  //     formData.append('lng', lng);
  //     formData.append('brew_methods', JSON.stringify( brewMethods ) );
  //     formData.append('matcha', matcha);
  //     formData.append('tea', tea);

  //     return axios.post( ROAST_CONFIG.API_URL + '/cafes',
  //         formData,
  //         {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data'
  //             }
  //         }
  //     );
  // },
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
