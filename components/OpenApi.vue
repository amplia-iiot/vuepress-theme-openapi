<template>
  <div class="open-api-container"></div>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: "OpenApi",
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  watch: {
    page: {
      handler () {
        this.loadSwagger()
      }
    }
  },
  computed: {
    isYaml () {
      return this.$frontmatter.openapi === 'yaml'
    },
    extension(){
      return this.isYaml?'yaml':'json'
    }
  },
  mounted(){
    this.loadSwagger()
  },
  methods: {
    loadSwagger(){
      const { servers = [] } = this.$site;
      const composedNameSpec = this.page.regularPath.split('/').filter((item) => !!item).join('-').replace(/\..*$/, '')
      import(`@specs/${composedNameSpec}.${this.extension}`).then(spec => {
        SwaggerUI({
          spec: { ...spec, servers: servers.map(url => ({ url })) },
          domNode: this.$el
        })
      }).catch((err) => {
        this.$el.innerHTML = ''
        console.warn('Spec file not found:',`@specs/${composedNameSpec}.${this.extension}`);
      })
    }
  }
}
</script>

<style scope>
.open-api-container pre {
  background-color: rgb(125, 132, 146);
}
</style>


