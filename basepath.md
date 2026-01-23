#!/bin/sh

  

# Path to the YAML configuration file

CONFIG_FILE="/app/apps/$APP_NAME_ENV/public/config/$GLOBAL_CONFIG_FILE"

AWS_CONFIG_FILE="/app/apps/$APP_NAME_ENV/public/config/global-config/$GLOBAL_CONFIG_FILE"

  

# Restore the original .next directory from the backup

rsync -a /app/orign_dist/* /app/

rsync -a /app/orign_dist/projects/* /app/apps/

# Link .next folder to the correct location for Next.js to find static files

ln -s /app/dist/apps/$APP_NAME_ENV/.next /app/apps/$APP_NAME_ENV/.next

cp $AWS_CONFIG_FILE $CONFIG_FILE

  

# Extract the basepaths and hosts using yq

CDSS_HOST=$(yq e '.microfrontends."ctint-mf-cdss".host' $CONFIG_FILE)

CDSS_BASE_PATH=$(yq e '.microfrontends."ctint-mf-cdss".basepath' $CONFIG_FILE)

AUTOTNC_HOST=$(yq e '.microfrontends."ctint-mf-autotnc".host' $CONFIG_FILE)

AUTOTNC_BASE_PATH=$(yq e '.microfrontends."ctint-mf-autotnc".basepath' $CONFIG_FILE)

  

echo "CONFIG_FILE: $CONFIG_FILE"

echo "AWS_CONFIG_FILE: $AWS_CONFIG_FILE"

echo "CDSS_HOST: $CDSS_HOST"

echo "CDSS_BASE_PATH: $CDSS_BASE_PATH"

echo "AUTOTNC_HOST: $AUTOTNC_HOST"

echo "AUTOTNC_BASE_PATH: $AUTOTNC_BASE_PATH"

  

# Add slashes around the paths if they are not empty

if [ -n "$CDSS_HOST" ]; then

TARGET_PATH_CDSS_HOST="${CDSS_HOST}"

else

TARGET_PATH_CDSS_HOST=""

fi

if [ -n "$CDSS_BASE_PATH" ]; then

TARGET_PATH_CDSS_BASE_PATH="${CDSS_BASE_PATH}"

else

TARGET_PATH_CDSS_BASE_PATH=""

fi

  

if [ -n "$AUTOTNC_HOST" ]; then

TARGET_PATH_AUTOTNC_HOST="${AUTOTNC_HOST}"

else

TARGET_PATH_AUTOTNC_HOST=""

fi

  

if [ -n "$AUTOTNC_BASE_PATH" ]; then

TARGET_PATH_AUTOTNC_BASE_PATH="${AUTOTNC_BASE_PATH}"

else

TARGET_PATH_AUTOTNC_BASE_PATH=""

fi

  

# Replace __HOST_TBM__ and __BASE_PATH_TBM__ with the actual values in all files

for dir in /app/apps /app/dist /app/apps/$APP_NAME_ENV/public; do

sed -i "s|http://localhost:4400|$TARGET_PATH_CDSS_HOST|g" $(find $dir -type f)

sed -i "s|/__CDSS_BASE_PATH_TBM__|$TARGET_PATH_CDSS_BASE_PATH|g" $(find $dir -type f)

sed -i "s|http://localhost:4310|$TARGET_PATH_AUTOTNC_HOST|g" $(find $dir -type f)

sed -i "s|/__AUTOTNC_BASE_PATH_TBM__|$TARGET_PATH_AUTOTNC_BASE_PATH|g" $(find $dir -type f)

done