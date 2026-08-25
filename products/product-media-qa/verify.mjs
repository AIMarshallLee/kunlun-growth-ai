import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const requiredRootFiles = [
  "SKILL.md", "README.md", "INSTALL.md", "UNINSTALL.md", "CHANGELOG.md",
  "LICENSE.md", "NOTICE.md", "SUPPORT.md", "CONTRACT.md", "RELEASE-CHECKLIST.md",
  "TEST-REPORT.md", "config.example.json", "manifest.json", "CHECKSUMS.sha256", "verify.mjs",
];
const requiredDirectories = ["templates", "references", "examples", "tests"];
const secretPattern = /(?:(?:^|[^A-Za-z0-9])sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|(?:^|\n)\s*[A-Z][A-Z0-9_]*(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PRIVATE[_-]?KEY)[A-Z0-9_]*\s*=\s*["']?[^\s"']{8,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})/im;
const resultStates = ["pass", "fail", "not_evaluable", "review"];
const unresolvedStates = new Set(["fail", "not_evaluable", "review"]);

export async function main() {
  for (const file of requiredRootFiles) await access(resolve(root, file));
  for (const directory of requiredDirectories) {
    const entries = await readdir(resolve(root, directory));
    assert(entries.length > 0, `Required directory is empty: ${directory}`);
  }

  const manifest = JSON.parse(await readFile(resolve(root, "manifest.json"), "utf8"));
  const exampleConfig = JSON.parse(await readFile(resolve(root, "config.example.json"), "utf8"));
  let configName = "config.example.json";
  try { await access(resolve(root, "config.json")); configName = "config.json"; } catch {}
  const config = JSON.parse(await readFile(resolve(root, configName), "utf8"));
  assert(manifest.entrypoint === "SKILL.md", "manifest entrypoint must be SKILL.md");
  assert(manifest.version === "1.0.0", "commercial package version must be 1.0.0");
  assert(manifest.packageStatus === "commercial-ready", "manifest packageStatus must be commercial-ready");
  assert(manifest.marketValidationStatus === "awaiting-real-customer-operations-data", "market validation status must remain explicit");
  assert(config.schemaVersion === 1 && config.evidenceMode === "strict", "config must use schemaVersion 1 and strict evidence mode");
  validateReviewers(manifest, config, exampleConfig, configName === "config.json");

  const files = await listFiles(root);
  for (const file of files) {
    const base = file.split("/").at(-1);
    assert(!base.startsWith(".env") && !file.split("/").includes("node_modules"), `Forbidden package entry: ${file}`);
    const bytes = await readFile(resolve(root, ...file.split("/")));
    assert(!secretPattern.test(bytes.toString("utf8")), `Possible secret in ${file}`);
  }
  const checksums = parseChecksums(await readFile(resolve(root, "CHECKSUMS.sha256"), "utf8"));
  const coveredFiles = files.filter((file) => file !== "CHECKSUMS.sha256" && file !== "config.json");
  assert(checksums.size === coveredFiles.length, "checksum entry count must match package file count");
  for (const file of coveredFiles) {
    const expected = checksums.get(file);
    assert(expected, `Missing checksum for ${file}`);
    const actual = createHash("sha256").update(await readFile(resolve(root, ...file.split("/")))).digest("hex");
    assert(expected === actual, `Checksum mismatch for ${file}`);
  }

  await access(resolvePackagePath(root, manifest.publicExample, "manifest publicExample"));
  const cases = JSON.parse(await readFile(resolve(root, "tests", "contract-cases.json"), "utf8"));
  await validateContractCases(cases, manifest.releaseFormula, manifest.requiredApprovalRoles, manifest.evidenceLevels, root);
  assert(Array.isArray(manifest.requiredContractTerms) && manifest.requiredContractTerms.length >= 4, "manifest must declare contract terms");
  const contractText = [
    await readFile(resolve(root, "SKILL.md"), "utf8"),
    await readFile(resolve(root, "CONTRACT.md"), "utf8"),
    await readFile(resolve(root, "references", "quality-gates.md"), "utf8"),
  ].join("\n").toLowerCase();
  for (const term of manifest.requiredContractTerms) {
    assert(contractText.includes(String(term).toLowerCase()), `Missing contract term: ${term}`);
  }

  await verifyFixtureExpectations(root, manifest.tests?.fixtureExpectations);
  console.log(`PASS: ${manifest.slug} ${manifest.version}; ${coveredFiles.length} files; ${cases.length} contract cases`);
}

export async function validateContractCases(cases, releaseFormula, requiredApprovalRoles, evidenceLevels, packageRoot) {
  assert(Array.isArray(cases) && cases.length >= 2, "tests/contract-cases.json must contain at least two cases");
  validateReleaseFormula(releaseFormula);
  assert(Array.isArray(requiredApprovalRoles) && requiredApprovalRoles.length > 0, "manifest must declare required approval roles");
  assert(requiredApprovalRoles.every(nonEmpty) && new Set(requiredApprovalRoles).size === requiredApprovalRoles.length, "required approval roles must be non-empty and unique");
  assert(Array.isArray(evidenceLevels) && evidenceLevels.length > 0, "manifest must declare evidence levels");

  for (const item of cases) {
    assert(nonEmpty(item.id) && nonEmpty(item.expectedStatus) && nonEmpty(item.reason), "each contract case needs id, expectedStatus, and reason");
    assert(Array.isArray(item.input?.required_assets), `${item.id}: input.required_assets must be an array`);
    assert(Array.isArray(item.expected?.asset_results), `${item.id}: expected.asset_results must be an array`);
    assert(item.input.required_assets.length === item.expected.asset_results.length, `${item.id}: every required asset needs one result`);

    const requiredIds = item.input.required_assets.map((asset) => asset.asset_id);
    assert(requiredIds.every(nonEmpty) && new Set(requiredIds).size === requiredIds.length, `${item.id}: required asset IDs must be non-empty and unique`);
    for (const asset of item.input.required_assets) {
      assert(evidenceLevels.includes(asset.evidence_level), `${item.id}: ${asset.asset_id} has an invalid evidence level`);
      assert(nonEmpty(asset.provenance), `${item.id}: ${asset.asset_id} requires provenance`);
      if (asset.evidence_level === "actual_file") {
        assert(nonEmpty(asset.path), `${item.id}: ${asset.asset_id} actual_file evidence requires a path`);
        const actualPath = resolvePackagePath(packageRoot, asset.path, `${item.id} actual_file path`);
        try { await access(actualPath); } catch { throw new Error(`${item.id}: ${asset.asset_id} actual_file path is not accessible`); }
      }
    }
    const resultIds = item.expected.asset_results.map((asset) => asset.asset_id);
    assert(resultIds.every(nonEmpty) && new Set(resultIds).size === resultIds.length, `${item.id}: result asset IDs must be non-empty and unique`);
    assert(requiredIds.every((id) => resultIds.includes(id)), `${item.id}: asset results must match required assets`);
    for (const asset of item.expected.asset_results) {
      assert(resultStates.includes(asset.result), `${item.id}: invalid result for ${asset.asset_id}`);
      if (asset.result === "pass") {
        const inputAsset = item.input.required_assets.find((entry) => entry.asset_id === asset.asset_id);
        assert(inputAsset?.evidence_level === "actual_file", `${item.id}: ${asset.asset_id} pass requires actual_file evidence`);
        assert(inputAsset.all_applicable_gates_pass === true, `${item.id}: ${asset.asset_id} pass requires all applicable gates to pass`);
        assert(nonEmpty(item.input.authorized_reference), `${item.id}: pass requires an authorized reference`);
        assert(nonEmpty(item.input.specification), `${item.id}: pass requires a target specification`);
      }
    }

    const issues = item.expected.issues;
    assert(Array.isArray(issues), `${item.id}: expected.issues must be an array`);
    const openIssues = issues.filter((issue) => issue.retestResult === "open");
    for (const asset of item.expected.asset_results.filter((entry) => unresolvedStates.has(entry.result))) {
      const inputAsset = item.input.required_assets.find((entry) => entry.asset_id === asset.asset_id);
      const issue = issues.find((entry) => entry.assetIdOrPath === asset.asset_id || entry.assetIdOrPath === inputAsset?.path);
      assert(issue, `${item.id}: ${asset.asset_id} ${asset.result} requires an issue`);
      assert(nonEmpty(issue.owner), `${item.id}: ${asset.asset_id} issue requires owner`);
      assert(nonEmpty(issue.requiredFixOrEvidence), `${item.id}: ${asset.asset_id} issue requires requiredFixOrEvidence`);
      assert(issue.retestResult === "open", `${item.id}: ${asset.asset_id} unresolved issue retestResult must be open`);
    }

    const counts = {
      required_asset_count: item.input.required_assets.length,
      pass_count: countResults(item.expected.asset_results, "pass"),
      fail_count: countResults(item.expected.asset_results, "fail"),
      not_evaluable_count: countResults(item.expected.asset_results, "not_evaluable"),
      review_count: countResults(item.expected.asset_results, "review"),
      open_issue_count: openIssues.length,
    };
    for (const [name, value] of Object.entries(counts)) {
      assert(item.expected.counts?.[name] === value, `${item.id}: ${name} must be recomputed as ${value}`);
    }

    const namedApprovalsRecorded = hasCompleteNamedApprovals(item.input.named_approval_records, requiredApprovalRoles);
    const accountableOwnerRecorded = nonEmpty(item.input.accountable_decision_owner);
    const finalDecisionMatchesOwner = accountableOwnerRecorded
      && item.input.final_decision_by === item.input.accountable_decision_owner;
    if ("required_named_approvals_recorded" in item.expected) {
      assert(item.expected.required_named_approvals_recorded === namedApprovalsRecorded, `${item.id}: named approval flag does not match approval records`);
    }
    if ("accountable_decision_owner_recorded" in item.expected) {
      assert(item.expected.accountable_decision_owner_recorded === accountableOwnerRecorded, `${item.id}: accountable owner flag does not match input`);
    }

    const qualifiesForRelease =
      counts.required_asset_count >= releaseFormula.requiredAssetCountMinimum
      && (!releaseFormula.passCountEqualsRequiredAssetCount || counts.pass_count === counts.required_asset_count)
      && counts.fail_count === releaseFormula.failCount
      && counts.not_evaluable_count === releaseFormula.notEvaluableCount
      && counts.review_count === releaseFormula.reviewCount
      && counts.open_issue_count === releaseFormula.openIssueCount
      && (!releaseFormula.requiredNamedApprovalsRecorded || namedApprovalsRecorded)
      && (!releaseFormula.accountableDecisionOwnerRecorded || accountableOwnerRecorded)
      && (!releaseFormula.finalDecisionByEqualsAccountableDecisionOwner || finalDecisionMatchesOwner);
    const recomputedDecision = qualifiesForRelease ? "release_ready" : "blocked";
    assert(item.expected.batch_decision === recomputedDecision, `${item.id}: batch_decision must be ${recomputedDecision}`);
    assert(item.expectedStatus === recomputedDecision, `${item.id}: expectedStatus must match recomputed batch decision`);

    assert(Array.isArray(item.expected.external_actions) && item.expected.external_actions.length === 0, `${item.id}: external_actions must be empty`);
    const actionDecisions = item.expected.action_decisions ?? [];
    for (const action of item.input.requested_actions ?? []) {
      if (item.input.current_task_authorization?.[action] === true) continue;
      const decision = actionDecisions.find((entry) => entry.action === action);
      assert(decision?.decision === "denied", `${item.id}: unauthorized ${action} must be denied`);
    }
  }
}

export async function verifyFixtureExpectations(packageRoot, relativeExpectationPath) {
  assert(nonEmpty(relativeExpectationPath), "manifest.tests.fixtureExpectations is required");
  const expectationPath = resolvePackagePath(packageRoot, relativeExpectationPath, "fixture expectations");
  const expectations = JSON.parse(await readFile(expectationPath, "utf8"));
  assert(expectations.synthetic === true, "fixture expectations must identify synthetic fixtures");
  assert(expectations.contains_brand_or_customer_data === false, "fixtures must not contain brand or customer data");
  assert(expectations.files && typeof expectations.files === "object", "fixture expectations must declare files");

  const fixtureDirectory = dirname(expectationPath);
  const pngExpectation = expectations.files["hero.png"];
  const mp4Expectation = expectations.files["clip.mp4"];
  const srtExpectation = expectations.files["clip.srt"];
  assert(pngExpectation?.format === "png", "hero.png PNG expectations are required");
  assert(mp4Expectation?.container === "mp4", "clip.mp4 expectations are required");
  assert(srtExpectation?.encoding?.toUpperCase() === "UTF-8", "clip.srt UTF-8 expectations are required");

  await verifyPng(resolve(fixtureDirectory, "hero.png"), pngExpectation);
  await verifyMp4(resolve(fixtureDirectory, "clip.mp4"), mp4Expectation);
  assert(mp4Expectation.subtitle_sidecar === "clip.srt", "clip.mp4 must declare clip.srt as its subtitle sidecar");
  await verifySrt(resolve(fixtureDirectory, "clip.srt"), srtExpectation);
}

export async function verifyPng(path, expected) {
  const bytes = await readFile(path);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert(bytes.subarray(0, 8).equals(signature), "Invalid PNG signature: hero.png");
  const chunks = parsePngChunks(bytes);
  assert(chunks[0]?.type === "IHDR" && chunks[0].length === 13, "hero.png must start with a valid IHDR chunk");
  assert(chunks.at(-1)?.type === "IEND", "hero.png must end with IEND");
  const ihdr = chunks[0];
  const width = bytes.readUInt32BE(ihdr.dataStart);
  const height = bytes.readUInt32BE(ihdr.dataStart + 4);
  const colorType = bytes[ihdr.dataStart + 9];
  const animated = chunks.some((chunk) => chunk.type === "acTL");
  assert(width === expected.width && height === expected.height, `Unexpected PNG dimensions: ${width}x${height}`);
  assert(colorType === expected.png_color_type, `Unexpected PNG color type: ${colorType}`);
  assert(animated === expected.animated, `Unexpected PNG animation state: ${animated}`);
}

export async function verifyMp4(path, expected) {
  const bytes = await readFile(path);
  const topLevel = parseMp4Boxes(bytes, 0, bytes.length);
  const ftyp = requireBox(topLevel, "ftyp", "MP4 ftyp box is missing");
  const moov = requireBox(topLevel, "moov", "MP4 moov box is missing");
  requireBox(topLevel, "mdat", "MP4 mdat box is missing");
  assert(ftyp.dataStart + 8 <= ftyp.end, "MP4 ftyp box is invalid");
  const majorBrand = bytes.toString("ascii", ftyp.dataStart, ftyp.dataStart + 4);
  assert(/^[\x20-\x7e]{4}$/.test(majorBrand), "MP4 major brand is invalid");

  const moovChildren = parseMp4Boxes(bytes, moov.dataStart, moov.end);
  const mvhd = requireBox(moovChildren, "mvhd", "MP4 mvhd box is missing");
  const durationSeconds = parseMediaHeaderDuration(bytes, mvhd, "mvhd").durationSeconds;
  const tolerance = expected.duration_tolerance_seconds;
  assert(Math.abs(durationSeconds - expected.duration_seconds) <= tolerance, `Unexpected MP4 duration: ${durationSeconds}`);

  const tracks = moovChildren
    .filter((box) => box.type === "trak")
    .map((box) => parseTrack(bytes, box));
  const videoTracks = tracks.filter((track) => track.handlerType === "vide");
  const audioTracks = tracks.filter((track) => track.handlerType === "soun");
  assert(videoTracks.length === 1, `Expected one video track, found ${videoTracks.length}`);
  assert(audioTracks.length === expected.audio_stream_count, `Expected ${expected.audio_stream_count} audio stream, found ${audioTracks.length}`);

  const video = videoTracks[0];
  assert(video.codec === expected.video_codec, `Unexpected video codec: ${video.codec}`);
  assert(video.width === expected.width && video.height === expected.height, `Unexpected video dimensions: ${video.width}x${video.height}`);
  assert(Math.abs(video.frameRate - expected.frame_rate) < 0.001, `Unexpected video frame rate: ${video.frameRate}`);
  assert(audioTracks.every((track) => track.codec === expected.audio_codec), `Unexpected audio codec: ${audioTracks.map((track) => track.codec).join(",")}`);
}

export async function verifySrt(path, expected) {
  const bytes = await readFile(path);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^\uFEFF/, "");
  } catch {
    throw new Error("clip.srt must be valid UTF-8");
  }
  const cues = text.trim().split(/\r?\n\s*\r?\n/).map((block, index) => parseSrtCue(block, index));
  assert(cues.length === expected.cue_count, `Unexpected subtitle cue count: ${cues.length}`);
  assert(cues[0].start === expected.first_cue_start, `Unexpected first cue start: ${cues[0].start}`);
  assert(cues.at(-1).end === expected.last_cue_end, `Unexpected last cue end: ${cues.at(-1).end}`);
  for (let index = 0; index < cues.length; index += 1) {
    assert(cues[index].number === index + 1, "Subtitle cue numbers must be consecutive from 1");
    assert(srtTimeToMilliseconds(cues[index].start) < srtTimeToMilliseconds(cues[index].end), `Subtitle cue ${cues[index].number} has invalid timing`);
    if (index > 0) assert(srtTimeToMilliseconds(cues[index].start) >= srtTimeToMilliseconds(cues[index - 1].end), "Subtitle cues must not overlap");
  }
}

