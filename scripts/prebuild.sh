#!/bin/bash

if test -z "${SERVER_URL}"; then
  echo Setting SERVER_URL...
  export SERVER_URL=https://$HEROKU_APP_NAME.herokuapp.com
  echo SERVER_URL:$SERVER_URL
fi
