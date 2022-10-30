# 断点

## 什么是断点

+ 将客户端发送给服务端的请求或服务端返回给客户端的响应暂停住
+ 可以对请求或响应进行数据修改，再放行该请求或响应

## 断点的功能原理

+ 开启 fiddler 后，客户端与服务端的交互都会经过 fiddler
+ 发给服务端或返回给客户端的数据能被截取到，进行篡改

![fiddler](./images/breakpoints.png)

## 全局断点

+ 请求前断点

  设置全局请求前断点，会将所有经过 fiddler 的接口在发送请求到 fiddler 的时候，fiddler 会暂停向服务器发送请求，此时，可以篡改接口的请求数据。

  全局请求前断点设置，在 Rules-Automatic Breakpoints 中选择 Before Resquests 如下：

  ![before](./images/before.png)

  或者直接在状态栏，点击一下，待出现下面的图标，即表示开启全局请求前断点，在点击 2 下，表示取消断点：

  ![before](./images/before1.png)

  设置成功后，可以对请求的接口进行数据的修改，如：

  ![before](./images/before2.png)

  此时可以修改提交的数据，然后点击绿色的 Run to Completion 后，fiddler 将该请求发送至服务器，获取服务器返回的数据

+ 请求后断点

  设置全局请求后断点，fiddler 会接受所有接口返回的数据，此时不会直接返给前端，可以修改返回的数据。

  全局请求后断点设置，在 Rules-Automatic Breakpoints 中选择 after Resquests 如图：

  ![after](./images/after.png)

  或者直接在状态栏，点击两下，待出现下面的图标，即表示开启全局请求前断点，在点击 1 下，表示取消断点：

  ![after](./images/after1.png)

  设置成功后，可以对请求的接口进行数据的修改，有以下两种方式：

  + 在左边的 list 界面中，点击响应后断点的接口，右边选择 response 中的 raw，修改返回数据后，点击 Run to Completion 即可将返回的数据返回给前端

    ![after](./images/after2.png)

  + 点击 choose response ，选择想要返回的内容：

    ![after](./images/after3.png)

    然后在点击 Run to Completion ，就会把上述中设置的返回值返回给前端

## 局部断点

局部断点是在局部的接口上进行断点，只是与全局断点的设置方式不一致，其余的数据操作部分可参考上面的全局断点部分

+ 局部请求前断点

  在状态面板中输入：bpu token(url 中包含的值) 或者 bpu 完整url

  输入：bpu 即可取消断点

+ 局部请求后断点

  在状态面板中输入：bpafter token(url 中包含的值) 或者 bpafter 完整url

  输入：bpafter 即可取消断点

## 断点的作用

+ 模拟网络中断
+ mock 数据
+ 可以测试一些极端的测试