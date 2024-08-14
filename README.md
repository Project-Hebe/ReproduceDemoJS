# Reproduce Demo

## 中文

### 问题

我们目前面临的问题是：

我们的服务端存在严重的并发问题。延迟问题。代码执行错误问题。

### 模拟

这个 demo 用于模拟模拟用户在 app 端的操作

你可以通过下面的三种不同的方式执行这段代码，建议使用 `vscode run and debug` 模式

- `node ./index.js`
- `yarn start`
- vscode run and debug

index.js 中的代码的执行逻辑如下：

1. 模拟登录请求拿到 `access_token`
2. 每两秒模拟一次用户进入某个视频播放页面的动作（`enterVideoPage`）
3. 在视频播放页面模拟执行 7 个请求，分别为：
   - 加载字幕
   - 加载翻译
   - 加载测试题权重
   - 加载测试题类型 0
   - 加载测试题类型 1
   - 加载测试题类型 2
   - 加载测试题类型 3

## English

### Problem

The issues we are currently facing are:

- Our server side has serious concurrency problems.
- Latency issues.
- Code execution error problems.

### Simulation

This demo is used to simulate user operations on the app side.

You can execute this piece of code in three different ways, it is recommended to use the `vscode run and debug` mode:

- `node ./index.js`
- `yarn start`
- vscode run and debug

The execution logic of the code in index.js is as follows:

1. Simulate a login request to obtain the `access_token`.
2. Simulate a user entering a video playback page every two seconds (`enterVideoPage`).
3. On the video playback page, simulate the execution of 7 requests, which are:
   - Load subtitles.
   - Load translations.
   - Load quiz weights.
   - Load quiz type 0.
   - Load quiz type 1.
   - Load quiz type 2.
   - Load quiz type 3.
