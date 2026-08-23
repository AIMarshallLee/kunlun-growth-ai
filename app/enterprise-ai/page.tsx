import type { Metadata } from "next";
import Link from "next/link";
import styles from "./enterprise-ai.module.css";

const contactEmail = "marshall@kunlungrowth.com";
const lastUpdated = "2026.08.23";
const diagnosisEmail = `mailto:${contactEmail}?subject=${encodeURIComponent("企业 AI｜20 分钟单流程诊断")}&body=${encodeURIComponent("您好，我想先说明一条业务流程：\n\n流程起点：\n流程终点：\n当前由谁处理：\n最想解决的问题：\n\n请勿在邮件中发送账号、密码或未脱敏的客户数据。")}`;

export const metadata: Metadata = {
  title: "昆仑增长｜企业 AI 落地服务与 20 分钟诊断",
  description:
    "从一条真实业务流程开始，判断哪些环节适合 AI 辅助、哪些必须人工，并用小范围、可审核的方式验证。",
  alternates: { canonical: "/enterprise-ai" },
  openGraph: {
    title: "昆仑增长｜企业 AI 落地服务",
    description: "一次只拆一条流程，先诊断，再决定是否值得进入受控验证。",
    type: "website",
    url: "/enterprise-ai",
  },
};

const scenarios = [
  {
    number: "01",
    title: "询盘分析与业务回复辅助",
    input: "邮件、表单或聊天中的业务询问",
    output: "采购意图、缺失信息与回复初稿",
    gate: "销售或业务负责人确认事实、价格与最终发送",
  },
  {
    number: "02",
    title: "产品资料与知识库整理",
    input: "零散文档、产品参数、FAQ 与历史资料",
    output: "结构化知识、产品页与问答初稿",
    gate: "资料负责人确认来源、版本和可公开范围",
  },
  {
    number: "03",
    title: "客户记录与销售跟进",
    input: "客户记录、沟通摘要和待办信息",
    output: "统一字段、意向判断建议与下一步清单",
    gate: "业务负责人决定优先级、承诺和对外动作",
  },
];

const agenda = [
  ["0–3", "锁定边界", "只选一条流程，写清起点与终点"],
  ["3–7", "还原现状", "输入、角色、工具与当前 5–7 个步骤"],
  ["7–11", "找重复与风险", "频率、耗时、返工、错误和高风险点"],
  ["11–15", "划分 AI 与人工", "整理、分类、生成与判断、审批、发送分开"],
  ["15–18", "选择最小验证", "判断能否用 3–10 条脱敏样本离线验证"],
  ["18–20", "确认下一步", "负责人、审核、证据、复核时间与停止条件"],
];

