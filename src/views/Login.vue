<template>
  <div class="login">
    <!-- Login -->
    <section class="form mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 m-auto">
            <div class="card bg-white p-4 mb-4">
              <div class="card-body">
                <h1><i class="fas fa-sign-in-alt"></i> Login</h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <div
                  v-if="hasServerValidationErrors"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ serverValidationErrors }}
                </div>
                <form @submit.prevent="login()" novalidate="novalidate">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      v-model.trim="$v.user.email.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.email.$error }"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      v-model.trim="$v.user.password.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.password.$error }"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button
                      :disabled="shouldDisableButton"
                      type="submit"
                      class="btn btn-primary btn-block"
                    >
                      <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span
                      >&nbsp; Login
                    </button>
                  </div>
                </form>

                <router-link :to="{ name: 'reset-password' }">
                  Reset Password
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import LOADING from "../utils/constants";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  name: "login",

  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      loginRequestStatus: state => state.user.loginRequestStatus,
      serverValidationErrors: state => state.user.validationErrors.login
    }),
    isLoading() {
      return this.loginRequestStatus == LOADING.IN_PROGRESS;
    },
    validationPasses() {
      return !this.$v.$invalid;
    },
    shouldDisableButton() {
      return this.isLoading || !this.validationPasses;
    },
    hasServerValidationErrors() {
      return this.serverValidationErrors !== "";
    }
  },

  mixins: [validationMixin],

  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },

  methods: {
    async login() {
      this.triggerValidation();
      if (!this.validationPasses) {
        return;
      }

      await this.$store.dispatch("user/login", this.user);

      if (this.isLoggedIn) {
        this.$router.push({ name: "bootcamps" });
      }
    },
    triggerValidation() {
      this.$v.$touch();
    }
  }
};
</script>
