# 文件打包与压缩

## 常见压缩文件后缀

| 文件后缀 | 说明                          |
| -------- | ----------------------------- |
| .bz2     | 用 bizp2 压缩的文件           |
| .gz      | 用 gizp 压缩的文件            |
| .xz      | 用 xz 压缩的文件              |
| .tar     | 用 tar 打包的文件             |
| .tbz     | tar 打包时用 bizp2 压缩的文件 |
| .tgz     | tar 打包时用 gzip 压缩的文件  |
| .zip     | 用 zip/winzip 压缩的文件      |
| .rar     | 用 rar 压缩的文件             |
| .7z      | 用 7za 压缩的文件             |

## 常用压缩与解压命令

压缩的方式有很多种，但常用的有以下几种：

### 压缩命令

| 命令               | 说明           |
| ------------------ | -------------- |
| gzip filename      | 使用 gzip 压缩 |
| bzip filename      | 使用 bzip 压缩 |
| tar -czvf filename | 使用 tar 压缩  |

### 常用解压命令

| 命令                      | 说明                 |
| ------------------------- | -------------------- |
| gzip -d filename.gz       | 解压 .gz 格式的文件  |
| bzip2 -d filename.bz2     | 解压 .bz2 格式的文件 |
| tar -xzvf filename.tar.gz | 解压 .tar 格式的文件 |

