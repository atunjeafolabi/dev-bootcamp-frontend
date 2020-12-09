<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <router-link
            class="btn btn-secondary my-3"
            :to="{ name: 'view-bootcamp', params: { id: bootcampId } }"
          >
            <i class="fas fa-chevron-left"></i> Bootcamp Info
          </router-link>
          
          <loader v-if="isBootcampRequestLoading" />
          <h1 class="mb-4" v-if="!isBootcampRequestLoading">{{ bootcamp.name}} Reviews</h1>
          <!-- Reviews -->
          <loader v-if="isReviewsRequestLoading" />
          <template v-if="isReviewsRequestSuccess">
            <div class="card mb-3" v-for="review in reviews" :key="review.id">
              <h5 class="card-header bg-dark text-white">{{review.title}}</h5>
              <div class="card-body">
                <h5 class="card-title">
                  Rating: <span class="text-success">{{review.rating}}</span>
                </h5>
                <p class="card-text">
                  {{review.text}}
                </p>
                <p class="text-muted">Writtern By {{review.user.name}}</p>
              </div>
            </div>
          </template>
          <request-not-successful v-if="isReviewsRequestFail"/>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <!-- Rating -->
          <h1 class="text-center my-4">
            <span class="badge badge-secondary badge-success rounded-circle p-3">
              {{isBootcampRequestLoading ? '' : bootcamp.averageRating}}
            </span>
            Rating
          </h1>
          <!-- Buttons -->
          <router-link
            class="btn btn-primary btn-block my-3"
            :to="{ name: 'add-review' }"
          >
            <i class="fas fa-pencil-alt"></i> Review This Bootcamp
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '../../components/Loader.vue';
import LOADING from "../../utils/constants";
import { RequestNotSuccessful } from "../../components/RequestNotSuccessful";

export default {
  name: 'reviews',
  components: {
    Loader,
    RequestNotSuccessful
  },
  created () {
    this.$store.dispatch('review/loadReviews', this.bootcampId);
    this.$store.dispatch('bootcamp/loadBootcamp', {id: this.bootcampId});
  },
  computed: {
    ...mapState({
      reviews: state => state.review.reviews.data,
      reviewsLoadStatus: state => state.review.reviewsLoadStatus
    }),
    ...mapState({
      bootcamp: state => state.bootcamp.bootcamp.data,
      bootcampLoadStatus: state => state.bootcamp.bootcampLoadStatus
    }),
    bootcampId() {
      return this.$route.params.bootcampId; 
    },
    isBootcampRequestLoading(){
      return this.bootcampLoadStatus == LOADING.IN_PROGRESS;
    },
    isReviewsRequestLoading(){
      return this.reviewsLoadStatus == LOADING.IN_PROGRESS;
    },
    isReviewsRequestSuccess(){
      return this.reviewsLoadStatus == LOADING.SUCCESS;
    },
    isReviewsRequestFail(){
      return this.reviewsLoadStatus == LOADING.FAILURE;
    },
  },
  methods: {

  },
}
</script>