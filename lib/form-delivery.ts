export type FormKind = "contact" | "submission";
export type FormMode = "formspree" | "mailto" | "disabled";
export type FormDeliveryResult = "sent" | "error";

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export function getFormspreeEndpoint(value = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT) {
  try {
    const url = new URL(value?.trim() || "");
    if (url.protocol !== "https:" || url.hostname !== "formspree.io" || !url.pathname.startsWith("/f/")) return "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function getFormMode(kind: FormKind, endpointValue = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT, contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL): FormMode {
  if (getFormspreeEndpoint(endpointValue)) return "formspree";
  if (kind === "contact" && contactEmail?.trim()) return "mailto";
  return "disabled";
}

export async function submitToFormspree(endpointValue: string, data: FormData, fetcher: Fetcher = fetch): Promise<FormDeliveryResult> {
  const endpoint = getFormspreeEndpoint(endpointValue);
  if (!endpoint) return "error";
  try {
    const response = await fetcher(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    return response.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
