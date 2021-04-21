<template>
  <div class="custom-layout">
    <ParentLayout>
      <template v-slot:page-bottom>
          <component v-if="dynamicComponent" :is="dynamicComponent" :page="$page"></component>
      </template>
    </ParentLayout>
  </div>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

export default {
  components: {
    ParentLayout
   }, 
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted () {
    import('@theme/components/OpenApi.vue').then(module => {
      this.dynamicComponent = module.default
    })
  }
}
</script>

<style>
  .custom-layout .theme-default-content{
    padding-top:0px;
  }

  .custom-layout .theme-default-content:not(.custom) > h1{
    padding-top:1em;
  }
</style>