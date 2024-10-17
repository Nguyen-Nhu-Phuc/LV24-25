<template>
  <div class="footer frame">
    <!-- <div class="frame__logo col lg-4">
      <a href="" class="logo"> Huī<span>Tài Láng();</span></a>
      <p>Welcome to Huī Tài Láng teacher</p>
    </div> -->

    <!-- <div class="footer__content col lg-2">
      <h4>Company</h4>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Service</a></li>
      <li><a href="#">Tutorial</a></li>
    </div> -->

    <!-- <div class="footer__content col lg-2">
      <h4>About</h4>
      <li><a href="#">Karir</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Tentang</a></li>
      <li><a href="#">Kontak Kami</a></li>
    </div> -->

    <!-- <div class="footer__content col lg-2">
      <h4>Service</h4>
      <li><a href="#">Domain</a></li>
      <li><a href="#">Transfer</a></li>
      <li><a href="#">Website</a></li>
      <li><a href="#">Bantuan</a></li>
    </div> -->

    <!-- <div class="footer__content col lg-2">
      <h4>Tutorial</h4>
      <li><a href="#">C++</a></li>
      <li><a href="#">PIYTHON</a></li>
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
    </div> -->

    <!-- Thêm phần thông tin bản quyền -->
    <div class="footer__copyright col lg-12">
      <p>&copy; Copyright 2024: Hieu-Nghia Do, Nhu-Phuc Nguyen, Truong-Thanh Ma, Bich-Chung Phan</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
  display: flex !important;
  left: 0;
  right: 0;
  bottom: 0;
  flex-wrap: wrap;
  /* Đảm bảo footer có thể xuống dòng nếu không đủ không gian */
}

.frame {
  background-color: #121212;
}

.frame__logo {
  text-align: center;
}

.logo {
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  font-size: 1.5rem;
}

p {
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.footer__content {
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

a {
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
}

.icon {
  color: #fff;
}

span {
  color: #4bb6b7;
}

.footer__copyright {
  height: 60px;
  text-align: center;
  /* Canh giữa thông tin bản quyền */
  color: #fff;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  /* Đảm bảo nó chiếm toàn bộ chiều rộng */
  margin-top: 20px;
  /* Khoảng cách với phần trên */
}
</style>