function parsePngChunks(bytes) {
  const chunks = [];
  let offset = 8;
  while (offset < bytes.length) {
    assert(offset + 12 <= bytes.length, "PNG chunk header is truncated");
    const length = bytes.readUInt32BE(offset);
    const type = bytes.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const end = dataStart + length + 4;
    assert(end <= bytes.length, `PNG chunk is truncated: ${type}`);
    chunks.push({ type, length, dataStart });
    offset = end;
    if (type === "IEND") break;
  }
  assert(offset === bytes.length, "PNG contains trailing or malformed data");
  return chunks;
}

function parseTrack(bytes, trackBox) {
  const trackChildren = parseMp4Boxes(bytes, trackBox.dataStart, trackBox.end);
  const mdia = requireBox(trackChildren, "mdia", "MP4 track mdia box is missing");
  const mediaChildren = parseMp4Boxes(bytes, mdia.dataStart, mdia.end);
  const hdlr = requireBox(mediaChildren, "hdlr", "MP4 track handler is missing");
  assert(hdlr.dataStart + 12 <= hdlr.end, "MP4 hdlr box is truncated");
  const handlerType = bytes.toString("ascii", hdlr.dataStart + 8, hdlr.dataStart + 12);
  const mdhd = requireBox(mediaChildren, "mdhd", "MP4 track mdhd box is missing");
  const mediaHeader = parseMediaHeaderDuration(bytes, mdhd, "mdhd");
  const minf = requireBox(mediaChildren, "minf", "MP4 track minf box is missing");
  const stbl = requireBox(parseMp4Boxes(bytes, minf.dataStart, minf.end), "stbl", "MP4 track stbl box is missing");
  const sampleTable = parseMp4Boxes(bytes, stbl.dataStart, stbl.end);
  const stsd = requireBox(sampleTable, "stsd", "MP4 track stsd box is missing");
  assert(stsd.dataStart + 8 <= stsd.end, "MP4 stsd box is truncated");
  const sampleEntryCount = bytes.readUInt32BE(stsd.dataStart + 4);
  const sampleEntries = parseMp4Boxes(bytes, stsd.dataStart + 8, stsd.end);
  assert(sampleEntryCount === sampleEntries.length && sampleEntries.length > 0, "MP4 stsd sample entry count is invalid");
  const sampleEntry = sampleEntries[0];

  if (handlerType === "vide") {
    assert(sampleEntry.dataStart + 78 <= sampleEntry.end, "MP4 video sample entry is truncated");
    const width = bytes.readUInt16BE(sampleEntry.dataStart + 24);
    const height = bytes.readUInt16BE(sampleEntry.dataStart + 26);
    const codec = ["avc1", "avc3"].includes(sampleEntry.type) ? "h264" : sampleEntry.type;
    if (codec === "h264") {
      const videoExtensions = parseMp4Boxes(bytes, sampleEntry.dataStart + 78, sampleEntry.end);
      requireBox(videoExtensions, "avcC", "H264 sample entry is missing avcC");
    }
    const stts = requireBox(sampleTable, "stts", "MP4 video stts box is missing");
    const frameRate = parseFrameRate(bytes, stts, mediaHeader.timescale);
    return { handlerType, codec, width, height, frameRate };
  }

  if (handlerType === "soun") {
    const codec = sampleEntry.type === "mp4a" ? parseMp4AudioCodec(bytes, sampleEntry) : sampleEntry.type;
    return { handlerType, codec };
  }
  return { handlerType, codec: sampleEntry.type };
}

