<template>
  <div class="open-api-vuepress">
    <div v-if="hasSpec" class="download-spec" @click="download">Download Spec</div>
    <div :class="baseClass"></div>
  </div>
</template>

<script>
import axios from 'axios'
import yaml from 'js-yaml'
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
  computed:{
    hasSpec(){
      return typeof this.finalSpecName === 'string' && this.finalSpecName.length > 0
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
      commonSchemasContent:null
    }
  },
  async mounted () {
    await this.loadCommonSchemas()
    this.loadSwagger()
  },
  methods: {
    download(){
      const blob = new Blob([JSON.stringify(this.finalSpec, null, 4)], {type: "text/plain;charset=utf-8"});
      saveAs(blob, this.finalSpecName);
    },
    async loadCommonSchemas(){
      const { commonSchemas = [] } = this.$themeConfig;
      this.commonSchemasContent = await this.findCommonSchemas(commonSchemas)
    },
    async loadSwagger(){
      const { servers = [] } = this.$themeConfig;
      const composedNameSpec = `${this.converPagePathToSpecFilename()}.yaml`
      try{
        const {data} = await axios.get(this.fileUrl(composedNameSpec))
        const spec = yaml.load(data)
        this.finalSpec = this.mixCommonSchemas(spec,this.commonSchemasContent)
        this.finalSpecName = `${this.converPagePathToSpecFilename()}.json`
        SwaggerUI({
          spec: { ...spec, servers: servers.map(url => ({ url })) },
          domNode: this.$el.querySelector(`.${this.baseClass}`),
        })
      }catch(err){
        this.$el.querySelector(`.${this.baseClass}`).innerHTML = ''
        this.finalSpec = null
        this.finalSpecName = null
        console.warn('Spec file not  found:', this.fileUrl(composedNameSpec));
      }
    },
    converPagePathToSpecFilename(){
      return this.page.regularPath.split('/').filter((item) => !!item).join('-').replace(/\..*$/, '')
    },
    fileUrl(fileName){
      return `${location.origin}${this.$site.base}specs/${fileName}`
    },
    async findCommonSchemas(commonSchemas){
      try{
        const commonSchemasContent = await Promise.all(commonSchemas.map(file=>axios.get(this.fileUrl(file))))
        const schemasMixedTogether = commonSchemasContent.reduce((obj, next)=>{return {...obj, ...(next.data||{})}},{})
        return schemasMixedTogether;
      }catch(err){
        console.warn(err);
      }
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
.open-api-vuepress .swagger-ui .info .title{
  padding-right: 120px;
}

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


