System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.8",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.8",
    "angular-moment": "npm:angular-moment@1.0.0",
    "angular-route": "github:angular/bower-angular-route@1.5.8",
    "lodash": "npm:lodash@4.13.1",
    "moment": "npm:moment@2.17.0",
    "github:angular/bower-angular-mocks@1.5.8": {
      "angular": "github:angular/bower-angular@1.5.8"
    },
    "github:angular/bower-angular-route@1.5.8": {
      "angular": "github:angular/bower-angular@1.5.8"
    },
    "npm:angular-moment@1.0.0": {
      "moment": "npm:moment@2.17.0"
    }
  }
});
