# ilSaye
Live crowd interactions for events

## Demo:
Live till 31/08/2019:
- Frontend: https://ilsaye.azurewebsites.net/
- Backend: https://ilsayebackend.azurewebsites.net/doc

![ilSayeLogo192.png](media/ilSayeLogo192.png)

### Backend Status:
[![Backend Build Status](https://pathtolife.visualstudio.com/ilSaye/_apis/build/status/PathToLife.ilSaye%20Backend?branchName=master)](https://pathtolife.visualstudio.com/ilSaye/_build/latest?definitionId=8&branchName=master)
### Frontend Status:
[![Frontend Build Status](https://pathtolife.visualstudio.com/ilSaye/_apis/build/status/PathToLife.ilSaye%20Frontend?branchName=master)](https://pathtolife.visualstudio.com/ilSaye/_build/latest?definitionId=7&branchName=master)

### Deployment info
Thanks to custom yaml configs, this repo serves as both the frontend and backend for devops deployment to two Azure WebApp instances.

Enviroment variables such as DB_HOST, DB_PASS are applied by devops internally during build.
