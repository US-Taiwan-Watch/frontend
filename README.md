# USTW Frontend

## Prepare repo
1. clone repo with submodule `common`: 
   - `git clone --recurse-submodules https://github.com/US-Taiwan-Watch/frontend.git`
2. create `.env` in project root and paste the content from [here](https://ustaiwanwatch.sharepoint.com/sites/USTWw/_layouts/15/Doc.aspx?sourcedoc={01469230-a5c4-4eae-8bd5-a41273ae0704}&action=edit&wd=target%28Untitled%20Section.one%7Ca745a153-ea3f-4b6e-8f16-9163bfe64932%2F.env%20%28frontend%5C%29%7Cf8a3af6f-33b8-40c0-ba3f-3946bda3b889%2F%29&wdorigin=703)
3. Make sure you have Node.js 16+, NPM, and yarn. Install modules:
   - `yarn install`

## Local Preparation
1. Change `NEXT_PUBLIC_BASE_URL` in `.env` file to be `"http://localhost:3000"`
2. (Optional) By default API points to production endpoint. If you want to use local API runtime:
   1. Change [`config.ts`](./config.ts):
      ```
      httpHost: "http://localhost:5487",
      wsHost: "ws://localhost:5487",
      ```
   2. Change `GRAPHQL_SCHEMA` in `.env` to be `"http://localhost:5487"`

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
