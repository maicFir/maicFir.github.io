#!/usr/bin/env sh
###
 # @Author: maicFir mcodes@163.com
 # @Date: 2022-07-21 21:36:50
 # @LastEditors: maicFir mcodes@163.com
 # @LastEditTime: 2022-07-22 11:17:44
 # @FilePath: /maicFir.github.io/deploy.sh
 # @Description: 
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build 

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'
# 推送到指定仓库
git remote add origin https://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@github.com/maicFir/maicFir.github.io.git

git push origin master

echo 'push success'