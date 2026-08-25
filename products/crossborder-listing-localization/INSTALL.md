# 安装与首次运行

**版本：** 1.0.0  
**适用：** Codex、WorkBuddy，以及能读取完整 Skill 文件夹的兼容工具。  
**运行依赖：** 无第三方运行依赖；离线合同流程不需要模型 API、账号或网络访问。

## 1. 检查交付包

保留整个 `crossborder-listing-localization` 文件夹，不要只复制 `SKILL.md`。正式交付包应包含 `manifest.json` 列出的根文件和非空内容目录。

在安装前从产品根目录运行：

```text
node verify.mjs
```

退出码不是 0 时停止安装，通过 `SUPPORT.md` 的入口报告版本和不含敏感信息的错误。

## 2. 安装到宿主

### Codex

把整个文件夹复制到当前 Codex 配置所使用的 Skills 目录，保持文件夹名为 `crossborder-listing-localization`，然后刷新 Skills 列表。Skills 目录位置以当前 Codex 官方说明和本机配置为准。

### WorkBuddy

在 Skill 导入或本地 Skill 管理入口选择整个文件夹。具体入口和文件访问能力以当前 WorkBuddy 版本说明为准。

### 其他兼容宿主

确认宿主会同时提供 `SKILL.md`、`CONTRACT.md`、配置、模板和引用文件。未测试宿主不作兼容承诺。

## 3. 最小配置

把 `config.example.json` 复制为同目录的 `config.json`。保持固定枚举不变，只按业务需要修改默认源市场、目标市场、目标语言和目标渠道，并把三个审核角色映射到实际负责人的可审计身份。

配置不得包含 API Key、密码、支付信息、客户个人信息或商品原始资料。JSON 无法解析或必需配置无效时，合同要求返回 `invalid_config` 和 `not_ready`。

## 4. 离线首次运行

1. 打开 `examples/synthetic-travel-organizer/input.md`；
2. 要求宿主使用 `crossborder-listing-localization`，并严格按 `CONTRACT.md` 返回六项固定输出；
3. 与 `examples/synthetic-travel-organizer/expected-output.md` 比较；
4. 确认未证实的尺寸、容量、数量、防水、轻便、场景和同义品类均未进入草稿；
5. 确认 Manifest 为 `not_ready`，并记录具名审核责任和下一份证据；
6. 再次运行 `node verify.mjs`。

## 5. 业务首次运行

复制 `templates/localization-brief.md`，逐项填写当前 SKU 的事实、来源、证据等级和适用变体。把客户资料保存在产品文件夹之外的受控工作目录。使用前阅读 `CONTRACT.md`、`references/claim-policy.md` 和 `references/quality-gates.md`。

缺少来源、审核决定、渠道当前规则或宿主能力时，保持 `not_ready`；不要通过补写常见属性来完成五点或候选稿。

## 6. 更新、卸载与回滚

更新前备份用户创建的 `config.json` 和产品文件夹之外的工作文件。不要把旧配置直接覆盖到新版本；应与新版本的 `config.example.json` 逐项比较。卸载和回滚步骤见 `UNINSTALL.md`。

支持范围和入口见 `SUPPORT.md`。
