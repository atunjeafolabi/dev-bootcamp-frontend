import CourseAPI from "../../api/course";

export default {
  namespaced: true,
  state: {
    courses: [],
    coursesLoadStatus: 0,

    course: {},
    courseLoadStatus: 0

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

    // coursesView: 'map'
  },

  actions: {
    // Loads all the courses for a bootcamp from the API
    loadCourses({ commit }, bootcampId) {
      commit("setCoursesLoadStatus", 1);
      CourseAPI.getCourses(bootcampId)
        .then(response => {
          commit("setCourses", response.data);
          commit("setCoursesLoadStatus", 2);
        })
        .catch(() => {
          commit("setCourses", []);
          commit("setCoursesLoadStatus", 3);
        });
    }

    // loadcourse({commit}, data ){

    //     commit( 'setcourseLoadStatus', 1 );

    //     CourseAPI.getcourse( data.id )
    //         .then((response) => {
    //             commit( 'setcourse', response.data.data );
    //             commit( 'setcourseLoadStatus', 2 );
    //         })
    //         .catch( function(){
    //             commit( 'setcourse', {} );
    //             commit( 'setcourseLoadStatus', 3 );
    //         });
    // },

    /*
         Loads a cafe to edit from the API
         */
    // loadCafeEdit( { commit }, data ){
    //     commit( 'setCafeEditLoadStatus', 1 );

    //     courseAPI.getCafeEdit( data.slug )
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

    //     courseAPI.putEditCafe( data.slug, data.company_name, data.company_id, data.company_type, data.website, data.location_name, data.address, data.city, data.state, data.zip, data.lat, data.lng, data.brew_methods, data.matcha, data.tea )
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
    //             dispatch( 'loadcourses' );
    //         })
    //         .catch( function(error){
    //             commit( 'setCafeEditStatus', 3 );
    //             console.log(error.response);
    //         });
    // },

    // addCafe( { commit, state, dispatch }, data ){

    //     commit( 'setCafeAddedStatus', 1 );

    //     courseAPI.postAddNewCafe( data.company_name, data.company_id, data.company_type, data.website, data.location_name, data.address, data.city, data.state, data.zip, data.lat, data.lng, data.brew_methods, data.matcha, data.tea )
    //         .then( function( response ){
    //             console.log(response)

    //             if( typeof response.data.cafe_add_pending !== 'undefined' ){
    //                 commit( 'setCafeAddedText', response.data.cafe_add_pending +' is pending approval!');
    //             }else{
    //                 commit( 'setCafeAddedText', response.data.name +' has been added!');
    //             }

    //             commit( 'setCafeAddedStatus', 2 );
    //             commit( 'setCafeAdded', response.data );
    //             dispatch( 'loadcourses' );
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

    // deletecourse( { commit, state, dispatch }, data ){
    //     commit( 'setCafeDeleteStatus', 1 );

    //     courseAPI.deleteCafe( data.slug )
    //         .then( function( response ){

    //             if( typeof response.data.cafe_delete_pending !== 'undefined' ){
    //                 commit( 'setCafeDeletedText', response.data.cafe_delete_pending +' is pending deletion!');
    //             }else{
    //                 commit( 'setCafeDeletedText', 'Cafe has been successfully deleted!');
    //             }

    //             commit( 'setCafeDeleteStatus', 2 );

    //             dispatch( 'loadcourses' );
    //         })
    //         .catch( function(){
    //             commit( 'setCafeDeleteStatus', 3 );
    //         });
    // },
  },

  mutations: {
    // setcoursesLoadStatus( state, status ){
    //     state.coursesLoadStatus = status;
    // },

    setCourses(state, courses) {
      state.courses = courses;
    },

    setCoursesLoadStatus(state, status) {
      state.coursesLoadStatus = status;
    },

    setCourse(state, course) {
      state.course = course;
    },

    setCourseLoadStatus(state, status) {
      state.courseLoadStatus = status;
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
    //     for( var i = 0; i < state.courses.length; i++ ){
    //         if( state.courses[i].slug == data.slug ){
    //             state.courses[i].user_like_count = data.count;
    //         }
    //     }
    // },

    // setCafeDeleteStatus( state, status ){
    //     state.cafeDeletedStatus = status;
    // },

    // setCafeDeletedText( state, text ){
    //     state.cafeDeleteText = text;
    // },

    // setcoursesView( state, view ){
    //     state.coursesView = view
    // }
  },

  getters: {
    // getcoursesLoadStatus( state ){
    //     return state.coursesLoadStatus;
    // },

    getCourses(state) {
      return state.courses;
    }

    // getCafeLoadStatus( state ){
    //     return state.cafeLoadStatus;
    // },

    // getCafe( state ){
    //     return state.cafe;
    // },

    // /*
    //  Gets the cafe we are editing
    //  */
    // getCafeEdit( state ){
    //     return state.cafeEdit;
    // },

    // /*
    //  Gets the cafe edit status
    //  */
    // getCafeEditStatus( state ){
    //     return state.cafeEditStatus;
    // },

    // getCafeEditText( state ){
    //     return state.cafeEditText;
    // },

    // /*
    //  Gets the cafe edit load status
    //  */
    // getCafeEditLoadStatus( state ){
    //     return state.cafeEditLoadStatus;
    // },

    // getAddedCafe( state ){
    //     return state.cafeAdded;
    // },

    // getCafeAddStatus(state){
    //     return state.cafeAddStatus;
    // },

    // getCafeAddText( state ){
    //     return state.cafeAddText;
    // },

    // getCafeLikedStatus( state ){
    //     return state.cafeLiked;
    // },

    // getCafeLikeActionStatus( state ){
    //     return state.cafeLikeActionStatus;
    // },

    // getCafeUnlikeActionStatus( state ){
    //     return state.cafeUnlikeActionStatus;
    // },

    // getCafeDeletedStatus( state ){
    //     return state.cafeDeletedStatus;
    // },

    // getCafeDeletedText( state ){
    //     return state.cafeDeleteText;
    // },

    // getcoursesView( state ){
    //     return state.coursesView;
    // }
  }
};
