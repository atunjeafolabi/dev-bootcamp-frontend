<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <loader v-if="isLoading" />
        <div class="card bg-white py-2 px-4" v-if="!isLoading">
          <div class="card-body">
            <router-link
              :to="{ name: 'view-bootcamp', params: { id: bootcamp._id } }"
              class="btn btn-link text-secondary my-3"
            >
              <i class="fas fa-chevron-left"></i> Bootcamp Info
            </router-link>
            <h1 class="mb-2">{{ bootcamp.name }}</h1>
            <h3 class="text-primary mb-4">Write a Review</h3>
            <p>
              You must have attended and graduated this bootcamp to review
            </p>
            <form @submit.prevent="submitForm()">
              <div class="form-group">
                <label for="rating">
                  Rating:
                  {{ reviewFormData.rating }}
                </label>
                <input
                  type="range"
                  class="custom-range"
                  v-model="reviewFormData.rating"
                  min="0"
                  max="10"
                  step="1"
                  id="rating"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  v-model.trim="$v.reviewFormData.title.$model"
                  class="form-control"
                  :class="{ 'is-invalid': $v.reviewFormData.title.$error }"
                  placeholder="Review title"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  name="review"
                  rows="10"
                  v-model.trim="$v.reviewFormData.body.$model"
                  class="form-control"
                  :class="{ 'is-invalid': $v.reviewFormData.body.$error }"
                  placeholder="Your review"
                ></textarea>
              </div>
              <div class="form-group">
                <button
                  :disabled="shouldDisableButton"
                  type="submit"
                  class="btn btn-dark btn-block"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import Loader from "../../components/Loader.vue";
import LOADING from "../../utils/constants";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    Loader
  },
  name: "add-review",
  data() {
    return {
      reviewFormData: {
        rating: 0,
        title: "",
        body: ""
      }
    };
  },
  created() {
    let isBootcampLoaded = this.bootcamp !== undefined;
    if (!isBootcampLoaded) {
      this.$store.dispatch("bootcamp/loadBootcamp", {
        id: this.$route.params.bootcampId
      });
    }
  },
  mixins: [validationMixin],
  validations: {
    reviewFormData: {
      title: {
        required,
        maxLength: maxLength(50)
      },
      body: {
        required,
        maxLength: maxLength(400)
      }
    }
  },
  computed: {
    ...mapState({
      bootcamp: state => state.bootcamp.bootcamp.data,
      bootcampLoadStatus: state => state.bootcamp.bootcampLoadStatus
    }),
    isLoading() {
      return this.bootcampLoadStatus == LOADING.IN_PROGRESS;
    },
    validationPasses() {
      return !this.$v.$invalid;
    },
    shouldDisableButton() {
      return this.isLoading || !this.validationPasses;
    }
  },
  methods: {
    submitForm() {
      this.triggerValidation();
      if (!this.validationPasses) {
        return;
      }

      this.$store.dispatch("review/createReview", {
        review: this.reviewFormData,
        bootcampId: this.bootcamp._id
      });
    },
    triggerValidation() {
      this.$v.$touch();
    }
  }
};
</script>
