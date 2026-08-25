export function parseCompletedSteps(raw: string | null, stepCount: number) {
  try {
    const value: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item): item is number => Number.isInteger(item) && item >= 1 && item <= stepCount))];
  } catch {
    return [];
  }
}
