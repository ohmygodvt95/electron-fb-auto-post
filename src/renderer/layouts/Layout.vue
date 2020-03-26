<template>
    <div id="wrapper2">
        <vs-navbar
                v-model="indexActive"
                color="#1db952"
                text-color="rgba(255,255,255,.6)"
                active-text-color="rgba(255,255,255,1)"
                class="myNavbar" style="position: fixed;">
            <div slot="title">
                <vs-navbar-title>
                    FB Auto Tools (β)
                </vs-navbar-title>
            </div>

            <vs-navbar-item index="0">
                <router-link to="/home/dashboard">Dashboard</router-link>
            </vs-navbar-item>
            <vs-navbar-item index="1">
                <router-link to="/home/cookie">Cookie</router-link>
            </vs-navbar-item>
            <vs-navbar-item>
                <a href="#" @click="openLink('https://www.facebook.com/ohmygodvt95')">Github</a>
            </vs-navbar-item>

            <vs-spacer></vs-spacer>
        </vs-navbar>
        <div style="padding-top: 50px">
            <router-view></router-view>
        </div>
        <div class="credit">
            <small>Develop by <a href="#"
                                 @click="openLink('https://www.facebook.com/ohmygodvt95')">
                ohmygodvt95</a> with <span style="color: red">❤</span>
            </small>
        </div>
    </div>
</template>

<script>
  export default {
    data: () => ({
      indexActive: 0
    })
  }
</script>

<style>
  .vs-navbar--title {
    color: rgb(255,255,255)!important;
  }
  .credit {
      position: absolute;
      bottom: 5px;
      right: 5px;
  }
</style>
