<template>
  <section class="bootcamp mt-5">
    <div class="container">
      <div class="row">
        <!-- Main col -->
        <div class="col-md-8">
          <router-link
            class="btn btn-secondary my-3"
            :to="{ name: 'view-bootcamp' }"
          >
            <i class="fas fa-chevron-left"></i> Bootcamp Info
          </router-link>

          <h1 class="mb-4">DevWorks Bootcamp Reviews</h1>
          <!-- Reviews -->
          <div class="card mb-3">
            <h5 class="card-header bg-dark text-white">Fantastic Bootcamp</h5>
            <div class="card-body">
              <h5 class="card-title">
                Rating: <span class="text-success">10</span>
              </h5>
              <p class="card-text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi similique mollitia, praesentium, animi harum officia
                dolores corporis ex tempore consequuntur dolorem ullam dolorum
                magnam corrupti quaerat tempora repudiandae! Similique,
                molestiae. Iste, blanditiis recusandae unde tenetur eius
                exercitationem rerum a fuga.
              </p>
              <p class="text-muted">Writtern By Kevin Smith</p>
            </div>
          </div>

          <div class="card mb-3">
            <h5 class="card-header bg-dark text-white">Learned a Lot</h5>
            <div class="card-body">
              <h5 class="card-title">
                Rating: <span class="text-success">9</span>
              </h5>
              <p class="card-text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi similique mollitia, praesentium, animi harum officia
                dolores corporis ex tempore consequuntur dolorem ullam dolorum
                magnam corrupti quaerat tempora repudiandae! Similique,
                molestiae. Iste, blanditiis recusandae unde tenetur eius
                exercitationem rerum a fuga.
              </p>
              <p class="text-muted">Writtern By Jill Samson</p>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="col-md-4">
          <!-- Rating -->
          <h1 class="text-center my-4">
            <span class="badge badge-secondary badge-success rounded-circle p-3"
              >8.8</span
            >
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
