#!/bin/bash

git checkout -b deploy

ng build --prod

git add dist -f

git commit -m "Production Deploy"

git push dokku deploy:master -f

git checkout master

git branch -D deploy
