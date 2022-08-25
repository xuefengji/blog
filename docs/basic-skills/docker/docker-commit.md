# docker commit

作用:

从容器创建一个新的镜像

## 语法

```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```
options 描述：

| option | 描述                           |
| ------ | ------------------------------ |
| -a     | 提交镜像的作者                 |
| -c     | 使用 Dockerfile 指令来创建镜像 |
| -m     | 提交时的说明文字               |
| -p     | commit 时，将容器暂停          |

## 示例

将从运行的 tomcat 容器中创建一个新的镜像：mytomcat
```bash
docker commit -m="add:test" -a="snowji" 7641ee541af2 mytomcat
```
查看镜像：
```bash
[root@VM-16-7-centos ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
mytomcat     latest    d6759220ab85   6 seconds ago   680MB
nginx        latest    605c77e624dd   3 months ago    141MB
tomcat       latest    fb5657adc892   3 months ago    680MB
redis        latest    7614ae9453d1   3 months ago    113MB
centos       centos7   eeb6ee3f44bd   6 months ago    204MB

```


​	
​	
​	