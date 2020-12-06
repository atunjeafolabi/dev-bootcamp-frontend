import BootcampAPI from "../../api/bootcamp";
import LOADING from "../../utils/constants";

export default {
  namespaced: true,
  state: {
    bootcamps: [],
    bootcampsLoadStatus: LOADING.NOT_STARTED,

    bootcamp: {},
    bootcampLoadStatus: LOADING.NOT_STARTED

    // cafe: {},
    // cafeLoadStatus: 0,

    // cafeEdit: {},
    // cafeEditLoadStatus: 0,
    // cafeEditStatus: 0,
    // cafeEditText: '',

    // cafeLiked: false,

    // cafeAdded: {},
    // cafeAddStatus: 0,
    // cafeAddText: '',

    // cafeLikeActionStatus: 0,
    // cafeUnlikeActionStatus: 0,

    // cafeDeletedStatus: 0,
    // cafeDeleteText: '',

    // bootcampsView: 'map'
  },

  actions: {
    // Loads the bootcamps from the API
    loadBootcamps({ commit }, { page, limit }) {
      commit("setBootcampsLoadStatus", LOADING.IN_PROGRESS);

      BootcampAPI.getBootcamps(page, limit)
        .then(response => {
          commit("setBootcamps", response.data);
          commit("setBootcampsLoadStatus", LOADING.SUCCESS);
        })
        .catch(() => {
          commit("setBootcamps", []);
          commit("setBootcampsLoadStatus", LOADING.FAILURE);
        });
    },

    loadBootcamp({ commit }, data) {
      commit("setBootcampLoadStatus", LOADING.IN_PROGRESS);

      BootcampAPI.getBootcamp(data.id)
        .then(response => {
          commit("setBootcamp", response.data);
          commit("setBootcampLoadStatus", LOADING.SUCCESS);
        })
        .catch(function() {
          commit("setBootcamp", {});
          commit("setBootcampLoadStatus", LOADING.FAILURE);
        });
    }

    /*
         Loads a cafe to edit from the API
         */
    // loadCafeEdit( { commit }, data ){
    //     commit( 'setCafeEditLoadStatus', 1 );

    //     BootcampAPI.getCafeEdit( data.slug )
    //         .then( function( response ){
    //             commit( 'setCafeEdit', response.data );
    //             commit( 'setCafeEditLoadStatus', 2 );
    //         })
    //         .catch( function(){
    //             commit( 'setCafeEdit', {} );
    //             commit( 'setCafeEditLoadStatus', 3 );
    //         });
    // },

    /*
         Edits a cafe
         */
    // editCafe( { commit, state, dispatch }, data ){

    //     commit( 'setCafeEditStatus', 1 );

    //     BootcampAPI.putEditCafe( data.slug, data.company_name, data.company_id, data.company_type, data.website, data.location_name, data.address, data.city, data.state, data.zip, data.lat, data.lng, data.brew_methods, data.matcha, data.tea )
    //         .then( function( response ){
    //             console.log(response);

    //             /*
    //              If the cafe is pending because the user didn't have permission,
    //              set the text as pending to alert the user. Otherwise let them know
    //              that the edits have been approved.
    //              */
    //             if( typeof response.data.cafe_updates_pending !== 'undefined' ){
    //                 commit( 'setCafeEditText', response.data.cafe_updates_pending +' updates are pending!');
    //             }else{
    //                 commit( 'setCafeEditText', response.data.name+' has been successfully updated!');
    //             }

    //             commit( 'setCafeEditStatus', 2 );
    //             dispatch( 'loadbootcamps' );
    //         })
    //         .catch( function(error){
    //             commit( 'setCafeEditStatus', 3 );
    //             console.log(error.response);
    //         });
    // },

    // addCafe( { commit, state, dispatch }, data ){

    //     commit( 'setCafeAddedStatus', 1 );

    //     BootcampAPI.postAddNewCafe( data.company_name, data.company_id, data.company_type, data.website, data.location_name, data.address, data.city, data.state, data.zip, data.lat, data.lng, data.brew_methods, data.matcha, data.tea )
    //         .then( function( response ){
    //             console.log(response)

    //             if( typeof response.data.cafe_add_pending !== 'undefined' ){
    //                 commit( 'setCafeAddedText', response.data.cafe_add_pending +' is pending approval!');
    //             }else{
    //                 commit( 'setCafeAddedText', response.data.name +' has been added!');
    //             }

    //             commit( 'setCafeAddedStatus', 2 );
    //             commit( 'setCafeAdded', response.data );
    //             dispatch( 'loadbootcamps' );
    //         })
    //         .catch( function(error){
    //             console.log(error.response)
    //             commit( 'setCafeAddedStatus', 3 );
    //         });
    // },

    // clearLikeAndUnlikeStatus( { commit }, data ){
    //     commit( 'setCafeLikeActionStatus', 0 );
    //     commit( 'setCafeUnlikeActionStatus', 0 );
    // },

    // deleteBootcamp( { commit, state, dispatch }, data ){
    //     commit( 'setCafeDeleteStatus', 1 );

    //     BootcampAPI.deleteCafe( data.slug )
    //         .then( function( response ){

    //             if( typeof response.data.cafe_delete_pending !== 'undefined' ){
    //                 commit( 'setCafeDeletedText', response.data.cafe_delete_pending +' is pending deletion!');
    //             }else{
    //                 commit( 'setCafeDeletedText', 'Cafe has been successfully deleted!');
    //             }

    //             commit( 'setCafeDeleteStatus', 2 );

    //             dispatch( 'loadbootcamps' );
    //         })
    //         .catch( function(){
    //             commit( 'setCafeDeleteStatus', 3 );
    //         });
    // },
  },

  mutations: {
    // setBootcampsLoadStatus( state, status ){
    //     state.bootcampsLoadStatus = status;
    // },

    setBootcamps(state, bootcamps) {
      state.bootcamps = bootcamps;
    },

    setBootcampsLoadStatus(state, status) {
      state.bootcampsLoadStatus = status;
    },

    setBootcamp(state, bootcamp) {
      state.bootcamp = bootcamp;
    },

    setBootcampLoadStatus(state, status) {
      state.bootcampLoadStatus = status;
    }

    // setCafe( state, cafe ){
    //     state.cafe = cafe;
    // },

    // /*
    //  Sets the cafe to be edited
    //  */
    // setCafeEdit( state, cafe ){
    //     state.cafeEdit = cafe;
    // },

    // /*
    //  Sets the cafe edit status
    //  */
    // setCafeEditStatus( state, status ){
    //     state.cafeEditStatus = status;
    // },

    // setCafeEditText( state, text ){
    //     state.cafeEditText = text;
    // },

    // /*
    //  Sets the cafe edit load status
    //  */
    // setCafeEditLoadStatus( state, status ){
    //     state.cafeEditLoadStatus = status;
    // },

    // setCafeAdded( state, cafe ){
    //     state.cafeAdded = cafe;
    // },

    // setCafeAddedStatus( state, status ){
    //     state.cafeAddStatus = status;
    // },

    // setCafeAddedText( state, text ){
    //     state.cafeAddText = text;
    // },

    // setCafeLikedStatus( state, status ){
    //     state.cafeLiked = status;
    // },

    // setCafeLikeActionStatus( state, status ){
    //     state.cafeLikeActionStatus = status;
    // },

    // setCafeUnlikeActionStatus( state, status ){
    //     state.cafeUnlikeActionStatus = status;
    // },

    // /*
    //  Update a loaded cafe's like status.
    //  */
    // updateCafeLikedStatus( state, data ){
    //     for( var i = 0; i < state.bootcamps.length; i++ ){
    //         if( state.bootcamps[i].slug == data.slug ){
    //             state.bootcamps[i].user_like_count = data.count;
    //         }
    //     }
    // },

    // setCafeDeleteStatus( state, status ){
    //     state.cafeDeletedStatus = status;
    // },

    // setCafeDeletedText( state, text ){
    //     state.cafeDeleteText = text;
    // },

    // setbootcampsView( state, view ){
    //     state.bootcampsView = view
    // }
  },

  getters: {
    getBootcamps(state) {
      return state.bootcamps;
    },

    getBootcamp(state) {
      return state.bootcamp;
    }
  }
};
