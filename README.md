# hiking-ui

## Updating
* Update version in `k8s/hiking.yml`
* Commit changes
* Create tag with the same version as in `k8s/hiking.yml`
* Push changes together with a tag
* `kubectl apply -f k8s/hiking.yml`
* Wait until docker hub builds new image and then new version will start automatically
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
