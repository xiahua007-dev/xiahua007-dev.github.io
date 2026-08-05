# Xiahua personal homepage

一个使用 React + Vite 构建、通过 GitHub Actions 发布到 GitHub Pages 的个人主页。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布网站。

## 访问统计

站点支持免费的 [GoatCounter](https://www.goatcounter.com/) 访问统计。未配置时不会加载统计脚本。

1. 注册 GoatCounter，并创建一个站点，记下站点代码（例如访问地址为 `https://xiahua.goatcounter.com`，代码就是 `xiahua`）。
2. 在 GitHub 仓库的 `Settings` → `Secrets and variables` → `Actions` → `Secrets` 中新增仓库 Secret `GOATCOUNTER_CODE`，值填写站点代码。
3. 重新运行 GitHub Pages 工作流，或推送一次 `main` 分支。

部署后可在 `https://<站点代码>.goatcounter.com` 查看访问量、访问来源、页面和设备等信息。本地调试时可在 `.env.local` 中设置 `VITE_GOATCOUNTER_CODE=<站点代码>`。
