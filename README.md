# 🌟某星签到(网页版)

<a href="https://www.npmjs.com/package/nuxt/v/rc"><img alt="size" src="https://img.shields.io/github/package-json/dependency-version/kuizuo/chaoxing-sign/dev/nuxt?style=flat&colorA=002438&colorB=28CF8D"></a> <a href="https://github.com/kuizuo/chaoxing-sign/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/kuizuo/chaoxing-sign/ci.yml?style=flat&colorA=002438&colorB=28CF8D"></a>  <a href="https://github.com/kuizuo/chaoxing-sign/tree/HEAD/LICENSED"><img alt="License" src="https://img.shields.io/github/license/kuizuo/chaoxing-sign?style=flat&colorA=002438&colorB=28CF8D" /></a>

在这里你可以在摆脱客户端繁琐的签到流程，让签到不再是你的烦恼。

## ✨功能

- [x] 普通签到
- [x] 拍照签到
- [x] 位置签到
- [x] 手势签到
- [x] 签到码签到
- [x] 二维码签到
- [x] 监听签到任务,自动完成
- [x] 支持多用户批量签到

[更多帮助](./content/help.md)

## 🛠 运行

```shell
git clone https://github.com/kuizuo/chaoxing-sign.git
cd chaoxing-sign
pnpm install
```

你需要一个 PostgreSQL 数据库地址（用于存储账号信息以及自动监控签到），然后将项目根目录下 `.env.example` 文件更改成 `.env` 并替换 `DATABASE_URL` 为数据库地址(通常是远程地址)。运行如下命令用于同步数据库：

```shell
npx prisma db push
```

```shell
pnpm run dev
```

打包

```shell
pnpm run build
pnpm run preview
```

## 部署

### PM2 + Nginx (推荐)

本项目已经编写好了 `ecosystem.config.js` 文件，具体请根据实际情况修改环境变量，你可以直接使用 PM2 来启动项目。

```shell
npm run start:pm2
```

此时已经启动好了本地端口为 `8050` 的服务，要注意，如果你使用了 Nginx 的反向代理，那么你需要将 `AUTH_ORIGIN` 环境变量设置为你的域名，否则将无法正常使用。并在 Nginx 中添加如下配置：

```nginx
    location / {
      proxy_pass http://127.0.0.1:8050;
    }
```

此外可能还需要配置 SSL 证书，因为要调用摄像头权限就必须是在安全环境下（即https下），否则你将无法使用扫一扫功能，这也是无奈之举。

### Docker

本项目已经编写好了 docker 相关文件，你可以直接使用 Docker 来启动项目。

> ⚠️ 注意: 需要将 node_modules 复制到镜像内, 因为 prisma client 产物存在 node_modules 内.

如果你有自己的 postgresql (远程)数据库，那么你需要在 Dockerfile 中修改 `DATABASE_URL` 环境变量为你的数据库地址，执行下方命令即可构建镜像。

```shell
docker buildx build . -t chaoxing-sign:latest
```

### Vercel or Netlify（不推荐）

由于采用 Nuxt.js 框架，所以非常容易部署在 Vercel 或 Netlify 等平台上，但还是不推荐部署，理由如下：

Vercel 或 Netlify 的服务器设立在国外，用户需要通过一些特殊手段能够访问，并且由于某星的服务器设立在国内，数据请求需要多一道障碍来访问，将导致响应速度过慢，网站体验效果极其不佳，已亲测，因此不推荐使用（无奈之举）。

## 🤝 免责声明

本项目仅作为个人技术专研，仅供学习参考。不得用于商业用途。

## 📝 License

MIT License © 2023-PRESENT Kuizuo