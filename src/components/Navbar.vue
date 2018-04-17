<template lang="html">
  <header class="main-header">
    <router-link :to="{ name: 'Dashboard', params: {} }" class="logo">
      <span class="logo-mini">IVS</span> </router-link>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown messages-menu"><a href="javascript:void(0)" class="dropdown-toggle">
            <i class="fa fa-envelope-o"></i><span class="label label-success">4</span>
          </a> </li>
          <li class="dropdown notifications-menu"><a href="javascript:void(0)" class="dropdown-toggle">
            <i class="fa fa-bell-o"></i><span class="label label-warning">4</span>
          </a> </li>
          <li class="dropdown tasks-menu"><a href="javascript:void(0)" class="dropdown-toggle">
            <i class="fa fa-flag-o"></i><span class="label label-danger">9</span>
          </a> </li>
          <li>
            <a href="javascript:void(0)">
              <i class="fa fa-gears"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