function parseMp4AudioCodec(bytes, sampleEntry) {
  assert(sampleEntry.dataStart + 28 <= sampleEntry.end, "MP4 audio sample entry is truncated");
  const version = bytes.readUInt16BE(sampleEntry.dataStart + 8);
  const extensionOffset = version === 0 ? 28 : version === 1 ? 44 : 64;
  assert(sampleEntry.dataStart + extensionOffset <= sampleEntry.end, "Unsupported MP4 audio sample entry version");
  const extensions = parseMp4Boxes(bytes, sampleEntry.dataStart + extensionOffset, sampleEntry.end);
  const esds = requireBox(extensions, "esds", "MP4 mp4a sample entry is missing esds");
  const descriptor = bytes.subarray(esds.dataStart + 4, esds.end);
  const objectType = findDecoderObjectType(descriptor);
  assert([0x40, 0x66, 0x67, 0x68].includes(objectType), `MP4 mp4a object type is not AAC: ${objectType}`);
  return "aac";
}

function findDecoderObjectType(bytes) {
  for (let offset = 0; offset < bytes.length; offset += 1) {
    if (bytes[offset] !== 0x04) continue;
    const descriptor = readDescriptorLength(bytes, offset + 1);
    if (descriptor.dataStart < bytes.length && descriptor.dataStart + descriptor.length <= bytes.length) return bytes[descriptor.dataStart];
  }
  throw new Error("AAC DecoderConfigDescriptor is missing");
}

