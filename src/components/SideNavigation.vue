<template>
  <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxs-book-reader'></i>
      <span class="logo-name">墨&nbsp书</span>
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="#">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class='bx bxs-pie-chart-alt-2'></i>
          <span class="link-name">项目</span>
        </router-link>
      </li>
      <li>
        <div class="profile-details">
          <div class="profile-content">
            <img src="../assets/logo.png">
          </div>
          <div class="profile-name">
            {{username}}
          </div>
          <i class='bx bx-log-out-circle'></i>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "AsideNavigation",
  data() {
    return {
      username:"DEFAULT",
    }
  },
}
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}

.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 230px;
  background: #11101d;
  box-shadow: 3px 3px 3px #111;
}

.sidebar .logo-details{
  margin-top: 20px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidebar .logo-details i{
  font-size: 50px;
  color: #fff;
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.sidebar .logo-details .logo-name{
  margin-left: 10px;
  font-size: 30px;
  color: #fff;
  font-weight: 600;
}

.sidebar .nav-links{
  height: 100%;
  padding-top: 30px;
}

.sidebar .nav-links li{
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}

.sidebar .nav-links li:hover{
  background: #1d1b31;
}

.sidebar .nav-links li i{
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
}

.sidebar .nav-links li a{
  display: flex;
  text-decoration: none;
  align-items: center;
}

.sidebar .nav-links li a span{
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.sidebar .profile-details{
  width: 230px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d1b31;
}

.sidebar .profile-details .profile-content{
  display: flex;
  align-items: center;
}

.sidebar .profile-details img{
  height: 52px;
  width: 52px;
  object-fit: cover;
  border-radius: 16px;
  margin: 0 14px 0 12px;
  background: #1d1b31;
  padding: 10px;
}

.profile-name {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}


</style>