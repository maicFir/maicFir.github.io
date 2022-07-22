#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build 

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
# 推送到指定仓库
git push -f https://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@github.com/maicFir/maicFir.github.io.git master

echo 'push success'