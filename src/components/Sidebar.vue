<template lang="html">
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
      </div>
      <ul class="sidebar-menu">
        <li class="treeview">
          <router-link :to="{ name: 'Dashboard', params: {} }">
            <i class="fa fa-dashboard"></i>
          </router-link>
        </li>
        <li class="treeview">
          <router-link :to="{ name: 'Crypto', params: {} }">
            <i class="fa fa-dollar"></i>
          </router-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
