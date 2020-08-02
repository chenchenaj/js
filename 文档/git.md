### 常用命令

Git在线参考手册: http://gitref.justjavac.com/

```shell
git config --global user.name "username"  //配置用户名

git config --global user.email "xx@gmail.com" //配置邮箱

git init  //初始化生成一个本地仓库
touch .gitignore // 不存放某些内容

git add .   //添加到暂存区

git commit –m "message"  //提交到本地仓库

git remote add origin 远程仓库地址  //关联到远程仓库

git push origin master  //推送本地master分支到远程master分支 

git checkout -b dev  //创建一个开发分支并切换到新分支 

git push origin dev  //推送本地dev分支到远程dev分支

git pull origin dev  //从远程dev分支拉取到本地dev分支

git clone url  //将远程仓库克隆下载到本地

git checkout -b dev origin/dev // 克隆仓库后切换到dev分支

git diff master  // 工作区 VS 历史区（master分支）
git diff --cached // 暂存区 VS 历史区
```



### 同步gitHub

1. 让本地的git仓库和远程仓库建立关联

`$ git remote -v` 
查看所有的关联信息

`$ git remote add xxx [远程仓库git地址]` 
建立关联

`$ git remote remove xxx` 
移除关联

我们远程仓库关联在一起的名字默认是：origin，当然自己可以随意修改

1. 把本地的信息推送到远程仓库上，或者从远程仓库上拉取最新的信息到本地仓库

> 我们本地推送和拉取的信息，既有代码也有版本信息，所以说与其说是推送和拉取，不如说是和远程仓库保持信息的同步

在推送之前，我们都应该先拉取 
`$ git pull origin（这个名字就是和远程仓库关联的这个名字，以自己设置的为主） master` 
从远程仓库的master分支拉取最新的信息

`$ git push origin master` 
把自己本地信息推送到远程仓库的master分支下



### 初始化Git

这个仓库会存放，git对我们项目代码进行备份的文件
在项目目录右键打开 git bash
命令: 初始化完成会出现.git 隐藏文件

```shell
git init
touch .gitignore // 不存放某些内容
```



### 配置用户信息

```shell
# 配置用户名:
git config --global user.name "yx"
# 配置邮箱:  
git config --global user.email "huangyx07@126.com"
```



### 提交代码

```shell
# 把所有的修改的文件添加到大门口
git add ./
# 把仓储门口的代码放到里面的房间中去
git commit -m "这是对这次添加的东西的说明"
```



### 查看状态

```shell
# 可以用来查看当前代码有没有被放到仓储中去
git status
```



### 查看日志

```shell
# 查看历史提交的日志
git log

#可以看到简洁版的日志
git log --oneline
```



### 回退版本

```shell
# 表示回退到上一次代码提交时的状态
git reset --hard Head~0

# 表示回退到上上次代码提交时的状态
git reset --hard Head~1

# 可以通过版本号精确的回退到某一次提交时的状态
git reset --hard [版本号]
```



### 创建分支

```shell
git branch dev
```



### 切换分支

切换到指定的分支,这里的切换到名为dev的分支

```shell
git checkout dev
```



### 查看当前有哪些分支

```shell
git branch
```



### 合并分支

master合并dev分支：需要先切换到master主分支上，然后master主动合并dev分支

合并分支内容,把当前分支与指定的分支(dev),进行合并
当前分支指的是`git branch`命令输出的前面有*号的分支

```shell
git merge dev
```



### 删除dev分支

```shell
git branch -d dev
```



### 克隆旧同事的仓库内容

```shell
git clone 仓库地址

# 拉取远程仓库dev分支并切换到本地仓库的dev分支中
cd 文件目录
git checkout -b dev origin/dev // 克隆仓库后切换到dev分支
```



### 添加同事到GitHub仓库

![1591605419787](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591605419787.png)