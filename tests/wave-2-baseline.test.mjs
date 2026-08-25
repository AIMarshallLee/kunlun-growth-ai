import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("pins the frozen release baseline and Wave A scope", async () => {
  const [baselineText, releaseText, packScript] = await Promise.all([
    readFile(new URL("../product-factory/frozen-baseline.json", import.meta.url), "utf8"),
    readFile(new URL("../products/release-manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/package-skills.ps1", import.meta.url), "utf8"),
  ]);
  const baseline = structuredClone(JSON.parse(baselineText));
  const release = JSON.parse(releaseText);
  const expected = new Map([
    ["product-material-agent", "765B021731700FBFCE90BA74C667840DE535079314CDE4E497D9CFBDC17BE188"],
    ["crossborder-listing-localization", "E4108CC45AB6F4A9C0F2D9466313DEAA3E01290BA7BF7FAEA1D796EA56FF7363"],
    ["product-media-qa", "A109DC6852EC06761313A4B35B06953626962A47A756878E4E1C089ED537EB9C"],
  ]);
  const expectedFrozenZips = [
    {
      file: "product-material-agent-1.0.0.zip",
      sha256: "765B021731700FBFCE90BA74C667840DE535079314CDE4E497D9CFBDC17BE188",
    },
    {
      file: "crossborder-listing-localization-1.0.0.zip",
      sha256: "E4108CC45AB6F4A9C0F2D9466313DEAA3E01290BA7BF7FAEA1D796EA56FF7363",
    },
    {
      file: "product-media-qa-1.0.0.zip",
      sha256: "A109DC6852EC06761313A4B35B06953626962A47A756878E4E1C089ED537EB9C",
    },
  ];
  const expectedCandidateDefinitions = [
    "product-fact-normalizer",
    "variant-spec-consistency",
    "presales-support-drafter",
    "review-question-insights",
    "course-outline-lesson-plan",
    "assignment-rubric-builder",
    "community-qa-drafter",
    "next-step-learning-coach",
  ];

  assert.deepEqual(release.products.map((item) => item.slug), [...expected.keys()]);
  for (const item of release.products) assert.equal(item.sha256, expected.get(item.slug));
  assert.doesNotMatch(packScript, /product-fact-normalizer|community-qa-drafter/);
  assert.equal(baseline.schemaVersion, 1);
  assert.deepEqual(baseline.frozenZips, expectedFrozenZips);
  assert.deepEqual(baseline.waveABuildTargets, ["product-fact-normalizer", "community-qa-drafter"]);
  assert.deepEqual(baseline.wave2CandidateDefinitions, expectedCandidateDefinitions);
  assert.equal(new Set(baseline.wave2CandidateDefinitions).size, 8);
});
