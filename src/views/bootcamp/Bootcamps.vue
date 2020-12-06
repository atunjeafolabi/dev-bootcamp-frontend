<template>
  <div>
    <!-- Latest bootcamps -->
    <section class="browse my-5">
      <div class="container">
        <div class="row">
          <!-- Sidebar -->
          <div class="col-md-4">
            <div class="card card-body mb-4">
              <h4 class="mb-3">By Location</h4>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="miles"
                        placeholder="Miles From"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="zipcode"
                        placeholder="Enter Zipcode"
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Find Bootcamps"
                  class="btn btn-primary btn-block"
                />
              </form>
            </div>

            <h4>Filter</h4>
            <form>
              <!-- <div class="form-group">
								<label> Career</label>
								<select class="custom-select mb-2">
									<option value="any" selected>Any</option>
									<option value="Web Development">Web Development</option>
									<option value="Mobile Development">Mobile Development</option>
									<option value="UI/UX">UI/UX</option>
									<option value="Data Science">Data Science</option>
									<option value="Business">Business</option>
									<option value="Other">Other</option>
								</select>
							</div> -->

              <div class="form-group">
                <label> Rating</label>
                <select class="custom-select mb-2">
                  <option value="any" selected>Any</option>
                  <option value="9">9+</option>
                  <option value="8">8+</option>
                  <option value="7">7+</option>
                  <option value="6">6+</option>
                  <option value="5">5+</option>
                  <option value="4">4+</option>
                  <option value="3">3+</option>
                  <option value="2">2+</option>
                </select>
              </div>

              <div class="form-group">
                <label> Budget</label>
                <select class="custom-select mb-2">
                  <option value="any" selected>Any</option>
                  <option value="20000">$20,000</option>
                  <option value="15000">$15,000</option>
                  <option value="10000">$10,000</option>
                  <option value="8000">$8,000</option>
                  <option value="6000">$6,000</option>
                  <option value="4000">$4,000</option>
                  <option value="2000">$2,000</option>
                </select>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                class="btn btn-primary btn-block"
              />
            </form>
          </div>
          <!-- Main col -->
          <div class="col-md-8">
            <loader v-if="bootcampsLoadStatus == 1" />
            <!-- Bootcamps -->
            <span v-if="bootcampsLoadStatus == 2">
              <div
                class="card mb-3"
                v-for="bootcamp in bootcamps.data"
                :key="bootcamp._id"
              >
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      :src="'assets/img/' + bootcamp.photo"
                      class="card-img"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        <router-link
                          :to="{
                            name: 'view-bootcamp',
                            params: { id: bootcamp._id }
                          }"
                        >
                          {{ bootcamp.name }}
                          <span class="float-right badge badge-success">
                            {{ bootcamp.averageRating }}
                          </span>
                        </router-link>
                      </h5>
                      <span class="badge badge-dark mb-2">
                        {{ bootcamp.location.city }},
                        {{ bootcamp.location.state }}
                      </span>
                      <p class="card-text">
                        {{ bootcamp.careers.toString() }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <!-- pagination -->
            <pagination
              v-if="bootcampsLoadStatus == 2"
              :total-pages="bootcamps.pagination.page_count"
              :total="bootcamps.pagination.total_count"
              :per-page="bootcamps.pagination.per_page"
              :current-page="currentPage"
              @pagechanged="onPageChange"
            />
            <request-not-successful v-if="bootcampsLoadStatus == 3" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loader from "../../components/Loader";
import RequestNotSuccessful from "../../components/RequestNotSuccessful";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "bootcamps",
  components: {
    Loader,
    RequestNotSuccessful,
    Pagination
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      bootcamps: state => state.bootcamp.bootcamps,
      bootcampsLoadStatus: state => state.bootcamp.bootcampsLoadStatus,
      reviews: state => state.review.all
    })
  },
  methods: {
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
      this.$store.dispatch("bootcamp/loadBootcamps", {
        page: this.currentPage,
        limit: 4
      });
    }
  },
  created() {
    this.$store.dispatch("bootcamp/loadBootcamps", {
      page: this.$route.query.page,
      limit: 4
    });
    this.$store.dispatch("review/getAllReviews");
  }
};
</script>
