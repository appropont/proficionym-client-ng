#!/bin/bash

git checkout -b deploy

ng build:production

git add dist -f

git commit -m "Production Deploy"

git push dokku master -f

git checkout master

git branch -D deploy
