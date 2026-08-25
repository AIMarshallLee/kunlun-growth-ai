# 1.0.0 离线测试报告

**日期：** 2026-08-26  
**包：** `product-media-qa`  
**版本：** `1.0.0`  
**环境：** Windows，Node.js `24.15.0`

## 本次源包验证

| 检查 | 结果 | 证据 |
|---|---|---|
| 本次授权创建的文本/JSON根文件与测试数据存在 | PASS | 源目录必需文件扫描；统一发布文件另列于下方 |
| `config.example.json`、`manifest.json`、`tests/contract-cases.json` 可解析 | PASS | Node.js JSON 解析 |
| 版本、四态、六级证据、三类必要审批和严格发布公式一致 | PASS | 跨文件合同不变量检查 |
| 具名审核、owner、修复/补件与复测字段存在 | PASS | 四个模板与 `CONTRACT.md` |
| 未授权修改、删除、覆盖、上传、发布、替换均被禁止 | PASS | `SKILL.md`、配置和合同 |
| 公开文字示例不含客户身份、账号或密钥 | PASS | `examples/` 与 `tests/contract-cases.json` 人工复核 |
| 合成 PNG 签名与尺寸 | PASS | `tests/fixtures/hero.png`，PNG，64 × 64 |
| 合成 MP4 媒体元数据 | PASS | `tests/fixtures/clip.mp4`，1.0秒，64 × 64，H.264 视频与 AAC 音频 |
| 合成 SRT 时间轴 | PASS | `tests/fixtures/clip.srt`，2条字幕，覆盖0.0–1.0秒 |

合同案例数：5；期望 `release_ready`：1；期望 `blocked`：4。案例覆盖缺实际文件、已证实缺陷、待人工审核、全部通过与未授权外部动作。

## 历史行为证据

`examples/offline-validation.md` 记录了0.9阶段的三个基线和三个前向描述场景。这些证据保留用于回归背景，但不计作1.0.0的实际媒体自动测试，也不证明真实客户使用。

## 包内自动验证

`node verify.mjs` 已通过：校验29个包内文件、5个合同案例；由实际 Asset results 重算全部计数，强制未解决项记录 owner/fix/retest，强制 `pass` 使用 `actual_file` 并具备授权参考、目标规格与全部门槛通过记录，逐一核验 `inspection_owner`、`rights_or_policy_reviewer`、`business_reviewer` 三类批准；同时读取 `expected-metadata.json` 并实际解析 PNG 签名/尺寸/颜色类型/动画状态、MP4 容器/H.264/AAC/64×64/1秒/25fps/单音频流和 SRT UTF-8/2条字幕/首尾时间。`CHECKSUMS.sha256` 已覆盖除自身和本地 `config.json` 外的全部发布文件；篡改发布文件会以非零退出。

ZIP 文件大小、ZIP SHA-256、归档与源目录逐文件一致性和网站生产构建结果由外部统一发布审计记录，避免在包内形成自引用哈希。Codex、WorkBuddy 或其他宿主的文件导入入口可能随版本变化；这属于安装支持事项，不改变本包无自动联网、无自动发布的合同。

## 结论与限制

源包合同、合成实际文件夹具和包内自动验证均已通过，可以进入统一 ZIP 发布门禁。没有随包提供的可验证真实客户数、付费转化、复购、退款、客单价或平台通过率；不得据此宣称市场成熟或商业效果。
