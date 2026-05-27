import type { ImageValidationResult } from "./avatarValidator.js";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import type { Element as XmlElement } from "@xmldom/xmldom";

const UNSUPPORTED_CSS_REFERENCE_PATTERN = /url\s*\(|@import\b|expression\s*\(/i;

function unescapeCssReferences(value: string): string {
  return value
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_match, hex) => {
      const codePoint = Number.parseInt(hex, 16);
      return String.fromCodePoint(codePoint);
    })
    .replace(/\\(.)/g, "$1");
}

export function sanitiseSVG(
  svgText: string,
  options: {
    allowedTags: string[];
    allowedAttributes: { "*": string[] };
    allowComments: boolean;
    allowUnknownElements: boolean;
    allowUnknownAttributes: boolean;
  }
): {
  svg: string;
  audit: { strippedTags: string[]; strippedAttributes: string[] };
} {
  const strippedTags: string[] = [];
  const strippedAttributes: string[] = [];

  const parser = new DOMParser({
    onError: (
      level: "warning" | "error" | "fatalError",
      msg: string
    ): void => {
      switch (level) {
        case "warning":
          break;
        default:
          throw new Error(msg);
      }
    },
  });
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(svgText, "image/svg+xml");

  function cleanNode(node: Node | null) {
    if (node === null) return;

    if (node.nodeType === 8 /* Comment */ && !options.allowComments) {
      node.parentNode?.removeChild(node);
      return;
    }

    if (node.nodeType === 1 /* Element */) {
      const el = node as unknown as XmlElement;
      const tagName = el.tagName.toLowerCase();

      // Strip <style> elements entirely
      if (tagName === "style") {
        strippedTags.push(tagName);
        node.parentNode?.removeChild(node);
        return;
      }

      if (
        !options.allowedTags.includes(tagName) &&
        !options.allowUnknownElements
      ) {
        strippedTags.push(tagName);
        node.parentNode?.removeChild(node);
        return;
      }

      // Clean attributes
      const allowedAttrs = options.allowedAttributes["*"] || [];

      const toRemove: string[] = [];
      for (const attr of Array.from(el.attributes)) {
        const attrName = attr.name.toLowerCase();

        if (attrName.startsWith("on")) {
          toRemove.push(attr.name);
          strippedAttributes.push(`${tagName}.${attr.name}`);
          continue;
        }
        if (attrName === "xlink:href" || attrName === "xmlns:xlink") {
          toRemove.push(attr.name);
          strippedAttributes.push(`${tagName}.${attr.name}`);
          continue;
        }
        if (attrName === "style") {
          toRemove.push(attr.name);
          strippedAttributes.push(`${tagName}.${attr.name}`);
          continue;
        }

        if (
          !allowedAttrs.includes(attr.name) &&
          !options.allowUnknownAttributes
        ) {
          toRemove.push(attr.name);
          strippedAttributes.push(`${tagName}.${attr.name}`);
        }
      }
      toRemove.forEach((attrName) => el.removeAttribute(attrName));
    }

    // Recursively clean children
    const children = Array.from(node.childNodes);
    children.forEach((child) => cleanNode(child));
  }

  cleanNode(doc.documentElement as unknown as Node);

  return {
    svg: serializer.serializeToString(doc),
    audit: { strippedTags, strippedAttributes },
  };
}

function collectUnsupportedCssBearingContent(svgText: string): string[] {
  const parser = new DOMParser({
    onError: (
      level: "warning" | "error" | "fatalError",
      msg: string
    ): void => {
      switch (level) {
        case "warning":
          break;
        default:
          throw new Error(msg);
      }
    },
  });
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const findings: string[] = [];

  function inspectNode(node: Node | null): void {
    if (node === null) return;

    if (node.nodeType === 1 /* Element */) {
      const el = node as unknown as XmlElement;
      const tagName = el.tagName.toLowerCase();

      if (tagName === "style") {
        findings.push("<style>");
      }

      for (const attr of Array.from(el.attributes)) {
        const attrName = attr.name.toLowerCase();

        if (attrName === "style") {
          findings.push(`${tagName}.style`);
          continue;
        }

        const unescapedAttributeValue = unescapeCssReferences(attr.value);
        if (
          UNSUPPORTED_CSS_REFERENCE_PATTERN.test(attr.value) ||
          UNSUPPORTED_CSS_REFERENCE_PATTERN.test(unescapedAttributeValue)
        ) {
          findings.push(`${tagName}.${attr.name}`);
        }
      }
    }

    for (const child of Array.from(node.childNodes)) {
      inspectNode(child);
    }
  }

  inspectNode(doc.documentElement as unknown as Node);

  return findings;
}

export async function validateSvgAvatar(
  buffer: Buffer
): Promise<ImageValidationResult> {
  const svgText = buffer.toString("utf8");
  const unsupportedCssContent = collectUnsupportedCssBearingContent(svgText);

  if (unsupportedCssContent.length > 0) {
    throw new Error(
      `SVG contains unsupported CSS-bearing content: ${unsupportedCssContent.join(", ")}`
    );
  }

  const { svg: cleanSvg } = sanitiseSVG(svgText, {
    allowedTags: [
      "svg",
      "g",
      "rect",
      "circle",
      "ellipse",
      "line",
      "polygon",
      "polyline",
      "path",
      "text",
      "title",
      "desc",
    ],
    allowedAttributes: {
      "*": [
        "width",
        "height",
        "viewBox",
        "xmlns",
        "transform",
        "x",
        "y",
        "cx",
        "cy",
        "r",
        "rx",
        "ry",
        "x1",
        "y1",
        "x2",
        "y2",
        "points",
        "d",
        "fill",
        "stroke",
        "stroke-width",
        "font-family",
        "font-size",
        "text-anchor",
      ],
    },

    allowComments: false,
    allowUnknownElements: false,
    allowUnknownAttributes: false,
  });

  const cleanBuffer = Buffer.from(cleanSvg, "utf8");

  // Basic sanity checks
  if (cleanBuffer.length > 256 * 1024) {
    throw new Error("SVG too large (max 256 KB)");
  }

  return {
    width: 0, // SVG is scalable, can’t guarantee pixel dimensions
    height: 0,
    format: "svg",
    size: cleanBuffer.length,
    safeBuffer: cleanBuffer,
  };
}
