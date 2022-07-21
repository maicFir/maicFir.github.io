#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git status

git add .

git commit -m '新增自动化脚本'

git push origin dev2.0

echo 'push success'