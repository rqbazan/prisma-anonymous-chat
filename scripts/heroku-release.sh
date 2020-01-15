#!/bin/bash

cd backend

if test -z "${IS_REVIEW_APP}"; then
  echo Prisma deploy...
  prisma deploy
  echo Successfully.
else
  echo Force prisma deploy...
  prisma deploy --force
  echo Successfully.
fi
