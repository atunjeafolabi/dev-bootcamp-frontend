<template>
  <!-- Showcase -->
  <section class="showcase">
    <div class="dark-overlay">
      <div class="showcase-inner container">
        <h1 class="display-4">Find a Code Bootcamp</h1>
        <p class="lead">
          Find, rate and read reviews on coding bootcamps
        </p>
        <form action="bootcamps.html">
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
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.showcase {
  position: relative;
  background: url("/assets/img/showcase.jpg") no-repeat center center/cover;
  min-height: 100vh;
  color: #fff;
}
.showcase-inner {
  text-align: center;
  padding-top: 20%;
  height: 100%;
  width: 80%;
  margin: auto;
}
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
