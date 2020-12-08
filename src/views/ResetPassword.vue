<template>
  <section class="container mt-5">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <router-link :to="{name: 'login'}">Back to login</router-link>
            <h1 class="mb-2">Reset Password</h1>
            <p>
              Use this form to reset your password using the registered email
              address.
            </p>
            <form>
              <div class="form-group">
                <label>Enter Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Email address"
                />
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  value="Reset Password"
                  class="btn btn-dark btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
