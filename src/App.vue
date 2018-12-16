<template>
  <div id="app">

      <div id="homepage-logo" class="col-12">
        <div id="logo-wrapper">
          <router-link to="/search">
          <img src="./assets/nasa_logo.png" id="logo" alt="nasa logo" height="88" width="107" />
          </router-link>
            <h1 class="mt-2 mb-5">NASA Media Library</h1>
        </div>
      </div>

    <!--<Search />-->
    <router-view></router-view>
  </div>
</template>
<script>






import Search from "@/components/search";
export default{
  name: 'App',
  components: {Search},
}

</script>

<style>

  @import '../node_modules/bootstrap/dist/css/bootstrap.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  label.title {

    font-weight: 500;
  }

  /* xs < 768 */
  @media screen and (max-width: 767px) {
    label.title {
      font-size: 22px;
    }
  }

  /* sm */
  @media screen and (min-width: 768px) {
    label.title {
      font-size: 22px;
    }
  }

  /* md */
  @media screen and (min-width: 992px) {
    label.title {
      font-size: 22px;
    }
  }

  /* lg */
  @media screen and (min-width: 1200px) {
    label.title {
      font-size: 22px;
    }
  }

</style>
