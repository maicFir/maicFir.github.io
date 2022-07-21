#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build 

# 进入生成的文件夹
cd docs/.vuepress/dist

git status

git init
git add -A
git commit -m 'deploy'
# 推送到指定仓库
git push -f https://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@github.com/maicFir/maicFir.github.io.git master

echo 'push success'