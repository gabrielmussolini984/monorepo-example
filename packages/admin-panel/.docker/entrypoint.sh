#!/bin/bash

cd /home/node/app/
yarn install
yarn install jest -d
yarn run dev