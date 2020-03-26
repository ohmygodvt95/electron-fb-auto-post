<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main id="loading">
    </main>
  </div>
</template>

<script>
  import Store from '../../lib/store'
  export default {
    mounted () {
      this.$vs.loading({
        container: '#loading',
        scale: 1
      })
      setTimeout(() => {
        this.$vs.loading.close('#loading > .con-vs-loading')
        let store = new Store({
          configName: 'user-cookie',
          defaults: {
            cookie: ''
          }
        })
        if (store.get('cookie').length < 1) {
          this.$router.push('/cookie')
        } else {
          this.$router.push('/home/dashboard')
        }
      }, 2000)
    }
  }
</script>

<style>
  #logo {
    width: 250px;
    position: relative;
    display: block;
    margin: 0 auto;
  }
  #loading {
    height: 100vh;
    width: 100vw;
    position: absolute;
  }
</style>

