<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <loader v-if="bootcampLoadStatus == 1" />
          <span v-if="bootcampLoadStatus == 2">
            <h1>{{ bootcamp.name }}</h1>
            <!-- Description -->
            <p>
              {{ bootcamp.description }}
            </p>
            <!-- Avg cost -->
            <p class="lead mb-4">
              Average Course Cost: <span class="text-primary">${{bootcamp.averageCost}}</span>
            </p>
          </span>
          <request-not-successful v-if="bootcampLoadStatus == 3" />
          <!-- Courses -->
          <loader v-if="coursesLoadStatus == 1" />
          <span v-if="coursesLoadStatus == 2">
            <div class="card mb-3" v-for="course in courses" :key="course.id">
              <h5 class="card-header bg-primary text-white">
                {{ course.title }}
              </h5>
              <div class="card-body">
                <h5 class="card-title">Duration: {{ course.weeks }} Weeks</h5>
                <p class="card-text">
                  {{ course.description }}
                </p>
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    Cost: ${{ course.tuition }} USD
                  </li>
                  <li class="list-group-item">
                    Skill Required: {{ course.minimumSkill }}
                  </li>
                  <li class="list-group-item">
                    Scholarship Available:
                    <i
                      class="fas fa-check text-success"
                      v-if="course.scholarshipsAvailable"
                    ></i>
                    <i class="fas fa-times text-danger" v-else></i>
                  </li>
                </ul>
              </div>
            </div>
          </span>
          <request-not-successful v-if="coursesLoadStatus == 3" />
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <loader v-if="bootcampLoadStatus == 1" />
          <span v-if="bootcampLoadStatus == 2">
            <!-- Image -->
            <img
              :src="'assets/img/' + bootcamp.photo"
              class="img-thumbnail"
              alt=""
            />
            <!-- Rating -->
            <h1 class="text-center my-4">
              <span
                class="badge badge-secondary badge-success rounded-circle p-3"
                >{{ bootcamp.averageRating }}</span
              >
              Rating
            </h1>
            <!-- Buttons -->
            <router-link
              :to="{ name: 'reviews' }"
              class="btn btn-dark btn-block my-3"
            >
              <i class="fas fa-comments"></i> Read Reviews
            </router-link>
            <router-link
              class="btn btn-light btn-block my-3"
              :to="{ name: 'add-review' }"
            >
              <i class="fas fa-pencil-alt"></i> Write a Review
            </router-link>
            <a
              :href="bootcamp.website"
              target="_blank"
              class="btn btn-secondary btn-block my-3"
              ><i class="fas fa-globe"></i> Visit Website</a
            >
            <!-- Map -->
            <div id="map" style="width: 100%; height: 300px"></div>
            <!-- Perks -->
            <ul class="list-group list-group-flush mt-4">
              <li class="list-group-item">
                <i
                  class="fas fa-check text-success"
                  v-if="bootcamp.housing"
                ></i>
                <i class="fas fa-times text-danger" v-else></i>
                Housing
              </li>
              <li class="list-group-item">
                <i
                  class="fas fa-check text-success"
                  v-if="bootcamp.jobAssistance"
                ></i>
                <i class="fas fa-times text-danger" v-else></i>
                Job Assistance
              </li>
              <li class="list-group-item">
                <i
                  class="fas fa-check text-success"
                  v-if="bootcamp.jobGuarantee"
                ></i>
                <i class="fas fa-times text-danger" v-else></i>
                Job Guarantee
              </li>
              <li class="list-group-item">
                <i
                  class="fas fa-check text-success"
                  v-if="bootcamp.acceptGi"
                ></i>
                <i class="fas fa-times text-danger" v-else></i>
                Accepts GI Bill
              </li>
            </ul>
          </span>
          <request-not-successful v-if="bootcampLoadStatus == 3" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import Loader from "../../components/Loader";
import RequestNotSuccessful from "../../components/RequestNotSuccessful";

export default {
  name: "bootcamp",
  components: {
    Loader,
    RequestNotSuccessful
  },
  computed: mapState({
    bootcamp: state => state.bootcamp.bootcamp.data,
    bootcampLoadStatus: state => state.bootcamp.bootcampLoadStatus,
    courses: state => state.course.courses.data,
    coursesLoadStatus: state => state.course.coursesLoadStatus
  }),
  methods: {},
  created() {
    this.$store.dispatch("bootcamp/loadBootcamp", {
      id: this.$route.params.id
    });
    this.$store.dispatch("course/loadCourses", this.$route.params.id);
  }
};
</script>
