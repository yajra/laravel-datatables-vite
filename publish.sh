#!/usr/bin/env bash

version=0.0.0

echo "Publishing version $version"

git add .
git commit -am "Bump $version :rocket:"
npm version $version
git push origin master && git push origin master --tags

npm publish
