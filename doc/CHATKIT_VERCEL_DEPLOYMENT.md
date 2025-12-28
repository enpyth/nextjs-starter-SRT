# ChatKit Vercel 部署指南

## 问题描述

ChatKit 在本地运行正常，但部署到 Vercel 后出现闪退（页面立即关闭或无法加载）的问题。

## 已修复的问题

### 1. Script 加载策略问题
**问题**：使用 `strategy="beforeInteractive"` 在 Vercel 的 SSR 环境中可能导致脚本加载失败。

**修复**：将 Script 加载策略改为 `afterInteractive`，确保脚本在页面交互后加载，更兼容 Vercel 的部署环境。

```typescript
<Script
  src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
  strategy="afterInteractive"  // 从 beforeInteractive 改为 afterInteractive
  onError={(e) => {
    console.error("Failed to load ChatKit script", e);
  }}
/>
```

### 2. 错误处理增强
添加了 Script 加载错误的回调处理，便于调试。

## Vercel 环境变量配置

在 Vercel 项目设置中配置以下环境变量：

### 必需的环境变量

1. **`NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`**
   - 描述：ChatKit 工作流 ID
   - 获取方式：从 OpenAI ChatKit 控制台获取
   - 示例：`wf_xxxxxxxxxxxxxxxxxxxx`

2. **`OPENAI_API_KEY`**（推荐）或 `NEXT_PUBLIC_OPENAI_API_KEY`
   - 描述：OpenAI API 密钥，用于创建 ChatKit 会话
   - 获取方式：从 OpenAI 控制台获取
   - **安全提示**：推荐使用 `OPENAI_API_KEY`（无 NEXT_PUBLIC 前缀），因为这是服务器端 API 路由使用的，不应该暴露给客户端

### 在 Vercel 中配置环境变量

1. 进入 Vercel 项目设置
2. 导航到 **Settings** > **Environment Variables**
3. 添加以下变量：

```
NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=your_workflow_id
OPENAI_API_KEY=your_openai_api_key
```

4. 确保为 **Production**、**Preview** 和 **Development** 环境都配置了这些变量
5. 重新部署项目

## 故障排除

### 1. 检查环境变量是否正确配置

在 Vercel 部署日志中检查环境变量是否被正确读取。如果看到以下错误，说明环境变量未配置：

```
Missing OPENAI_API_KEY environment variable
```

或

```
Set NEXT_PUBLIC_CHATKIT_WORKFLOW_ID in your .env.local file.
```

### 2. 检查浏览器控制台

打开浏览器开发者工具，查看是否有以下错误：

- **Script 加载失败**：检查网络请求，确认 `chatkit.js` 是否成功加载
- **会话创建失败**：检查 `/api/create-session` 请求是否返回错误

### 3. 检查 Vercel 函数日志

在 Vercel Dashboard 中查看函数日志，检查 API 路由 `/api/create-session` 是否有错误。

### 4. 常见错误及解决方案

#### 错误：ChatKit web component is unavailable
- **原因**：ChatKit 脚本未成功加载
- **解决**：
  1. 检查网络连接
  2. 检查是否有内容安全策略（CSP）阻止了脚本加载
  3. 检查 Vercel 的域名是否在 OpenAI 的允许列表中

#### 错误：Missing workflow id
- **原因**：`NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` 未配置或为空
- **解决**：在 Vercel 环境变量中配置正确的 Workflow ID

#### 错误：Failed to create ChatKit session
- **原因**：OpenAI API 密钥无效或配额不足
- **解决**：
  1. 验证 API 密钥是否正确
  2. 检查 OpenAI 账户是否有足够的配额
  3. 检查 API 密钥是否有 ChatKit 访问权限

## 验证部署

部署后，执行以下检查：

1. **访问页面**：访问 `/chatkit` 路由，确认页面能正常加载
2. **检查控制台**：打开浏览器开发者工具，确认没有错误
3. **测试功能**：尝试发送消息，确认 ChatKit 正常工作
4. **检查网络**：在 Network 标签中确认所有请求都成功

## 本地开发环境变量

在 `.env.local` 文件中配置：

```env
NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=your_workflow_id
OPENAI_API_KEY=your_openai_api_key
# 或者使用 NEXT_PUBLIC 前缀（不推荐用于生产环境）
# NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

## 安全最佳实践

1. **不要使用 `NEXT_PUBLIC_` 前缀的 API 密钥**：这些变量会暴露给客户端，存在安全风险
2. **使用环境变量加密**：在 Vercel 中，环境变量会自动加密存储
3. **定期轮换密钥**：定期更新 API 密钥以提高安全性
4. **限制 API 使用**：在 OpenAI 控制台中设置使用限制和配额

## 相关文件

- ChatKit 页面组件：`src/app/chatkit/page.tsx`
- ChatKit 主组件：`src/app/chatkit/app.tsx`
- ChatKit 面板组件：`src/components/chatkit/ChatKitPanel.tsx`
- API 路由：`src/app/api/create-session/route.ts`
- ChatKit 配置：`src/config/chatkit.ts`




