# 配置镜像加速

## 为什么要配置镜像加速

+ Docker 从 Docker Hub 拉取镜像，因为是从国外获取，所以速度较慢
+ 配置国内镜像源的方式，从国内获取镜像，提高拉取速度

## 配置

编辑/新建文件 daemon.json

```
vi /etc/docker/daemon.json
```

文件中输入以下内容

```json
{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn", 
                       "http://hub-mirror.c.163.com"]
}
```

重新加载配置信息及重启 Docker 服务

```bash
# 重新加载某个服务的配置文件
sudo systemctl daemon-reload
# 重新启动 docker
sudo systemctl restart docker
```

（完）