function readDescriptorLength(bytes, start) {
  let length = 0;
  let offset = start;
  for (let index = 0; index < 4; index += 1) {
    assert(offset < bytes.length, "MPEG descriptor length is truncated");
    const value = bytes[offset];
    offset += 1;
    length = (length << 7) | (value & 0x7f);
    if ((value & 0x80) === 0) return { length, dataStart: offset };
  }
  throw new Error("MPEG descriptor length is invalid");
}

function parseFrameRate(bytes, stts, timescale) {
  assert(timescale > 0 && stts.dataStart + 8 <= stts.end, "MP4 timing data is invalid");
  const entryCount = bytes.readUInt32BE(stts.dataStart + 4);
  assert(stts.dataStart + 8 + entryCount * 8 === stts.end, "MP4 stts entries are malformed");
  let samples = 0;
  let durationUnits = 0;
  for (let index = 0; index < entryCount; index += 1) {
    const offset = stts.dataStart + 8 + index * 8;
    const sampleCount = bytes.readUInt32BE(offset);
    const sampleDelta = bytes.readUInt32BE(offset + 4);
    samples += sampleCount;
    durationUnits += sampleCount * sampleDelta;
  }
  assert(samples > 0 && durationUnits > 0, "MP4 video timing is empty");
  return samples * timescale / durationUnits;
}

