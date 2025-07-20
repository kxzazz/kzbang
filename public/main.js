import { bangs } from "./bang.js";

function generateRedirectUrl() {
  //get params
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";

  //no query just return
  if (!query) return;

  //find bang and search term
  const match = query.match(/!(\S+)/i);
  const selectedBang =
    bangs.find((b) => b.t === match?.[1]?.toLowerCase()) ??
    bangs.find((b) => b.t === "google");
  const searchTerm = query.replace(/!\S+\s*/i, "").trim();

  //generate redirect url
  const redirectUrl = selectedBang?.u.replace(
    "{{{s}}}",
    encodeURIComponent(searchTerm)
  );

  if (!redirectUrl) return;
  return redirectUrl;
}
/*NOTE: defaults of bangs is google... might change in the future*/

function main() {
  const redirectUrl = generateRedirectUrl();
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

main();
