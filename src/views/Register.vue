<template>
  <div class="register">
    <section class="form mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 m-auto">
            <div class="card bg-white p-4 mb-4">
              <div class="card-body">
                <h1><i class="fas fa-user-plus"></i> Register</h1>
                <p>
                  Register to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <div v-if="hasValidationErrors" class="alert alert-danger" role="alert">
                  {{validationErrors}}
                </div>
                <form v-if="showForm" @submit.prevent ="register()">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      v-model="user.name"
                      class="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      v-model="user.email"
                      class="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      v-model="user.password"
                      class="form-control"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password2">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      class="form-control"
                      placeholder="Confirm password"
                      required
                    />
                  </div>

                  <div class="card card-body mb-3">
                    <h5>User Role</h5>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        @click="setRole('user')"
                        checked
                      />
                      <label class="form-check-label">
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        @click="setRole('publisher')"
                      />
                      <label class="form-check-label">
                        Bootcamp Publisher
                      </label>
                    </div>
                  </div>
                  <p class="text-danger">
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                  <div class="form-group">
                    <button
                      :disabled = isLoading
                      type="submit"
                      class="btn btn-primary btn-block"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;
                      Register
                    </button>
                  </div>
                </form>
                <div class="jumbotron jumbotron-fluid" v-if="isRegistrationSuccessful">
                  <div class="container">
                    <h1 class="display-4">Registration Success</h1>
                    <p class="lead">Your account has been created. Login</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import LOADING from "../utils/constants";

export default {
  name: 'register',
  data(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: 'user'
      }
    }
  },

  computed: {
    ...mapState({
      userCreationLoadStatus: state => state.user.userCreationLoadStatus,
      validationErrors: state => state.user.validationErrors.createUser
    }),
    isLoading(){
      return this.userCreationLoadStatus == LOADING.IN_PROGRESS;
    },
    isRegistrationSuccessful(){
      return this.userCreationLoadStatus == LOADING.SUCCESS;
    },
    isFormSubmitted(){
      return this.userCreationLoadStatus !== LOADING.NOT_STARTED;
    },
    showForm(){
      return !this.isFormSubmitted || !this.isRegistrationSuccessful;
    },
    hasValidationErrors(){
      return this.validationErrors !== '';
    }
  },

  methods: {
    ...mapMutations('user', [
      'setUserCreationLoadStatus',
    ]),
    setRole(role){
      this.user.role = role;
    },
    register(){
      this.$store.dispatch('user/createUser', this.user);
    },
  },
  destroyed () {
    // Reset userCreationLoadStatus state to 0
    this.setUserCreationLoadStatus(LOADING.NOT_STARTED);
  },
}
</script>