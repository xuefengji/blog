module.exports = [
  {
    title: 'Docker 入门',
	path: '/basic-skills/docker/',
    collapsable: false,
    children: [
    		{
				title: 'docker 安装',
				path: '/basic-skills/docker/docker-install',
				collapsable: true
			},
			{
			title: 'docker version 查看容器信息',
			path: '/basic-skills/docker/docker-version',
			collapsable: true
			},
			{
				title: '配置镜像加速',
				path: '/basic-skills/docker/mirror-accelerate',
				collapsable: true
			},
			{
				title: 'docker 镜像原理',
				path: '/basic-skills/docker/docker-images',
				collapsable: true
			},
			{
				title: 'docker run 的流程和原理',
				path: '/basic-skills/docker/docker-run-process-principle',
				collapsable: true
			},
			{
				title: 'docker images 查看镜像',
				path: '/basic-skills/docker/images-command',
				collapsable: true
			},
			{
				title: 'docker search 搜索镜像',
				path: '/basic-skills/docker/docker-search',
				collapsable: true
			},
			{
				title: 'docker pull 拉取镜像',
				path: '/basic-skills/docker/docker-pull',
				collapsable: true
			},
			{
				title: 'docker rmi 删除镜像',
				path: '/basic-skills/docker/docker-rmi',
				collapsable: true
			},
			{
				title: 'docker ps 查看运行的容器',
				path: '/basic-skills/docker/docker-ps',
				collapsable: true
			},
			{
				title: 'docker run 运行容器',
				path: '/basic-skills/docker/docker-run',
				collapsable: true
			},
			{
				title: 'docker start/restart 启动/重启容器',
				path: '/basic-skills/docker/docker-start-restart',
				collapsable: true
			},
			{
				title: 'docker stop/paused 停止/暂停容器',
				path: '/basic-skills/docker/docker-stop-pause',
				collapsable: true
			},
			{
				title: 'docker exec/attach 进入容器',
				path: '/basic-skills/docker/docker-exec-attach',
				collapsable: true
			},
			{
				title: 'docker inspect 获取元数据',
				path: '/basic-skills/docker/docker-inspect',
				collapsable: true
			},
			{
				title: 'docker cp 命令',
				path: '/basic-skills/docker/docker-cp',
				collapsable: true
			},
			{
				title: 'docker top 命令',
				path: '/basic-skills/docker/docker-top',
				collapsable: true
			},
			//{
			//	title: 'docker log 命令',
			//	path: '/basic-skills/docker/docker-log',
			//	collapsable: true
			//},
			{
				title: 'docker commit 提交镜像',
				path: '/basic-skills/docker/docker-commit',
				collapsable: true
			},
			{
				title: 'docker 数据卷',
				path: '/basic-skills/docker/docker-data-volume',
				collapsable: true
			},
			{
				title: '初识 DockerFile',
				path: '/basic-skills/docker/docker-file',
				collapsable: true
			},
			{
				title: 'docker 网络',
				path: '/basic-skills/docker/docker-network',
				collapsable: true
			},
			{
				title: 'docker 镜像制作',
				path: '/basic-skills/docker/docker-mirror-make',
				collapsable: true
			},

			
    ]
},
{
    title: 'Docker 应用安装',
	//path: '/basic-skills/docker/',
    collapsable: false,
    children: [
    		{
				title: 'Nginx 应用安装',
				path: '/basic-skills/docker/nginx-deploy',
				collapsable: true
			},
			{
				title: 'MySQL 安装和数据持久化',
				path: '/basic-skills/docker/mySql',
				collapsable: true
			},
			{
				title: 'Jenkins 应用安装',
				path: '/basic-skills/docker/jenkins',
				collapsable: true
			},
			{
				title: 'GitLab 应用安装',
				path: '/basic-skills/docker/docker-install-gitlab',
				collapsable: true
			},
			{
				title: 'Jenkins 容器中搭建 Python+Pytest+Allure 环境',
				path: '/basic-skills/docker/jenkins-pytest-allure',
				collapsable: true
			},
			{
				title: 'Jenkins+Python+Pytest+Allure 构建项目实战',
				path: '/basic-skills/docker/jenkins-allure-actual-combat1',
				collapsable: true
			}

			
			
    ]

}

]