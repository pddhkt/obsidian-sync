
#### build
docker build --no-cache --build-arg APP_NAME=ctint-mf-tts -t ctint-mf-tts .
#### login to one of the acr (mostly uat)

| docker login cdss3projectdevacr.azurecr.io -u cdss3projectdevacr -p <YOUR_PASSWORD_HERE> | PROJECT DEV ACR |
| ---------------------------------------------------------------------------------------- | --------------- |
| docker login cdss3uatacr.azurecr.io -u cdss3uatacr -p <YOUR_PASSWORD_HERE>               | PRODUCT UAT ACR |

#### tag the image into the acr
docker tag {dock_id} cdss3uatacr.azurecr.io/ctint-mf-tts:1.0.1

#### push to acr
docker push cdss3uatacr.azurecr.io/ctint-mf-tts:1.0.1