function parseMediaHeaderDuration(bytes, box, label) {
  assert(box.dataStart + 20 <= box.end, `MP4 ${label} box is truncated`);
  const version = bytes[box.dataStart];
  if (version === 0) {
    const timescale = bytes.readUInt32BE(box.dataStart + 12);
    const duration = bytes.readUInt32BE(box.dataStart + 16);
    assert(timescale > 0, `MP4 ${label} timescale must be positive`);
    return { timescale, durationSeconds: duration / timescale };
  }
  if (version === 1) {
    assert(box.dataStart + 32 <= box.end, `MP4 ${label} version 1 box is truncated`);
    const timescale = bytes.readUInt32BE(box.dataStart + 20);
    const duration = Number(bytes.readBigUInt64BE(box.dataStart + 24));
    assert(timescale > 0 && Number.isSafeInteger(duration), `MP4 ${label} timing is invalid`);
    return { timescale, durationSeconds: duration / timescale };
  }
  throw new Error(`Unsupported MP4 ${label} version: ${version}`);
}

function parseMp4Boxes(bytes, start, end) {
  const boxes = [];
  let offset = start;
  while (offset < end) {
    assert(offset + 8 <= end, "MP4 box header is truncated");
    const size32 = bytes.readUInt32BE(offset);
    const type = bytes.toString("ascii", offset + 4, offset + 8);
    let headerSize = 8;
    let size = size32;
    if (size32 === 1) {
      assert(offset + 16 <= end, `MP4 extended box header is truncated: ${type}`);
      const extendedSize = bytes.readBigUInt64BE(offset + 8);
      assert(extendedSize <= BigInt(Number.MAX_SAFE_INTEGER), `MP4 box is too large: ${type}`);
      size = Number(extendedSize);
      headerSize = 16;
    } else if (size32 === 0) {
      size = end - offset;
    }
    assert(size >= headerSize && offset + size <= end, `MP4 box size is invalid: ${type}`);
    boxes.push({ type, start: offset, dataStart: offset + headerSize, end: offset + size });
    offset += size;
  }
  assert(offset === end, "MP4 box boundaries are invalid");
  return boxes;
}

