/*! 
 * CSS FCP v0.1.0
 * Homepage (https://github.com/jivtroy/css-fcp)
 * Copyright 2026 Jiv Troy
 * License: MIT
 */
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let critical = require("critical");
let purgecss = require("purgecss");
//#region src/extractCritical.js
async function extractCritical_default(base, page, options = null) {
	if (!base) throw new Error("Base url not found.");
	if (!page?.url) throw new Error("Page url not found.");
	const url = new URL(page.url, base);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Error fetching page: ${url}`);
	const settings = { html: await res.text() };
	if (options !== null) Object.assign(settings, options);
	if (page?.options) Object.assign(settings, page.options);
	return await (0, critical.critical)(settings);
}
//#endregion
//#region src/removeUnused.js
async function removeUnused_default(base, page, options = null) {
	if (!base) throw new Error("Base url not found.");
	if (!page?.url) throw new Error("Page url not found.");
	const url = new URL(page.url, base);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Error fetching page: ${url}`);
	const settings = { content: [{
		raw: await res.text(),
		extension: "html"
	}] };
	if (options !== null) Object.assign(settings, options);
	if (page?.options) Object.assign(settings, page.options);
	return await new purgecss.PurgeCSS().purge(settings);
}
//#endregion
exports.extractCritical = extractCritical_default;
exports.removeUnused = removeUnused_default;
