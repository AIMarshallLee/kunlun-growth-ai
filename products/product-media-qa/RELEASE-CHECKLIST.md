# 1.0.0 发布检查清单

只有全部必需门禁有可追溯证据且没有 P0/P1 问题时，才能发布版本化 ZIP。市场验证与包完整性分开记录，不得把无客户数据写成市场成熟。

## 版本与结构

- [x] 根目录包含 `SKILL.md`、`README.md`、`INSTALL.md`、`UNINSTALL.md`、`CHANGELOG.md`、`LICENSE.md`、`NOTICE.md`、`SUPPORT.md`、`CONTRACT.md`、`RELEASE-CHECKLIST.md`、`TEST-REPORT.md`、`config.example.json`、`manifest.json`、`CHECKSUMS.sha256` 和 `verify.mjs`；
- [x] `templates/`、`references/`、`examples/` 和 `tests/` 非空；
- [x] `SKILL.md`、Manifest、配置、模板、测试报告、变更记录和 ZIP 文件名统一为 `1.0.0`；
- [x] `manifest.json` 声明入口、宿主、零运行时第三方代码依赖、配置、合同、样例、测试、许可与支持入口。

## 合同与行为

- [x] 六级证据固定为 `actual_file / authorized_reference / specification / preview_only / verbal_only / missing`；
- [x] 四态固定为 `pass / fail / not_evaluable / review`；
- [x] Asset Inventory 是逐文件结果，Issue Log 包含 owner、修复/补件和具名复测；
- [x] `review` 保持阻塞，直至具名决定记录并把资产重新评估为最终状态；
- [x] `pass` 必须对应包内测试案例中实际可打开的 `actual_file`、非空 provenance、授权参考、目标规格和全部适用门槛通过记录；
- [x] `inspection_owner`、`rights_or_policy_reviewer`、`business_reviewer` 三类批准逐一存在，最终责任人另行签署；
- [x] 严格发布公式与 `CONTRACT.md`、质量门槛、Manifest 和合同案例一致；
- [x] 未经当前任务授权，不修改、删除、覆盖、上传、发布或替换资产。

## 安全、许可与支持

- [x] 包扫描未发现密钥、客户数据、账号、Cookie、令牌、未知二进制或未声明依赖；
- [x] 公开示例和测试夹具为无品牌合成资料；
- [x] `LICENSE.md` 与 `NOTICE.md` 随包交付；
- [x] 按 `INSTALL.md` 在干净副本中复制最小配置后自校验通过；
- [x] `UNINSTALL.md` 规定卸载不触碰客户输入/输出，并提供可信上一版本回滚路径；
- [x] `SUPPORT.md` 的入口、范围、安全提交规则和版本政策可用。

## 自动验证

- [x] 在包根目录运行 `node verify.mjs`，退出码为0；
- [x] 运行 `tests/contract-cases.json` 的全部案例，逐项核对期望输出；
- [x] 检查合成 PNG 的签名/尺寸、MP4 的容器/尺寸/时长/音视频轨、SRT 的时间轴与 `tests/fixtures/expected-metadata.json` 一致；
- [x] `CHECKSUMS.sha256` 覆盖除自身和本地 `config.json` 外的全部发布文件，篡改发布文件会使验证失败；
- [x] 干净安装副本复制 `config.json` 后再次运行 `node verify.mjs`，并确认 ZIP 内容与源目录逐文件哈希一致；
- [x] 在发布清单记录 ZIP 文件名、字节数和 SHA-256。

## 发布与披露

- [x] `TEST-REPORT.md` 记录命令、环境、通过/失败数、限制和最终决定；
- [x] 网站版本和可交付状态仅在以上门禁通过后更新；
- [x] 网站继续披露没有可验证真实客户运营数据，不虚构销量、转化、复购、退款、平台通过率或客户案例；
- [x] 最终发布审计记录独立复核结论，并要求所有 P0/P1 清零。

每次客户任务仍须填写实际媒体、规格、授权来源、具名审核与发布负责人；产品包通过不等于某个客户批次 `release_ready`。
