# USTW Frontend

## Prepare repo
1. clone repo with submodule `common`:
   - `git clone --recurse-submodules https://github.com/US-Taiwan-Watch/frontend.git`
2. create `.azure_pat` in project root and paste the content from [here](https://teams.microsoft.com/l/message/19:2ac8c20126f24e67ac28ae147c9cb30a@thread.tacv2/1663480090929?tenantId=512c96f3-8941-4b5f-97e2-4d50fdf3a16d&groupId=119f3bf4-fb2c-4d73-9b92-cf94106ab77e&parentMessageId=1663480071753&teamName=USTW%20w%2F%20%E5%BF%97%E5%B7%A5%E7%BE%A4&channelName=%E5%B7%A5%E7%A8%8B%E7%B5%84&createdTime=1663480090929&allowXTenantAccess=false)
3. Run `./env_download.sh > .env` to get the latest `.env`
4. Follow this to install yarn 3.6.0 or higher
5. Make sure you have Node.js 16+, NPM, and yarn. Install modules:
   - `yarn install`

## Local Preparation
1. Change `NEXT_PUBLIC_BASE_URL` in `.env` file to be `"http://localhost:3000"`
2. (Optional) By default API points to production endpoint. If you want to use local API runtime:
   1. Change `GRAPHQL_SCHEMA` and `NEXT_PUBLIC_GRAPHQL_HTTP_HOST` in `.env` to be `"http://localhost:5487"`
   2. Change `NEXT_PUBLIC_GRAPHQL_WS_HOST` in `.env` to be `"ws://localhost:5487"`
3. To view the latest `.env` after the first time, simply run `./env_download.sh`

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
