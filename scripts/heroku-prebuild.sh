#!/bin/bash

if [[ -z "${API_URL}" ]]; then
  export API_URL=https://$HEROKU_APP_NAME.herokuapp.com/api
fi
