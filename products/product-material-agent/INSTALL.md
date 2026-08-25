# 安装与首次运行

**版本：** 1.0.0  
**适用：** Codex、WorkBuddy，以及能读取 `SKILL.md` 的兼容工具。  
**本包不包含模型服务、API Key、客户数据或自动发布功能；默认不联网。**

## 1. 解压并检查

解压后确认根目录包含 `SKILL.md`、`README.md`、`CONTRACT.md`、`config.example.json`、`manifest.json`、`references/`、`templates/`、`examples/` 和 `tests/`。正式发布包还应包含 `CHECKSUMS.sha256` 与 `verify.mjs`。不要把环境变量文件、聊天导出、客户原图或任何密钥放入要分享的文件夹。

在包根目录执行完整性检查：

```text
node verify.mjs
```

只有出现 `PASS` 才继续安装。

## 2. 在 Codex 中安装

把整个 `product-material-agent` 文件夹复制到本机 Codex Skills 目录：

```text
<你的 Codex 配置目录>/skills/product-material-agent/
```

重启或刷新 Codex 的 Skills 列表。开始新任务时，说明“使用 product-material-agent”，并提供完成的产品事实表和已授权源图路径。

## 3. 在 WorkBuddy 中使用

在 WorkBuddy 的 Skill 导入或本地 Skill 目录中选择整个 `product-material-agent` 文件夹（不要只选择 `SKILL.md`）。如果你的版本不支持文件夹导入，请把 `SKILL.md` 与 `references/` 一起附加到任务，并先用 `templates/product-brief.md` 整理输入。

不同版本的 WorkBuddy 的导入入口可能不同；本包不声称替代其官方安装说明。

## 4. 配置

把 `config.example.json` 复制为 `config.json`。保留 `evidenceMode: "strict"`，把 `reviewers` 中的职责改成实际负责人的姓名或可审计角色 ID。默认配置不需要 API Key、不开启联网、上传、发布或付费调用。

`config.json` 只存工作流选项和审核责任，不存凭证、客户事实或资产内容。

## 5. 无模型的首次运行

1. 复制 `templates/product-brief.md`，填写已确认的商品事实和资产路径；未知字段保留 `unknown`。
2. 请求 Agent 生成：英文 Listing 草稿、五张图片的镜头计划、六秒视频分镜和交付 Manifest。
3. 明确告知当前没有生成服务，要求它只输出计划和文本，不生成或伪造图片/视频。
4. 按 `references/quality-gates.md` 人工检查卖点、颜色、变体、尺寸和缺口。

## 6. 使用生成服务时

先向负责人确认所用服务、预算、资产授权范围和是否允许生成。密钥只在用户自己的安全运行环境中配置，不能写入本包或交付物。生成后仍需按照质量门槛检查身份、文字、水印、画面缺陷、文件格式和各市场的说法。

## 7. 卸载与回滚

按 `UNINSTALL.md` 操作。卸载只删除本 Skill 文件夹及用户自行复制的配置，不触碰客户输入或输出。回滚前先备份配置与工作文件，再安装上一份已交付版本。
