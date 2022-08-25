# git pull 报错

**问题**：git pull 时报错

```
error: Your local changes to the following files would be overwritten by merge:
        docs/python/继承.md
Please commit your changes or stash them before you merge.
```

**原因**：本地修改已经使用 add 添加到缓存区了

**解决方法：**

+ 不保存当前修改内容

  ```git
  1. 先回退到上一次提交的版本
  git resert --hard
  2. 重新 git pull
  git pull
  ```

+ 需要保留当前的修改

  ```
  1. 先把本地的修改进行快照
  git stash
  2. 重新拉取
  git pull
  3. 将快照还原
  git stash pop
  ```

**注意：** 没有在 git 版本控制中的文件，是不能被 git stash 存起来的