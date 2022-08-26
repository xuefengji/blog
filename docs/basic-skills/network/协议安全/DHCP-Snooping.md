# DHCP Snooping

## 什么是 DHCP Snooping

+ 是 DHCP 的一种安全特性，常用于二层交换机
+ 启用了该功能的交换机，可以屏蔽接入网络中的非法 DHCP 服务器，只能从指定的 DHCP 服务器获取 IP 地址、

## DHCP Snooping 原理

前提需要先了解 DHCP 协议，可参考：[DHCP 协议](/basic-skills/network/DHCP协议)

### 原理

+ DHCP Snooping 将交换机上的端口分为信任（trusted）和非信任（untrusted）两种类型
+ 交换机只转发信任端口的 DHCP OFFER/ACK/NAK 报文
+ 丢弃非信任端口的 DHCP OFFER/ACK/NAK 报文，从而达到阻断非法 DHCP 服务器的目的
+ 启动了 DHCP Snooping，则 DHCP 服务器只能通过信任端口发送 DHCP OFFER 报文

### DHCP Snooping 主要工作

+ 验证从非信任途径接收的 DHCP 报文，并丢弃不符合要求的报文
+ 生成并维护 DHCP Binding Table 记录表
+ 根据 DHCP Binding Table 记录表中的信息来验证非信任主机发来的 DHCP 报文

## DHCP Snooping 可防御的攻击种类

### Spoofing 攻击

+ 恶意攻击者想探听用户和网关之间的通信，给用户发送伪造的 ARP 应答报文，使用户误认为自己就是默认网关或 DNS 服务器
+ 用户和网关之间看似“直接”的通信，实际上都是通过黑客所在的用户间接进行的，即黑客担当了“中间人”的角色，可以对信息进行了窃取和篡改

### 仿冒 DHCP 报文攻击

+ 如果攻击者冒充合法用户不断向 DHCP Server 发送 DHCP REQUEST 报文来续租 IP 地址
+ 导致这些到期的 IP 地址无法正常回收，以致一些合法用户不能获得 IP 地址
+ 而若攻击者仿冒合法用户的 DHCP Release 报文发往 DHCP Server，将会导致用户异常下线

## 如何开启DHCP Snooping
+ 如果接入交换机上连接了有线终端，那就需要开启 DHCP Snooping 功能
+ 在想要保护的 VLAN 上启用 DHCP Snooping 之前，需要先设置信任端口，这些端口允许来自合法 DHCP 服务器数据包的流通
+ 在 CLI 命令行界面和 Web 界面都可以完成该配置

（完）
