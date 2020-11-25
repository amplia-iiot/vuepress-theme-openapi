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
    extension () {
      return this.isYaml ? 'yaml' : 'json'
    }
  },
  mounted () {
    this.loadSwagger()
  },
  methods: {
    async loadSwagger(){
      const { servers = [], commonSchemas = [] } = this.$themeConfig;
      const composedNameSpec = this.converPagePathToSpecFilename()
      try{
        const spec = await import(`@specs/${composedNameSpec}.${this.extension}`)
        const commonSchemasContent = await this.findCommonSchemas(commonSchemas)
        this.mixCommonSchemas(spec,commonSchemasContent)
        SwaggerUI({
          spec: { ...spec, servers: servers.map(url => ({ url })) },
          domNode: this.$el,
        })
      }catch(err){
        this.$el.innerHTML = ''
        console.warn('Spec file not  found:',`@specs/${composedNameSpec}.${this.extension}`);
      }
    },
    converPagePathToSpecFilename(){
      return this.page.regularPath.split('/').filter((item) => !!item).join('-').replace(/\..*$/, '')
    },
    async findCommonSchemas(commonSchemas){
        const commonSchemasContent = await Promise.all(commonSchemas.map(file=>import(`@specs/${file}`)))
        const schemasMixedTogether = commonSchemasContent.reduce((obj, next)=>{return {...obj, ...(next.default||{})}},{})
        return schemasMixedTogether;
    },
    mixCommonSchemas(spec,commonSchemas){
      if (spec.components){
        if (spec.components.schemas){
          spec.components.schemas = {...spec.components.schemas,...commonSchemas}
        }else{
          spec.components.schemas = commonSchemas
        }
      }else{
        spec.components = {
          schemas:commonSchemas
        }
      }
    }
  }
}
</script>

<style scope>
.open-api-container pre {
  background-color: rgb(125, 132, 146);
}
</style>


