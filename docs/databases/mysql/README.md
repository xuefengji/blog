# MySQL

> 本系列以 MySQL 8.0 作为安装版本进行知识点梳理，但考虑到目前在生产环境中用的比较多的是 5.7，故优先使用向前兼容的 5.7 版本功能，对于 8.0 特有的新功能和特性，仅是学习一下

在日常工作与学习中，无论是开发、运维、还是测试，对于数据库的学习是不可避免的，同时也是日常工作的必备技术之一。而目前业内所用的关系型数据库中，占比较多的还是 MySQL

<hr>

**哪个版本的 MySQL 可以用于生产环境**：

MySQL 有很多版本，支持在生产环境中使用的有 8.0、5.7 和 5.6：

* MySQL 8.0(GA)，MySQL 8.0.11 于2018年4月19日发布
* MySQL 5.7(GA)，MySQL 5.7.9 于2015年10月21日发布
* MySQL 5.6(GA)，MySQL 5.6.10 于2013年2月5日发布
* MySQL 5.5(GA)，MySQL 5.5.8 于2010年12月3日发布

<hr>

**为什么这三个版本可以用于生产环境**：

MySQL 的产品生命周期分为三个阶段，首要阶段、延伸阶段和维持阶段（MySQL 版本号的前两位为主版本号，例如 8.0、5.7、5.6，后面的为维护版本号码。MySQL 的生命周期计算依据主版本号）

* 首要阶段的时间为产品 GA 开始 5 年。处于首要阶段的产品会定期发布维护版本、更新、修正错误及修补安全漏洞
* 延伸阶段为产品 GA 后 6-8 年。延伸阶段的产品会对特定的错误及安全漏洞发布维护版本和更新
* 产品从 GA 的第 9 年起进入维持阶段。进入维持阶段后，MySQL 将不会对其进行维护版本的发布、更新和修正错误

因此对应 MySQL 各个版本的 GA 日期，目前生产系统上支持 8.0、5.7 及 5.6 版本的 MySQL

<hr>

**为什么 MySQL 的版本号没有 6.x 和 7.x**：

早在 2008 年，Sun 收购 MySQL AB 以前，公司内部已经在进行着版本号 6 的开发工作了（5.0 在 2005 年发布）。然而，版本 6 的 MySQL 制定的目标和计划过于激进，步子迈得有点儿大，随着收购的顺利完成，项目也被砍掉了

至于版本号 7，则是用在了 MySQL Cluster 上。由于新版的 MySQL 带来了许多的重大更新，开发者们决定是时候把版本号往前滚动一下了，于是便有了 8

