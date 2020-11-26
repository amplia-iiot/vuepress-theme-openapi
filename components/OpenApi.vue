<template>
  <div>
    <div class="download-spec" @click="download">Download Spec</div>
    <div :class="baseClass"></div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
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
  data(){
    return {
      baseClass:'open-api-container',
      finalSpec:null,
      finalSpecName:null,
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
    download(){
      const blob = new Blob([JSON.stringify(this.finalSpec, null, 4)], {type: "text/plain;charset=utf-8"});
      saveAs(blob, `${this.finalSpecName}.json`);
    },
    async loadSwagger(){
      const { servers = [], commonSchemas = [] } = this.$themeConfig;
      const composedNameSpec = this.converPagePathToSpecFilename()
      try{
        const spec = await import(`@specs/${composedNameSpec}.${this.extension}`)
        const commonSchemasContent = await this.findCommonSchemas(commonSchemas)
        this.finalSpec = this.mixCommonSchemas(spec,commonSchemasContent)
        this.finalSpecName = composedNameSpec
        SwaggerUI({
          spec: { ...spec, servers: servers.map(url => ({ url })) },
          domNode: this.$el.querySelector(`.${this.baseClass}`),
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
      return spec;
    }
  }
}
</script>

<style scope>
.open-api-container pre {
  background-color: rgb(125, 132, 146);
}

.download-spec {
  position: absolute;
  right: 20px;
  font-weight: 500;
  display:inline-block;
  border:1px solid #CCC;
  box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
  cursor:pointer;
  vertical-align:middle;
  max-width: 100px;
  padding: 5px;
  text-align: center;
}

.download-spec:hover {
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.6);
}

.download-spec:active {
    color:red;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.6);
}
</style>


