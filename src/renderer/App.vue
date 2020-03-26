<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'fbt-auto-post'
  }
</script>

<style>
  /* CSS */
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  * {
    font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
</style>
