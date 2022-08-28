# pytest-html

用于生成 html 测试报告

## 前提

Python >=3.6 或 PyPy3

## 安装 pytest-html

两种安装方式:
+ 使用 pip 安装
```python
 pip install pytest-html
```
+ 从源安装
```python
 pip install -e .
```

## 生成报告

在当前目录下创建报告
```python
pytest --html=report.html

```

### 合并CSS

上面命令生成的报告，css 和图像是分开的，分享报告的时候样式会丢失，为了更好的分享发邮件展示报告，可以把 css 样式合并到 html 里  
```python
pytest --html=report.html --self-contained-html
```
::: tip 注意事项
+ 在将文件或链接添加到独立报告时，插件会发出 warnings
+ 在 html 测试报告中可能无法按预期显示文件或链接
:::

## 参考文档
[github](https://github.com/pytest-dev/pytest-html)

[官方文档-pytest-html](https://pytest-html.readthedocs.io/en/latest/installing.html)

（完）