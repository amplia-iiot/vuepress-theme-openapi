<template>
  <main class="page custom">
    <slot name="top" />
    <PageNav class="top" v-bind="{ sidebarItems }" />

    <Content class="theme-default-content" />

    <slot name="bottom" />
    <PageNav class="bottom" v-bind="{ sidebarItems }" />
  </main>
</template>

<script>
import PageNav from '@parent-theme/components/PageNav.vue'

export default {
  components: { PageNav },
  props: ['sidebarItems']
}
</script>

<style>
 .custom{
    padding-top: 4rem;
 }

 .custom .top.page-nav {
    padding-bottom: 1rem;
    padding-top: 0;
}

.custom .top.page-nav .inner {
    min-height: 1rem;
    margin-top: 0.5rem;
    border-top: none;
    padding-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 1rem;
}
</style>
