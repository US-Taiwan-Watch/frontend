# USTW Frontend

## Prepare repo
1. clone repo with submodule `common`:
   - `git clone --recurse-submodules https://github.com/US-Taiwan-Watch/frontend.git`
2. create `.env` in project root and paste the content from [here](https://dev.azure.com/ustw/US%20Taiwan%20Watch/_apis/git/repositories/secret-credentials/items?path=/frontend-env&api-version=6.0)
3. Make sure you have Node.js 16+, NPM, and yarn. Install modules:
   - `yarn install`

## Local Preparation
1. Change `NEXT_PUBLIC_BASE_URL` in `.env` file to be `"http://localhost:3000"`
2. (Optional) By default API points to production endpoint. If you want to use local API runtime:
   1. Change `GRAPHQL_SCHEMA` and `NEXT_PUBLIC_GRAPHQL_HTTP_HOST` in `.env` to be `"http://localhost:5487"`
   2. Change `NEXT_PUBLIC_GRAPHQL_WS_HOST` in `.env` to be `"ws://localhost:5487"`

## Local Development
1. Run `yarn dev`
2. Local site launches at: `http://localhost:3000`

## Local Production
1. Run `yarn build`
2. Run `yarn start`
3. Local site launches at: `http://localhost:3000`

## Deployment
1. Make sure your Docker daemon is running
2. Just run `docker-push.sh`
   - No need to run `yarn build` where it's already taken care
