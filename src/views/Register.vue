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
                <div
                  v-if="hasServerValidationErrors"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ serverValidationErrors }}
                </div>
                <form
                  v-if="displayForm"
                  @submit.prevent="submitForm()"
                  novalidate="novalidate"
                >
                  <div
                    class="form-group"
                    :class="{ 'text-danger': $v.user.name.$error }"
                  >
                    <label for="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      v-model="$v.user.name.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.name.$error }"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div
                    class="form-group"
                    :class="{ 'text-danger': $v.user.email.$error }"
                  >
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      v-model="$v.user.email.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.email.$error }"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div
                    class="form-group"
                    :class="{ 'text-danger': $v.user.password.$error }"
                  >
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      v-model="$v.user.password.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.password.$error }"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div
                    class="mb-4"
                    :class="{ 'text-danger': $v.user.confirmPassword.$error }"
                  >
                    <label for="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      v-model.trim="$v.user.confirmPassword.$model"
                      class="form-control"
                      :class="{ 'is-invalid': $v.user.confirmPassword.$error }"
                      placeholder="Confirm password"
                      required
                    />
                    <div class="invalid-feedback">
                      Passwords must be thesame.
                    </div>
                  </div>
                  <div class="card card-body mb-3">
                    <h5>User Role</h5>
                    <div
                      class="form-check"
                      :class="{ 'text-danger': $v.user.role.$error }"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="role"
                        v-model="user.role"
                        value="user"
                        @change="$v.user.role.$touch"
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
                        v-model="user.role"
                        value="publisher"
                        @change="$v.user.role.$touch"
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
                      :disabled="isButtonDisabled"
                      type="submit"
                      class="btn btn-primary btn-block"
                    >
                      <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span
                      >&nbsp; Register
                    </button>
                  </div>
                </form>
                <div
                  class="jumbotron jumbotron-fluid"
                  v-if="isRegistrationSuccessful"
                >
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
import { mapState, mapMutations } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

import LOADING from "../utils/constants";

const DEFAULT_ROLE = ""; //user

export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: DEFAULT_ROLE
      },
      validation: {
        errors: []
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      role: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      userCreationLoadStatus: state => state.user.userCreationLoadStatus,
      serverValidationErrors: state => state.user.validationErrors.createUser
    }),
    isLoading() {
      return this.userCreationLoadStatus == LOADING.IN_PROGRESS;
    },
    isButtonDisabled() {
      return this.isLoading || !this.validationPasses;
    },
    isRegistrationSuccessful() {
      return this.userCreationLoadStatus == LOADING.SUCCESS;
    },
    isFormSubmitted() {
      return this.userCreationLoadStatus !== LOADING.NOT_STARTED;
    },
    displayForm() {
      return !this.isFormSubmitted || !this.isRegistrationSuccessful;
    },
    hasServerValidationErrors() {
      return this.serverValidationErrors !== "";
    },
    validationPasses() {
      return !this.$v.$invalid;
    }
  },

  methods: {
    ...mapMutations("user", ["setUserCreationLoadStatus"]),
    setRole(role) {
      this.$v.user.role = role;
    },
    submitForm() {
      this.triggerValidation();
      if (!this.validationPasses) {
        return;
      }
      this.$store.dispatch("user/createUser", this.user);
    },
    triggerValidation() {
      this.$v.$touch();
    },
    isDefaultRole(role) {
      console.log(role);
      return role == DEFAULT_ROLE;
    }
  },
  destroyed() {
    // Reset userCreationLoadStatus state to 0
    this.setUserCreationLoadStatus(LOADING.NOT_STARTED);
  }
};
</script>
