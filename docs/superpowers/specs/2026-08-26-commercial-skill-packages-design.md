# 三个商用 Skill 产品包 1.0.0 设计

## 目标

把现有三个 Skill 从内容演练包升级为安装后只需复制并修改 `config.example.json` 即可投入授权业务流程的 1.0.0 商品包。产品包完整性与市场验证分开：三个包都可咨询购买和课程领取，但网站必须同时披露“尚待真实客户运营数据”。本期不开发第四个产品，不接入在线支付、自动下载、远程数据存储或第三方模型 API。

## 统一包结构

每个 ZIP 根目录包含：`SKILL.md`、`README.md`、`INSTALL.md`、`UNINSTALL.md`、`CHANGELOG.md`、`LICENSE.md`、`NOTICE.md`、`SUPPORT.md`、`CONTRACT.md`、`RELEASE-CHECKLIST.md`、`TEST-REPORT.md`、`config.example.json`、`manifest.json`、`CHECKSUMS.sha256` 和 `verify.mjs`。内容目录继续使用非空的 `templates/`、`references/`、`examples/`，并增加 `tests/contract-cases.json`。媒体质检包还包含小型合成图片、视频、字幕和 `tests/fixtures/expected-metadata.json`。

`manifest.json` 是机器可读产品清单，声明 slug、版本、入口、兼容宿主、运行依赖、配置文件、合同、公开样例、测试命令和支持入口。`CHECKSUMS.sha256` 覆盖除自身之外的全部包内文件。`verify.mjs` 只使用 Node 标准库，验证根文件、目录、JSON、清单覆盖、文件哈希、密钥特征和产品特定合同术语。

## 输入、输出与失败合同

`CONTRACT.md` 对每包统一定义：必需输入、可选输入、固定输出、状态枚举、证据等级、审核角色和失败处理。配置或必需输入无效时不得生成“可发布”结果；缺证据与证据证明失败必须分开；模型、工具或文件能力缺失时返回明确的阻塞状态和下一步，不伪造完成。

- 商品素材：事实等级为 `authorized / observed / unverified / unknown`；输出事实记录、文案、图像计划、视频分镜、问题清单和 Manifest。
- Listing：事实等级相同，主张状态为 `approved / blocked / review`；只有已批准事实进入候选稿，资料不足时 `not_ready`。
- 媒体质检：证据等级为 `actual_file / authorized_reference / specification / preview_only / verbal_only / missing`；结果为 `pass / fail / not_evaluable / review`。发布条件是所有必需资产最终为 `pass`、未解决三类结果均为0、所需人工批准已记录。

## 授权、支持、卸载与回滚

三个包使用同一份“昆仑增长 AI 商业使用许可 1.0”：授权购买者或被授予课程权益者在自身业务和客户服务中使用及修改，禁止转售、公开分发或把包本身作为可下载竞品。`NOTICE.md` 声明不捆绑第三方代码、模型、素材或账号，兼容宿主商标归各自权利人。支持通过 `https://skill.kunlungrowth.cn/contact` 发起，响应范围和时效以订单或课程权益记录为准。

卸载只删除对应 Skill 文件夹和用户自行复制的配置；不触碰客户输入/输出。回滚先备份配置与工作文件，再安装上一份已交付 ZIP；没有上一版本时执行卸载。包不自动联网、上传、发布或修改客户资产。

## 网站状态

`availability` 表示包是否完整可交付，三个包都设为 `available`；`packageStatus` 显示“正式发布”；新增 `marketValidation` 独立显示“待真实客户运营数据”。两个原 0.9.0 包升级为 1.0.0。购买仍为人工咨询，课程权益仍为人工核验，不暗示已有销售、转化或客户案例。

## 验证与发布

自动验收包括：包目录验证、包内 `node verify.mjs`、ZIP 结构与源文件逐文件哈希一致、ZIP SHA-256 发布清单、三个合同案例、媒体夹具签名/尺寸/时长元数据、密钥扫描、网站状态断言、全量测试、ESLint、TypeScript 和静态生产构建。独立审查所有 P0/P1 清零后才更新最终发布审计。

真实客户数、付费转化、复购、退款和客单价没有数据时必须明确写0条可验证记录或“尚无可验证数据”；该缺口阻止宣称市场成熟，但不否定完成上述门禁后的产品包完整性。
