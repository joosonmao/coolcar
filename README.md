# coolcar
## 如何编译及运行小程序
1. `cd wx`
2. `npm install`
3. 打开小程序开发工具，点击编译

#git 配置问题
用vscode里的git将代码更新时，总是失败，报错：
Host key verification failed！
其实可以用ssh -T git@github.com进行测试，通不过就要添加ssh密钥
1. ssh-keygen -t rsa -C joosonmao@126.com
2. 在~/.ssh下拷贝id_rsa.pub里的给github.com/joosonmao设置的ssh里
3. ssh-agent -s
4. ssh-add ~/.ssh/id_rsa(好像是将id_rsa.pub拷贝到home/joo/.ssh目录下)
5. ssh -T git@github.com
  出现
  Hi joosonmao! You've successfully authenticated, but GitHub does not provide shell access.
  OK！

#微信小程序调试工具报错
  Uncaught TypeError: Cannot delete property 'WeixinJSBridge' of #<Window>
  是调试版本需要调整到2.14.4
  报错：删除任意*.js，重新编译无法生成，且报错：node 找不到
  解决：apt install nodejs-legacy
  （仔细看出错信息）

#如何打开小程序模拟器
cd　/home/joo/wechat_web_devtools/bin
运行
./wxdt

#为何在微信开发工具里ts文件改变了，但模拟程序无法更新
进入ｖｓｃｏｄｅ，选择终端-->运行任务-->tsc:监视-tsconfig.json就可以自动生成代码

#使用getUserInfo()是不弹出授权框，获取到的用户信息不正确：nickname为“微信用户”，头像是默认灰色头像(折腾好久)
在util.ts里改为
export function getUserInfo():Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      success:resolve,
      fail:reject,
    })
  }
}
＃虽然是userInfo取出来了，但还是有个错误
Error: MiniProgramError
{"errMsg":"getUserProfile:fail can only be invoked by user TAP gesture."}

#报错：WebAssembly.Memory(): could not allocate memory
调整版本　2.14.4
但这个版本的调试不是很稳定，onLaunch无法进去

获取头像昵称基本解决，看似简单，但其中要受到用户权限的影线以及网络消息异步传输的影响，这中间要处理的问题非常的多。

#要用语法糖，要在设置里设置增强编译

#当添加扫码租车按钮时，样式渲染效果总是没有，发现要导入第三方的东西colorui文件夹，因为里面有btn-container bg-grey round这些类的css设置

#总是有一个错误
[渲染层错误] 个性化样式 style-1 并未找到，已自动启用默认样式！(env: Windows,mp,1.06.2204082; lib: 2.23.3) 不管他