function requireBox(boxes, type, message) {
  const box = boxes.find((entry) => entry.type === type);
  assert(box, message);
  return box;
}

function parseSrtCue(block, index) {
  const lines = block.split(/\r?\n/);
  assert(lines.length >= 3 && /^\d+$/.test(lines[0].trim()), `Subtitle cue ${index + 1} is malformed`);
  const timing = lines[1].match(/^(\d{2}:\d{2}:\d{2},\d{3})\s+-->\s+(\d{2}:\d{2}:\d{2},\d{3})(?:\s+.*)?$/);
  assert(timing, `Subtitle cue ${index + 1} timing is malformed`);
  assert(lines.slice(2).join("\n").trim().length > 0, `Subtitle cue ${index + 1} text is empty`);
  return { number: Number(lines[0].trim()), start: timing[1], end: timing[2] };
}

function srtTimeToMilliseconds(value) {
  const match = value.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})$/);
  assert(match, `Invalid SRT timestamp: ${value}`);
  const [, hours, minutes, seconds, milliseconds] = match.map(Number);
  assert(minutes < 60 && seconds < 60, `Invalid SRT timestamp: ${value}`);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
}

function countResults(assetResults, state) {
  return assetResults.filter((entry) => entry.result === state).length;
}

function hasCompleteNamedApprovals(records, requiredRoles) {
  if (!Array.isArray(records) || records.length === 0) return false;
  const complete = records.every((record) =>
    nonEmpty(record.reviewer)
    && nonEmpty(record.role)
    && record.decision === "approved"
    && nonEmpty(record.time)
    && !Number.isNaN(Date.parse(record.time))
    && nonEmpty(record.provenance));
  return complete && requiredRoles.every((role) => records.some((record) => record.role === role));
}

