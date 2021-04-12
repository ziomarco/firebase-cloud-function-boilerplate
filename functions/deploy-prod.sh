export GOOGLE_APPLICATION_CREDENTIALS="service-account/prod-service-account.json"

firebase functions:config:set environment.name="production"

firebase --project=<production> deploy --only functions