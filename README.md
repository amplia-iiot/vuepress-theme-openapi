# vuepress-theme-openapi

[Demo](https://amplia-iiot.github.io/vuepress-theme-openapi/)

## Install

```bash
yarn add vuepress-theme-openapi -D
# OR 
npm install vuepress-theme-openapi -D
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  theme: 'openapi'
}
```

---

## How does this theme component work?

### How to set servers url to execute option 'try it out'

To do so is quite simple, you just need to add an array called **servers** at **vuepress/config.js**. This array will have all the url where your servers are located.

```js
// .vuepress/config.js
module.exports = {
  servers: ['http://172.19.18.132:8082']
}
```

### Where should the specifications ( json or yaml ) be ?

All the specifications should be located on *./src/specs*. In our example, on *example/src/specs*

### How do these files have to be called ? 

The name will be given by the path where the vuepress page is located. 

The best way to explain it is by examples ( you will find all of them in this project ):

* example/src/petstore/README.md -> example/src/spect/petstore.json || example/src/spect/petstore.yaml 
* example/src/petstore/using-vue.md -> example/src/spect/petstore-using-vue.json || example/src/spect/petstore-using-vue.yaml 
* example/src/secondSample/README.md -> example/src/spect/secondSample.json || example/src/spect/secondSample.yaml 
* example/src/opengate/README.md -> example/src/spect/opengate.json || example/src/spect/opengate.yaml 

### Specification written in YAML or JSON

You can write your specification in both formats. The only thing that you should do whether the specification is written in YAML is to set the property **openapi** on the frontmatter markdown section.

You will find an example at *example/src/secondSample/README.md*

Markdown example: 
```markdown
---
openapi: yaml
---

# Documentation written in yaml
```