function validateReleaseFormula(formula) {
  assert(formula && Number.isInteger(formula.requiredAssetCountMinimum) && formula.requiredAssetCountMinimum > 0, "releaseFormula requires a positive asset minimum");
  assert(typeof formula.passCountEqualsRequiredAssetCount === "boolean", "releaseFormula pass-count rule is invalid");
  for (const field of ["failCount", "notEvaluableCount", "reviewCount", "openIssueCount"]) {
    assert(Number.isInteger(formula[field]) && formula[field] >= 0, `releaseFormula ${field} is invalid`);
  }
  for (const field of ["requiredNamedApprovalsRecorded", "accountableDecisionOwnerRecorded", "finalDecisionByEqualsAccountableDecisionOwner"]) {
    assert(typeof formula[field] === "boolean", `releaseFormula ${field} is invalid`);
  }
}

async function listFiles(directory) {
  const files = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) await visit(path);
      if (entry.isFile()) files.push(relative(directory, path).split(sep).join("/"));
    }
  }
  await visit(directory);
  return files.sort();
}

function parseChecksums(content) {
  const result = new Map();
  for (const line of content.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^([a-f0-9]{64})  ([^\\].*)$/);
    assert(match && !match[2].startsWith("/") && !match[2].split("/").includes("..") && !result.has(match[2]), "Invalid checksum entry");
    result.set(match[2], match[1]);
  }
  return result;
}

function validateReviewers(manifest, config, exampleConfig, isLiveConfig) {
  assert(Array.isArray(manifest.requiredReviewerFields) && manifest.requiredReviewerFields.length > 0, "manifest must declare required reviewer fields");
  for (const field of manifest.requiredReviewerFields) {
    const value = getPath(config, field);
    assert(typeof value === "string" && /^[\p{L}\p{N}](?:[\p{L}\p{N} ._@'-]*[\p{L}\p{N}])?$/u.test(value.trim()), `Reviewer ${field} must be an auditable identifier`);
    assert(value.trim().toLowerCase() !== "not_assigned", `Reviewer ${field} must be assigned`);
    if (isLiveConfig) assert(value.trim() !== String(getPath(exampleConfig, field) ?? "").trim(), `Live config must replace example reviewer ${field}`);
  }
}

function resolvePackagePath(packageRoot, path, label) {
  assert(nonEmpty(path) && !path.startsWith("/") && !path.includes("\\") && !path.split("/").includes(".."), `${label} must be a package-relative path`);
  return resolve(packageRoot, ...path.split("/"));
}

function getPath(target, path) {
  return path.split(".").reduce((current, key) => current?.[key], target);
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
