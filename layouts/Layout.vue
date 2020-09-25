<template>
  <div>
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
    ParentLayout,
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