export default function EnterpriseAiPage() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.topbar}>
        <a className={styles.identity} href="#top" aria-label="返回企业 AI 服务页顶部">
          <span className={styles.seal} aria-hidden="true">昆</span>
          <span>昆仑增长<small>企业 AI 落地服务</small></span>
        </a>
        <nav className={styles.nav} aria-label="本页导航">
          <a href="#scenarios">典型场景</a>
          <a href="#diagnosis">20 分钟诊断</a>
          <a className={styles.navContact} href={diagnosisEmail}>联系 Marshall</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="enterprise-ai-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>ENTERPRISE AI FIELD SERVICE · 身份与服务说明</p>
            <h1 id="enterprise-ai-title">从一条真实流程开始，<em>让 AI 有边界地工作。</em></h1>
            <p className={styles.lead}>
              昆仑增长是由 Marshall 负责的企业 AI 落地服务品牌与执行团队。我们帮助企业从现有业务流程中筛选适合 AI 辅助的环节，再用小范围、可人工审核的方式验证。
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={diagnosisEmail}>说明一条流程</a>
              <a className={styles.secondaryButton} href="#diagnosis">先看诊断边界</a>
            </div>
            <p className={styles.safetyNote}>会前不需要敏感数据，不接入账号，也不预设业务效果。</p>
          </div>

          <aside className={styles.identityCard} aria-label="昆仑增长身份信息">
            <div className={styles.cardTopline}><span>IDENTITY NOTE</span><span>{lastUpdated}</span></div>
            <p className={styles.cardLabel}>对外名称</p>
            <h2>昆仑增长</h2>
            <dl>
              <div><dt>性质</dt><dd>企业 AI 落地服务品牌与执行团队</dd></div>
              <div><dt>负责人</dt><dd>Marshall</dd></div>
              <div><dt>联系邮箱</dt><dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd></div>
            </dl>
            <p className={styles.legalNote}>
              本页说明服务品牌与工作边界，不将“昆仑增长”表述为已核验的工商登记主体。具体签约、合同与开票信息，以双方后续正式材料为准。
            </p>
          </aside>
        </section>

        <section className={styles.principles} aria-label="服务原则">
          <div><b>01</b><span>一次只拆一条流程</span></div>
          <div><b>02</b><span>默认保留人工审核</span></div>
          <div><b>03</b><span>先诊断，再决定是否试点</span></div>
          <div><b>04</b><span>不承诺未经验证的效果</span></div>
        </section>

        <section className={styles.audience} id="service">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionIndex}>01 / WHO WE SERVE</p>
            <h2>服务谁，也写清楚。</h2>
          </div>
          <div className={styles.audienceCopy}>
            <p>
              面向有高频重复流程、希望先判断 AI 是否适配的企业负责人和业务团队。当前重点关注销售、运营、客服、产品知识与流程密集岗位，包括外贸、跨境电商、供应链和企业服务等场景。
            </p>
            <ul>
              <li>愿意指定一位业务负责人</li>
              <li>能提供少量脱敏样本或口头流程说明</li>
              <li>接受人工审核、证据复盘和明确停止条件</li>
            </ul>
          </div>
        </section>

        <section className={styles.scenarioSection} id="scenarios" aria-labelledby="scenario-title">
          <div className={styles.scenarioHeading}>
            <div>
              <p className={styles.sectionIndex}>02 / TYPICAL SCENARIOS</p>
              <h2 id="scenario-title">三类适合先诊断的流程。</h2>
            </div>
            <p>以下是服务范围示例，不是客户案例，也不代表已经产生效果。</p>
          </div>
          <div className={styles.scenarioGrid}>
            {scenarios.map((scenario) => (
              <article className={styles.scenarioCard} key={scenario.number}>
                <span className={styles.scenarioNumber}>{scenario.number}</span>
                <p className={styles.exampleTag}>可诊断示例</p>
                <h3>{scenario.title}</h3>
                <dl>
                  <div><dt>输入</dt><dd>{scenario.input}</dd></div>
                  <div><dt>AI 辅助输出</dt><dd>{scenario.output}</dd></div>
                  <div><dt>人工门禁</dt><dd>{scenario.gate}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.diagnosisSection} id="diagnosis" aria-labelledby="diagnosis-title">
          <div className={styles.diagnosisIntro}>
            <p className={styles.sectionIndex}>03 / 20-MINUTE DIAGNOSIS</p>
            <h2 id="diagnosis-title">20 分钟，只把一条流程拆清楚。</h2>
            <p>
              诊断的目标不是当场推一套系统，而是确认：问题是否值得用 AI 处理、人工责任在哪里、下一步是否值得做一个小范围验证。
            </p>
            <div className={styles.outputCard}>
              <span>会后输出</span>
              <strong>一页场景优先级清单</strong>
              <p>标明适合 AI 辅助、必须人工、可用什么脱敏样本验证，以及何时应该停止。</p>
            </div>
          </div>
          <ol className={styles.agenda}>
            {agenda.map(([minutes, title, description]) => (
              <li key={minutes}>
                <span className={styles.minutes}>{minutes}<small>分钟</small></span>
                <div><strong>{title}</strong><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.boundaries} aria-labelledby="boundary-title">
          <div className={styles.boundaryHeading}>
            <p className={styles.sectionIndex}>04 / SERVICE BOUNDARY</p>
            <h2 id="boundary-title">哪些会做，哪些不会在诊断里做。</h2>
          </div>
          <div className={styles.boundaryGrid}>
            <article className={styles.doCard}>
              <span>诊断包含</span>
              <ul>
                <li>还原一条流程的输入、处理、输出和负责人</li>
                <li>识别重复工作、数据风险与人工审批点</li>
                <li>判断是否适合用 3–10 条脱敏样本验证</li>
                <li>给出继续、缩小范围或停止的建议</li>
              </ul>
            </article>
            <article className={styles.dontCard}>
              <span>诊断不包含</span>
              <ul>
                <li>不接入正式账号、核心系统或客户数据库</li>
                <li>不自动发送邮件、报价或任何对外内容</li>
                <li>不替代专业审批、业务判断与经营决策</li>
                <li>不承诺节省时间、提高转化或增加收入</li>
              </ul>
            </article>
          </div>
          <p className={styles.pilotNote}>
            若双方确认值得继续，单场景试点会另行冻结范围、资料权限、人工审核、测试样本、验收证据和停止条件；它不是 20 分钟诊断的默认组成部分。
          </p>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-title">
          <div>
            <p className={styles.sectionIndex}>05 / START SMALL</p>
            <h2 id="contact-title">先发来一条流程，不用发一堆资料。</h2>
            <p>写清流程从哪里开始、到什么结果结束、目前由谁处理即可。请不要在邮件中发送账号、密码或未脱敏的客户数据。</p>
          </div>
          <div className={styles.contactActions}>
            <a className={styles.contactButton} href={diagnosisEmail}>邮件联系 Marshall <span aria-hidden="true">↗</span></a>
            <a className={styles.emailLink} href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><span>昆仑增长｜企业 AI 落地服务</span><small>公开身份与服务边界说明 · {lastUpdated}</small></div>
        <Link href="/">查看昆仑增长 AI 实战资料库</Link>
      </footer>
    </div>
  );
}
