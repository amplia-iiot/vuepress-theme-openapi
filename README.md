# How does open-api component work?

## Where should the specifications ( json or yaml ) be ?

All the specifications are located on *./src/specs*

## How do these files have to be called ? 

The name will be given by the path where the vuepress page is located. 

The best way to explain it is by examples ( you will find all of them in this project ):

* src/petstore/README.md -> src/spect/petstore.json || src/spect/petstore.yaml 
* src/petstore/using-vue.md -> src/spect/petstore-using-vue.json || src/spect/petstore-using-vue.yaml 
* src/secondSample/README.md -> src/spect/secondSample.json || src/spect/secondSample.yaml 
* src/opengate/README.md -> src/spect/opengate.json || src/spect/opengate.yaml 

## Specification written in YAML or JSON

You can write your specification in both formats. The only thing that you should do whether the specification is written in YAML is to set the property **openapi** on the frontmatter markdown section.

You will find an example at *src/secondSample/README.md*

Markdown example: 
```markdown
---
openapi: yaml
---

# Bla bla
```