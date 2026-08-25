# 1.0.0 发布检查清单

## 包结构

- [x] ZIP 名称包含产品 slug 和 `1.0.0`；
- [x] 根目录包含 `SKILL.md`、`README.md`、`INSTALL.md`、`UNINSTALL.md`、`CHANGELOG.md`、`LICENSE.md`、`NOTICE.md`、`SUPPORT.md`、`CONTRACT.md`、`RELEASE-CHECKLIST.md`、`TEST-REPORT.md`、`config.example.json`、`manifest.json`、`CHECKSUMS.sha256`、`verify.mjs`；
- [x] `templates/`、`references/`、`examples/` 和 `tests/` 非空；
- [x] `manifest.json`、配置和测试 JSON 能解析，版本与 slug 一致；
- [x] `CHECKSUMS.sha256` 覆盖除自身和本地 `config.json` 外的全部发布文件。

## 合同与内容

- [x] 四级事实证据为 `authorized / observed / unverified / unknown`；
- [x] 三种主张状态为 `approved / blocked / review`；
- [x] 固定六项输出的名称和顺序一致；
- [x] 缺证据与证据冲突或否定使用不同 `block_reason`；
- [x] 无效配置、无效输入、证据不足、待审核和能力缺失均返回明确失败代码与下一步；
- [x] 任何未解决阻塞或审核项都会使 Manifest 保持 `not_ready`；
- [x] 模板要求发布决定记录具名语言审核人、渠道政策负责人和业务发布负责人。

## 安全、许可与边界

- [x] 包内没有密钥、`.env`、账号、客户数据、真实订单或未授权素材；
- [x] 没有未声明的第三方代码、运行依赖、模型或账号；
- [x] 不自动联网、上传、发布、覆盖或删除客户资产；
- [x] 许可、Notice、支持、卸载和回滚说明与 Manifest 一致；
- [x] 非目标和市场验证缺口明确，不暗示客户、营收、转化或平台通过数据。

## 测试与发布

- [x] `node verify.mjs` 退出码为 0，复制 `config.json` 后仍通过；
- [x] `tests/contract-cases.json` 的三个案例通过合同断言；
- [x] 公开合成输入得到与 `expected-output.md` 一致的边界和 `not_ready` 状态；
- [x] 项目级测试、lint、类型检查和生产构建通过；
- [x] ZIP 与源目录逐文件哈希一致；
- [x] ZIP SHA-256 已写入统一发布清单；
- [x] `TEST-REPORT.md` 和发布审计只记录实际运行结果。

每次客户任务仍须由配置中的具名审核人完成语言、渠道政策和业务发布决定；产品包通过不替代单次任务批准。
