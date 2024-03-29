# 提高 GUI 测试稳定性

**GUI 不稳定因素**：

+ 非预计的弹出对话框
+ 页面控件属性的细微变化
+ 被测系统的 A/B 测试
+ 随机的页面延迟造成控件识别失败
+ 测试数据问题

## 不稳定解决思路

### 非预计的弹出对话框

**包含场景**：

+ GUI 自动化测试用例执行过程中，操作系统弹出的非预计对话框
+ 被测软件本身也有可能在非预期的时间弹出预期的对话框

**解决方案**：

+ 当自动化脚本发现控件无法正常定位，或者无法操作时，GUI 自动化框架自动进入“异常场景恢复模式”
+ 在“异常场景恢复模式”下，GUI 自动化框架依次检查各种可能出现的对话框，一旦确认了对话框的类型，立即执行预定义的操作（比如，单击“确定”按钮，关闭这个对话框），接着重试刚才失败的步骤

**局限性**：只能处理已知可能出现的对话框。而对于新类型的对话框，只能通过自动化的方式尝试点击上面的按钮进行处理 

### 页面控件属性的细微变化

例：“登录”按钮的 ID 从 “Button_Login_001” 变成了 “Button_Login_888”，还是按照原来 “Button_Login_001” 来定位“登录”按钮，就会因为 ID 值的变化，定位不到它 

**定位控件思路**：

+ 通过控件类型（Button）缩小了范围
+ 通过属性值中的关键字（Login）进一步缩小范围
+ 根据属性值变化前后的相似性，最终定位到该控件

**结论**：采用“组合属性”定位控件会更精准，而且成功率会更高，如果能在此基础上加入“模糊匹配”技术，可以进一步提高控件的识别率 

### 被测系统的 A/B 测试

概念：
+ A/B 测试，是互联网产品常用的一种测试方法
+ 为 Web 或 App 的界面或流程提供两个不同的版本，然后让用户随机访问其中一个版本，并收集两个版本的用户体验数据和业务数据，最后分析评估出最好的版本用于正式发布 

**造成 GUI 不稳定原因**：A/B 测试通常会发布到实际生产环境 

**解决思路**：在测试脚本内部对不同的被测版本做分支处理，脚本需要能够区分 A 和 B 两个的不同版本，并做出相应的处理 

### 随机的页面延迟造成控件识别失败

**解决方案**：加入重试（retry）机制 

重试机制：当某一步 GUI 操作失败时，框架会自动发起重试, 重试可以是步骤级别的，也可以是页面级别的，甚至是业务流程级别的 

**注意**：对于那些会修改一次性使用数据的场景，切忌不要盲目启用页面级别和业务流程级别的重试 

### 测试数据问题

比如：测试用例所依赖的数据被其他用例修改了 



