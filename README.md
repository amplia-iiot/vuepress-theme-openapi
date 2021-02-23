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
  themeConfig: {
    servers: ['http://172.19.18.132:8082']
  }
}
```

### In case of you are keen on using schemas defined in other files

So far now, there is an open issue on swagger which makes impossible use schemas references of other files (https://github.com/swagger-api/swagger-editor/issues/1409), in order to bring this feature, you may add as many json files as you need at *src/.vuepress/public/specs*. All these schemas defined in these json files will be loaded by the theme and added in every single specification written in yaml. Therefore, you could use in your openapi definition as if it was already there.

You may find an example of this feature at: example/src/.vuepress/public/specs/petstore.yaml
This definition is using the schemas defined at:
* example/src/.vuepress/public/specs/schemas.json
  
Same example on live [here](https://amplia-iiot.github.io/vuepress-theme-openapi/petstore/#even-the-subheaders)

### Where should the specifications yaml be ?

All the specifications should be located on *src/.vuepress/public/specs* and written in yaml. In our example, on *example/src/.vuepress/public/specs*

### How do these files have to be called ? 

The name will be given by the path where the vuepress page is located. 

The best way to explain it is by examples ( you will find all of them in this project ):

* example/src/petstore/README.md -> example/src/.vuepress/public/specs/petstore.yaml 
* example/src/petstore/using-vue.md ->  example/src/.vuepress/public/specs/petstore-using-vue.yaml 
* example/src/secondSample/README.md ->  example/src/.vuepress/public/specs/secondSample.yaml 
* example/src/opengate/README.md ->  example/src/.vuepress/public/specs/opengate.yaml 

### Specification written in YAML

You can write your specification just in yaml format. This is because we are using all the *.json on src/.vuepress/public/specs as schemas catalogs