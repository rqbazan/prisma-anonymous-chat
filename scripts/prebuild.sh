#!/bin/bash

if test -z "${API_URL}"; then
  echo Setting API_URL...
  export API_URL=https://$HEROKU_APP_NAME.herokuapp.com/api
  echo API_URL:$API_URL
fi