参考：[MySQL 8 is coming](https://opensource.com/article/17/2/mysql-8-coming)

<hr>

**为什么选择 MySQL 8.0 做安装版本**：

5.7 版本虽然还在其生命周期，但已经进入了维持阶段，不出意外，将于2023年的10月份结束对它的维护，进入到与 5.6 同样的状态

8.0 版本发布于2018年的4月份，除了在功能和性能上进行了大幅的增强和改进，它的发布方式（持续发布）使得用户可以在第一时间获得最新的功能和改进，而不像以往一定要等到大版本升级才能获得新的功能

但现实中，数据库系统升级影响很大，以前的 5.6 和 5.7 版本目前也足够稳定，如果不是新开的项目，需要慎重考虑是否升级（毕竟像 Facebook 这样的公司，将 MySQL 从 5.6 升级至 8.0 也花了几年时间，覆盖率还没达到 100%）

因此，考虑到实际情况，本系列采用 MySQL 8.0 做安装版本，但会优先使用向前兼容的 5.7 版本功能，对于 8.0 特有的新功能和特性，仅是学习一下

<hr>

**MySQL 5.7 和 8.0 性能对比**：

* [MySQL 5.7和8.0性能测试](https://www.cnblogs.com/YangJiaXin/p/11234591.html)

该性能测试结果未经考验，仅供参考

<div style="text-align: right">
  <svg t="1646148855959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5290" width="64" height="64"><path d="M715.8 312.4l-5.6-11.7c-2.4-3.4-5.9-6-7.9-10h-0.6v-0.6c3.3-0.8 6.7-1.2 10.1-1.1 2 1.9 5.1 3.3 6.7 5.6 1.2 1.7 1.4 3.6 2.8 5 0 5.9-1.6 9.8-5.1 12.3 0.2-0.1-0.4 0.5-0.4 0.5z m251.9 251.1c-9.3-5.9-20.1-9.2-29.8-15.1-5.4-3.3-10.7-7.4-15.7-11.2-4.7-3.5-9.9-10.1-12.9-15.1-1.6-2.6-1.9-5.7-3.9-7.8 0.6-4.6 6.4-4.6 10.1-6.1 12.9-5.4 28-7.2 47.8-6.7-0.6-5-12.9-11.2-16.9-13.9-8-5.6-16.2-11.6-24.7-16.8-4.5-2.7-12.2-4.7-16.9-6.7-6.7-2.8-21.5-5.5-25.3-10.6-7.3-9.6-12.3-21.3-17.4-32.9-5.2-11.6-11.7-23.8-16.9-35.7-2.6-5.9-3.8-11.2-6.7-16.7-18.1-34.5-44.6-63.4-77-83.7-10.6-6.7-22.4-12.8-35.4-16.7-7.4-2.2-16.3-1-24.2-2.8h-5.1c-4.4-1.3-8.1-6-11.8-8.4-7.6-5-15.2-8.6-24.2-12.3-3.4-1.4-12.5-4.7-15.7-2.2-1.9 0.6-2.8 1.4-3.4 3.3-1.9 2.9-0.2 7.3 1.1 10 3.6 7.8 8.8 12.5 13.5 19 4.2 5.8 9.3 12.4 12.4 19 6.3 13.7 9.2 28.9 15.2 42.4 2.3 5.2 5.7 11.1 9 15.6 2.7 3.6 7.5 6.4 9 11.2 3.1 4.8-4.5 21.1-6.2 26.2-6.5 20-5.1 47.9 2.2 65.3 2.9 6.9 5.7 14.9 13.5 16.7 0.6-0.4 0.1-0.2 1.1-0.5 1.7-13.4 2.2-26.3 6.7-36.8 2.8-6.6 8.2-11.1 11.8-16.7 2.7 1.5 2.6 6 3.9 8.9 3.3 7.6 6.8 15.9 10.7 23.4 8.3 15.7 17.3 30.8 27.6 44.6 3.6 4.9 8.5 10.2 12.9 14.5 1.9 1.8 4.2 2.8 5.6 5h0.6v0.6c-7.6-2.6-12.1-10.1-18-14.5-11.3-8.4-24.6-21-32-32.9l-10.1-20.1v-0.6c-1.4 1.9-1 3.9-1.7 6.7-3.2 12.3-0.7 26.2-11.8 30.7-12.7 5.1-21.9-8.3-25.9-14.5-12.8-20.3-16.1-54.5-7.3-82 1.9-6.1 2.1-13.6 5.6-18.4-0.6-4.3-4.1-5.6-6.2-8.4-3.4-4.6-6.3-10-9-15.1-5.3-10.1-8.8-22-12.9-32.9-1.7-4.4-2-8.6-3.9-12.8-2.9-6.4-8.2-12.7-12.4-18.4-5.9-8.1-22.3-23.7-15.7-39.6 10.4-25.3 46.6-6.1 60.7 2.8 3.5 2.2 7.5 6.8 11.2 8.4l18.6 1.1c11.5 2.7 22.4 4.8 31.5 10 42.6 24.7 70 49.9 95.6 91.5 5.3 8.7 8.1 18.2 12.4 27.9 6.3 14.4 13 28.5 20.3 42.4 3.4 6.4 5.8 13.5 10.1 19 1.8 2.3 6.8 3.1 9.6 4.5 8.3 4.2 18 7.3 25.9 12.3 14.2 8.9 27.9 19.5 40.5 30.1 4.8 4.1 8 10 12.4 14.5v2.2c-3.9 1.1-7.9 2.2-11.8 3.3-8.7 2.2-16.3 1.7-24.7 3.9-5 1.3-11.4 3.3-16.9 3.9l0.6 0.5c3.2 8.9 20.4 16.3 28.1 21.8 9.6 6.9 18.7 15.1 25.9 24.5l7.3 7.3c1.7 2.4 2.1 5.5 3.9 7.8v0.5c-3.4-1.2-5.2-4.2-7.9-6.1-5.7-3.8-11.1-8.1-16.6-11.6zM373 728.9H271.4v-21.5h101.7c20.7-2.2 18.3-12.4 18.3-15.8v-8.4h-68.3c-31.8-0.3-52.1-14.1-52.3-29.9 0-1.5 0.7-71 0-71.6H303v69.5c-0.3 3.8 1.2 12.6 18.8 12.9 9 0.1 69.4 0 69.9 0v-82.7h32.2c0.2 0 0 112.8 0 113.3 0.2 27.7-34.8 33.7-50.9 34.2zM211.8 558.2L162 668.1c-5.9 13.3-13.6 18-29.4 18-15.8 0-23.8-4.7-29.7-18L53.2 558.2v126.1H21V558.4c0-12.3 4.9-18.2 15.2-21.3 24.4-7.6 41.1-1 48.2 15.3l47.3 108.5 48.9-108.5c7.4-16.4 23.8-22.9 48.3-15.3 10.2 3.1 15.2 9 15.2 21.3v125.9h-32.2l-0.1-126.1z" fill="#00758F" p-id="5291"></path><path d="M659.8 536.6h61.1c3.1 0 5.9 0.2 9 0.6 27 3.7 40.6 15.4 40.6 34.7v75.9c0 15.6-5.8 24-19.1 29.5l31.7 28.4h-37.3l-25.6-23-25.8 1.6H660c-6.4 0-12.8-0.9-18.9-2.7-20.5-5.5-30.4-16.2-30.4-33.8v-75.9c0-19.3 13.6-31 40.6-34.7 2.6-0.4 5.7-0.6 8.5-0.6z m-14.6 109.3c0 1 0.3 2.1 0.6 3.3 1.9 8.8 10.2 13.7 22.9 13.7H698l-26.8-24.1h37.3l23.4 21c4.3-2.3 7.2-5.8 8.2-10.3 0.3-1 0.3-2.1 0.3-3.1v-72.8c0-0.8 0-1.9-0.3-2.9-1.9-8.2-10.2-12.9-22.6-12.9h-48.7c-14.3 0-23.6 6.2-23.6 15.8v72.3z m-148.9-88.1c-11.5 1-14.9 2.9-16.4 9.4-0.3 1-0.3 1.9-0.3 2.7v14.5c0 1 0 1.8 0.3 2.9 1.5 8.6 7.7 12.5 20.7 12.5h39c9.6 0 19.5 1.6 27.5 4.7 15.2 5.7 22.9 14.3 22.9 23.5v23.3c0 11.3-6.8 19.9-20.7 26.2-8.3 3.9-18.9 6.1-29.7 6.1h-92.5v-21.3h88.8c1.2 0 2.2-0.2 3.4-0.2 6.2-0.4 10.8-2.1 13.6-4.5 3.1-2.5 4.6-5.3 4.6-7.6v-18.6c0-2.2-0.9-4.3-2.5-5.7-3.1-3.7-7.4-5.5-17.6-6.3-0.9-0.2-2.2-0.2-3.4-0.2h-33.4c-3.1 0-6.2-0.2-9.3-0.4-27.5-2.9-43.9-15.1-43.9-29.5v-18.6c0-16.4 8.4-25.8 27.5-31.7 6.2-1.8 13-2.7 26-2.7h90.3v21.3h-91.9c-0.9 0-2.1 0.2-3 0.2z m326.5 88.6c0 11.3 7.1 16 26 16h84.4v21.3h-83.8c-3.1 0-6.2-0.2-9.3-0.4-33.1-2.4-49.5-14.7-49.5-36.6V536.3h32.2v110.1z m149.2-8.2c12.5 0 23.7 9.5 23.7 23.5 0 14.1-11.2 23.5-23.7 23.5s-23.7-9.5-23.7-23.5 11.2-23.5 23.7-23.5z m0 42.2c10.2 0 18.4-8 18.4-18.6 0-10.7-8.2-18.6-18.4-18.6-10.3 0-18.4 8-18.4 18.6 0.1 10.6 8.1 18.6 18.4 18.6z m11.3-24.3c0 4.9-3.2 6.9-7.3 7.3l7.8 11.8h-5.3l-7.1-11.6h-4.2v11.6h-4.5v-26.9h10.6c6.5 0 10 2.3 10 7.8z m-16.2-4v7.7h4.9c3.4 0 6.4-0.3 6.4-4.1 0-3.1-3.3-3.6-6-3.6h-5.3z" fill="#F2A72F" p-id="5292"></path></svg>
</div>