export type OpportunityCardInput = {
  product: string;
  market: string;
  demandEvidence: string;
  customerPain: string;
  competition: string;
  margin: string;
  risks: string;
  test: string;
  stopCondition: string;
};

export function buildOpportunityCard(input: OpportunityCardInput) {
  return `# AI 选品机会卡

## 商品与市场
- 候选商品：${input.product}
- 目标市场：${input.market}

## 需求证据
${input.demandEvidence}

## 客户问题
${input.customerPain}

## 竞争差异
${input.competition}

## 利润假设
${input.margin}

## 风险与待核验
${input.risks}

## 最小验证
${input.test}

## 停止条件
${input.stopCondition}

> 这是一张验证假设卡，不是销量、利润或合规保证。价格、库存、采购与上架由负责人确认。`;
}
