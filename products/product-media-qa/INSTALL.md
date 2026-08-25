# 安装与首次运行

**版本：** 1.0.0  
**适用：** Codex、WorkBuddy，以及能读取 `SKILL.md` 并访问用户授权本地文件的兼容工具。  
**不包含：** 视觉模型费用、客户素材、平台规则库、自动修图或自动发布。

本包运行时不需要安装第三方代码或提供 API Key。`node verify.mjs` 仅用于离线验证包完整性，需要本机 Node.js 18 或更高版本。媒体格式、尺寸、编码、音轨和字幕检查取决于宿主已经具备且由用户授权的本地能力；能力不足时必须返回 `not_evaluable`。

## 最小配置

1. 复制 `config.example.json` 为 `config.json`；
2. 把 `inspectionOwner`、`rightsPolicyReviewOwner`、`businessReviewOwner` 和 `releaseDecisionOwner` 四个示例值替换为实际姓名或可审计角色 ID；未全部替换时验证会失败；
3. 保留默认的只读权限：禁止修改、上传和发布资产；
4. 如团队需要不同检查项，只修改 `required_checks`，不要在配置中写入密钥、客户数据或账号；
5. 在包根目录运行 `node verify.mjs`，确认包文件、JSON、合同用语和校验和通过。

## Codex

把整个 `product-media-qa` 文件夹复制到本机 Codex Skills 目录的同名文件夹，创建上述 `config.json`，再刷新 Skills 列表。调用时提供已填写的 QA Brief、商品参考路径、候选资产文件夹和目标规格。

## WorkBuddy

使用 Skill 文件夹导入功能选择整个文件夹，并把 `config.json` 保留在同一目录；若当前版本只支持附件，把 `SKILL.md`、`CONTRACT.md`、`config.json`、`references/` 和已填写模板一起附加。文件访问与视频分析能力以当前版本为准；无法检查的属性必须标记 `not_evaluable`。

## 离线首次运行

1. 使用 `examples/synthetic-bag-batch/input.md` 作为合成任务；
2. 要求输出 Asset Inventory、Issue Log、Batch Decision 和 Delivery Manifest；
3. 确认错色、无依据文字、未提供文件与缺少商品参考被分成 `fail` 和 `not_evaluable`；
4. 确认没有实际文件时不会签发 `pass`；
5. 确认 `pass_count` 不等于 `required_asset_count` 或任一未解决计数不为0时，批次保持 `blocked`；
6. 按 `references/quality-gates.md` 由已命名的负责人复核。

## 完成安装的判定

当 `node verify.mjs` 通过、宿主能读取 `SKILL.md` 与 `config.json`、合成任务产生四个固定输出且批次正确保持 `blocked` 时，最小安装完成。卸载和回滚见 `UNINSTALL.md`，支持范围见 `SUPPORT.md`。
