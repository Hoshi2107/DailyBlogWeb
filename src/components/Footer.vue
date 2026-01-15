<template>
  <footer class="footer bg-dark text-light mt-5">
    <div class="container py-4">
      <div class="row">
        <!-- Brand -->
        <div class="col-md-4 mb-3">
          <h5 class="fw-bold" style="font-size: 50px">Daily Blog</h5>
          <p>
            Nơi chia sẻ blog, truyện, light novel và những câu chuyện thường
            ngày.
          </p>
        </div>

        <!-- Links -->
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold">Quick Links</h6>
          <ul class="list-unstyled">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li>
              <router-link to="/new-post" class="footer-link"
                >New Post</router-link
              >
            </li>
            <li>
              <router-link to="/account" class="footer-link"
                >Account</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold" style="text-align: left">Contact</h6>
          <p class="small mb-1" style="text-align: left">
            Email: dailyblog@email.com
          </p>
          <p class="small mb-1" style="text-align: left">Phone: 0387 210 708</p>
          <p class="small mb-0" style="text-align: left">© 2026 Daily Blog</p>
        </div>
      </div>

      <hr class="border-secondary" />
      <p style="font-size: large">Made with ❤️ by Hoshi</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
}

.footer-link:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
