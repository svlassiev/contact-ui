# hiking-ui

## Updating
```shell script
$ docker build -t svlassiev/hiking:<version> .
$ docker push svlassiev/hiking:<version>
$ kubectl apply -f k8s/hiking.yml
```

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
