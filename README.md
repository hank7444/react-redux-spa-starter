## Features
- webpack v4 + babel
- react + redux + redux-saga
- react-router v4
- mock API server by Express
- unit test by karma + jasmine + enzyme

## Design

### make HTML & CSS
* go to repo && command `gulp design`
* open your browser & enter the urls(`ex: http://localhost:4000`)

### bundle, minifiy, move css && static files to src/
* command: `gulp dist` or `gulp dist-img`, they are only different on dist-img will compress & move image file to src/



## App


**Common commands:**

 - Build first time:
   - **yarn install**
 
 - Develop
   - **yarn run local**
   - for IE 10: **yarn run local-ie**

 - Build
   - Dev: **yarn run build-dev** 
   - Stage: **yarn run build-stage**
   - Production: **yarn run build-production**
   
 - Test bundle data(for Dev & Stage & Production)
   - **yarn run dist-server**
  
 - Testing
   - single unit test (for CI): **yarn run unit**
   - single unit test & genrate coverage report: **yarn run unit-coverage**
   - dev unit test (keep watch): **yarn run unit-dev**

