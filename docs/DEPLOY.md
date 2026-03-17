# 🚀 Cloudflare Pages 完整部署教程

> 本教程从零开始，手把手教你如何将 Q:XS 项目部署到 Cloudflare Pages。
> 即使你从未用过 Cloudflare，也能跟着本教程完成部署。

---

## 目录

1. [前置准备](#1-前置准备)
2. [注册 Cloudflare 账户](#2-注册-cloudflare-账户)
3. [将代码推送到 GitHub](#3-将代码推送到-github)
4. [方法一：Cloudflare Dashboard 直连部署（最简单）](#4-方法一cloudflare-dashboard-直连部署最简单)
5. [方法二：GitHub Actions 自动化部署（推荐）](#5-方法二github-actions-自动化部署推荐)
6. [绑定自定义域名（可选）](#6-绑定自定义域名可选)
7. [日常更新流程](#7-日常更新流程)
8. [常见问题排查](#8-常见问题排查)

---

## 1. 前置准备

在开始之前，请确认你已经安装了以下工具：

```bash
# 检查 Node.js 版本（需要 20+）
node --version
# 输出示例: v20.x.x

# 检查 npm
npm --version

# 检查 Git
git --version
```

如果没有安装：
- **Node.js**: 前往 https://nodejs.org/ 下载 LTS 版本
- **Git**: 前往 https://git-scm.com/ 下载

---

## 2. 注册 Cloudflare 账户

### Step 2.1: 创建账户

1. 打开浏览器，访问 👉 **https://dash.cloudflare.com/sign-up**
2. 输入你的 **邮箱地址** 和 **密码**
3. 点击 **Create Account（创建账户）**
4. 进入邮箱，找到 Cloudflare 发来的验证邮件，点击验证链接

> 💡 **提示**: Cloudflare Pages 的免费套餐非常慷慨（每月 500 次构建、无限制请求、无限带宽），个人项目完全够用。

### Step 2.2: 首次登录

1. 登录后，你会看到 Cloudflare Dashboard 主页
2. 左侧菜单栏找到 **「Workers & Pages」** 并点击
3. 这就是我们后续部署项目的地方

---

## 3. 将代码推送到 GitHub

### Step 3.1: 在 GitHub 创建仓库

1. 登录你的 GitHub 账户，访问 👉 **https://github.com/new**
2. 填写以下信息：
   - **Repository name（仓库名）**: `my-web-q-xs`（或你喜欢的名字）
   - **Description（描述）**: `Web3 Geek Intelligence Hub`（可选）
   - **Visibility**: 选择 **Public**（公开）或 **Private**（私有）皆可
   - ⚠️ **不要勾选** "Add a README file"（因为我们已有代码）
3. 点击 **Create repository（创建仓库）**

### Step 3.2: 初始化本地 Git 并推送

创建仓库后，GitHub 会显示一些提示命令。在你的终端中执行：

```bash
# 1. 进入项目目录
cd /Users/aonkun/Documents/my-web-q-xs

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件到暂存区
git add .

# 4. 创建第一个提交
git commit -m "feat: initial commit - Web3 Geek Portal"

# 5. 将默认分支重命名为 main
git branch -M main

# 6. 添加你的 GitHub 仓库作为远程仓库
#    ⚠️ 请把下面的 <你的GitHub用户名> 替换成你的实际用户名
git remote add origin https://github.com/<你的GitHub用户名>/my-web-q-xs.git

# 7. 推送代码到 GitHub
git push -u origin main
```

> ⚠️ **首次推送可能需要认证**:
> - 如果提示输入用户名密码，GitHub 已不再支持密码，你需要使用 **Personal Access Token (PAT)**
> - 获取方式：GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
> - 勾选 `repo` 权限，生成后复制 Token，在密码提示处粘贴即可
> - 或者使用 SSH 方式：`git remote add origin git@github.com:<用户名>/my-web-q-xs.git`

### Step 3.3: 验证推送成功

回到 GitHub 仓库页面（`https://github.com/<用户名>/my-web-q-xs`），你应该能看到所有项目文件。

---

## 4. 方法一：Cloudflare Dashboard 直连部署（最简单）

> 这是最简单的方式——让 Cloudflare 自动监听你的 GitHub 仓库，每次推送代码都会自动重新构建和部署。

### Step 4.1: 进入 Pages 页面

1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com/
2. 左侧菜单点击 **「Workers & Pages」**
3. 点击右上角蓝色按钮 **「Create」**
4. 在弹出页面中，选择 **「Pages」** 标签页
5. 点击 **「Connect to Git」**

### Step 4.2: 连接 GitHub

1. 首次使用需要授权——点击 **「Connect GitHub」**
2. 浏览器会跳转到 GitHub 授权页面
3. 选择要授权的 GitHub 账户
4. 在 **Repository access** 中选择：
   - **All repositories** — 授权所有仓库（方便但权限较大）
   - **Only select repositories** — 只选择 `my-web-q-xs` 仓库（推荐）
5. 点击 **「Install & Authorize」**

### Step 4.3: 选择仓库

1. 授权成功后，回到 Cloudflare 页面
2. 在仓库列表中找到 **`my-web-q-xs`**
3. 点击选中它
4. 点击 **「Begin setup」**

### Step 4.4: 配置构建设置

在构建配置页面，填写以下信息：

| 配置项 | 填写内容 |
|--------|---------|
| **Project name** | `my-web-q-xs` （这将成为你的域名前缀：`my-web-q-xs.pages.dev`） |
| **Production branch** | `main` |
| **Framework preset** | 点击下拉菜单，选择 **`Astro`** |
| **Build command** | 自动填充为 `npm run build` ✅ 无需修改 |
| **Build output directory** | 自动填充为 `dist` ✅ 无需修改 |

### Step 4.5: 设置环境变量（重要）

在配置页面下方，找到 **「Environment variables (advanced)」** 并展开：

点击 **「Add variable」** 并添加：

| Variable name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |

> 💡 这确保 Cloudflare 使用 Node.js 20 来构建项目，避免版本不兼容问题。

### Step 4.6: 开始部署

1. 确认所有配置无误
2. 点击 **「Save and Deploy」**
3. Cloudflare 会开始构建你的项目——你可以实时查看构建日志
4. 构建过程大约需要 **1-3 分钟**
5. 看到 **「Success」** 表示部署成功！🎉

### Step 4.7: 访问你的网站

部署成功后，你可以通过以下地址访问：

```
https://my-web-q-xs.pages.dev
```

> 如果你在 Step 4.4 自定义了 Project name，则域名为 `https://<你的项目名>.pages.dev`

**✅ 恭喜！你的网站已经上线了！**

从现在开始，每次你 `git push` 到 `main` 分支，Cloudflare 都会自动重新构建和部署。

---

## 5. 方法二：GitHub Actions 自动化部署（推荐）

> 这种方式让你完全掌控构建过程——在 GitHub 的 CI/CD 环境中构建，然后推送产物到 Cloudflare。
> 适合需要自定义构建步骤（如测试、代码检查）的场景。

> ⚠️ 如果你已经用方法一部署成功，可以跳过此部分。两种方法选一种即可。

### Step 5.1: 获取 Cloudflare API Token

1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com/
2. 点击右上角你的 **头像/图标**
3. 选择 **「My Profile」（个人资料）**
4. 在左侧菜单点击 **「API Tokens」**
5. 点击 **「Create Token」** 按钮
6. 在模板列表中，**不要选择快速模板**，而是点击最下面的 **「Create Custom Token」**
7. 配置如下：

| 配置项 | 填写内容 |
|--------|---------|
| **Token name** | `GitHub Actions Deploy` |
| **Permissions** | Account → Cloudflare Pages → **Edit** |
| **Account Resources** | Include → 选择你的账户 |

8. 点击 **「Continue to summary」**
9. 点击 **「Create Token」**
10. 🔑 **复制显示的 Token 值**

> ⚠️ **非常重要**：这个 Token 只显示一次！请立即复制保存。如果忘记了，只能删除重建。

### Step 5.2: 获取 Cloudflare Account ID

1. 回到 Cloudflare Dashboard 首页
2. 在右侧边栏（或页面上方），找到 **「Account ID」**
3. 它是一串32位的十六进制字符串，例如：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
4. **复制这个 ID**

> 💡 如果在首页找不到，也可以随便点进一个域名，在 **Overview（概览）** 页的右侧栏可以看到。

### Step 5.3: 在 Cloudflare 创建 Pages 项目

在使用 GitHub Actions 之前，需要先在 Cloudflare 上创建一个空的 Pages 项目：

```bash
# 在终端中执行（确保已安装 npm）
npx wrangler pages project create my-web-q-xs --production-branch=main
```

如果提示登录，会自动在浏览器中打开 Cloudflare 登录页面，授权即可。

> 或者，你也可以在 Cloudflare Dashboard 中手动创建：
> Workers & Pages → Create → Pages → Direct Upload → 填写项目名 `my-web-q-xs` → Create project

### Step 5.4: 在 GitHub 仓库设置 Secrets

1. 进入你的 GitHub 仓库页面（`https://github.com/<用户名>/my-web-q-xs`）
2. 点击顶部标签栏的 **「Settings」**（⚙️ 图标）
3. 在左侧菜单中，找到 **「Secrets and variables」** → 点击 **「Actions」**
4. 点击绿色按钮 **「New repository secret」**

添加第一个 Secret：

| 字段 | 填写内容 |
|------|---------|
| **Name** | `CLOUDFLARE_API_TOKEN` |
| **Secret** | 粘贴你在 Step 5.1 获取的 API Token |

点击 **「Add secret」**。

然后再次点击 **「New repository secret」**，添加第二个：

| 字段 | 填写内容 |
|------|---------|
| **Name** | `CLOUDFLARE_ACCOUNT_ID` |
| **Secret** | 粘贴你在 Step 5.2 获取的 Account ID |

点击 **「Add secret」**。

### Step 5.5: 推送代码触发部署

项目中已经包含了 GitHub Actions 工作流文件 `.github/workflows/deploy.yml`，所以你只需要推送代码：

```bash
cd /Users/aonkun/Documents/my-web-q-xs

# 如果你之前做了方法一的部署，建议先在 Cloudflare 删除那个项目
# 避免重复

git add .
git commit -m "deploy: trigger GitHub Actions deployment"
git push origin main
```

### Step 5.6: 查看部署状态

1. 在 GitHub 仓库页面，点击顶部标签栏的 **「Actions」**
2. 你会看到一个正在运行的 workflow：**"Deploy to Cloudflare Pages"**
3. 点击进去可以查看详细日志
4. 所有步骤都变成绿色 ✅ 就表示部署成功
5. 在日志最后，你会看到部署的 URL

### Step 5.7: 验证

打开浏览器访问：

```
https://my-web-q-xs.pages.dev
```

看到你的 Q:XS 暗黑主题首页就说明部署成功了！🎉

---

## 6. 绑定自定义域名（可选）

如果你有自己的域名（例如 `yourdomain.com`），可以绑定到 Cloudflare Pages。

### Step 6.1: 添加自定义域名

1. 进入 Cloudflare Dashboard → **Workers & Pages**
2. 点击你的 **`my-web-q-xs`** 项目
3. 点击顶部的 **「Custom domains」** 标签
4. 点击 **「Set up a custom domain」**
5. 输入你的域名，例如：`hub.yourdomain.com`
6. 点击 **「Continue」**

### Step 6.2: 配置 DNS

Cloudflare 会提示你添加一条 DNS 记录：

| 记录类型 | 名称 | 目标值 |
|---------|------|--------|
| **CNAME** | `hub`（或你选的子域名） | `my-web-q-xs.pages.dev` |

**如果你的域名已经在 Cloudflare 管理**：DNS 记录会自动添加。

**如果你的域名在其他注册商**：
1. 登录你的域名注册商控制面板
2. 进入 DNS 管理
3. 添加上面的 CNAME 记录
4. 等待 DNS 生效（通常 5 分钟 - 48 小时）

### Step 6.3: 等待 SSL 证书

Cloudflare 会自动为你的自定义域名申请和部署 SSL 证书。这个过程通常在几分钟内完成。完成后，你就可以通过 `https://hub.yourdomain.com` 访问了。

---

## 7. 日常更新流程

### 发布新博客文章

```bash
# 1. 在 src/content/blog/ 下创建新的 Markdown 文件
cat > src/content/blog/my-new-post.md << 'EOF'
---
title: "我的新文章标题"
date: 2026-03-17
description: "文章的简要描述"
author: "作者名"
tags: ["标签1", "标签2"]
---

## 正文标题

这里是文章正文内容...
EOF

# 2. 提交并推送
git add .
git commit -m "blog: add new post"
git push origin main

# 3. 等待 1-3 分钟，Cloudflare 自动构建并部署
# 4. 刷新网站即可看到新文章
```

### 发布新研究报告

```bash
# 1. 在 src/content/reports/ 下创建
cat > src/content/reports/my-new-report.md << 'EOF'
---
title: "报告标题"
date: 2026-03-17
summary: "报告摘要"
category: "Market Analysis"
author: "Q:XS Research"
---

## 报告正文

研究内容...
EOF

# 2. 推送
git add .
git commit -m "report: add new analysis"
git push origin main
```

### 修改网站代码

修改任何 `.astro`、`.css`、`.ts` 文件后，同样只需 `git push` 即可自动部署。

---

## 8. 常见问题排查

### Q: 构建失败怎么办？

**检查构建日志**：
- **方法一**：Cloudflare Dashboard → Workers & Pages → 项目 → 点击最近的部署 → 查看日志
- **方法二**：GitHub → Actions → 点击失败的 workflow → 查看日志

**常见错误及解决**：

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `Cannot find module` | 依赖未安装 | 确保 `package-lock.json` 已提交到 Git |
| `Node.js version` 相关 | Node 版本太低 | 添加环境变量 `NODE_VERSION=20` |
| `Build output directory not found` | 构建输出目录不对 | 确认 Build output directory 设为 `dist` |
| `Error: CLOUDFLARE_API_TOKEN` | Secret 没设置 | 按 Step 5.4 重新设置 Secrets |

### Q: 部署成功但页面空白？

1. 按 `F12` 打开浏览器开发者工具
2. 查看 **Console（控制台）** 是否有 JavaScript 错误
3. 查看 **Network（网络）** 标签页是否有 404 请求
4. 尝试清除缓存：Cloudflare Dashboard → Caching → Configuration → Purge Everything

### Q: 加密货币价格没有显示？

1. CoinGecko API 有频率限制（免费版约 30 次/分钟），等待一会再刷新
2. 如果在中国大陆，CoinGecko 可能被墙，需要网络环境支持
3. 检查浏览器控制台是否有 CORS 或网络错误

### Q: 鼠标光晕效果看不到？

1. 光晕效果在触屏设备上不显示（需要鼠标移动事件）
2. 效果比较微妙——在深色背景上缓慢移动鼠标能更明显地看到
3. 如果完全看不到，检查浏览器控制台是否有 JS 错误

### Q: 如何删除已部署的项目？

1. Cloudflare Dashboard → Workers & Pages
2. 在项目列表中找到你的项目
3. 点击项目 → Settings → 滚到最底部 → **Delete project**
4. 输入项目名确认删除

### Q: 如何回滚到之前的版本？

1. Cloudflare Dashboard → Workers & Pages → 项目
2. 点击 **「Deployments」** 标签
3. 找到你想回滚到的版本
4. 点击该版本右侧的 **「⋮」（三个点）** → **「Rollback to this deployment」**

---

> 🎉 **部署完成！** 现在你的 Web3 Geek Portal 已经运行在 Cloudflare 全球边缘网络上了。
> 如果遇到其他问题，可以查阅 Cloudflare 官方文档：https://developers.cloudflare.com/pages/
