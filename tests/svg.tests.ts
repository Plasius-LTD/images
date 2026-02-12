import { describe, it, expect } from "vitest";
import { sanitiseSVG, validateSvgAvatar } from "../src/validators/svgValidator.js";

describe("svg sanitizer", () => {
  it("strips disallowed tags, attributes, and comments", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" onclick="alert(1)" data-extra="1"><!--comment--><style>body{}</style><script>alert(1)</script><rect width="100" height="100" onload="evil()" /><g><path d="M0 0" data-test="x"/></g></svg>`;

    const { svg: cleaned, audit } = sanitiseSVG(svg, {
      allowedTags: ["svg", "rect", "g", "path"],
      allowedAttributes: {
        "*": ["width", "height", "d", "xmlns"],
      },
      allowComments: false,
      allowUnknownElements: false,
      allowUnknownAttributes: false,
    });

    expect(cleaned).not.toContain("script");
    expect(cleaned).not.toContain("style");
    expect(cleaned).not.toContain("onclick");
    expect(cleaned).not.toContain("onload");
    expect(cleaned).not.toContain("data-extra");
    expect(cleaned).not.toContain("data-test");
    expect(cleaned).not.toContain("comment");
    expect(audit.strippedTags).toEqual(
      expect.arrayContaining(["style", "script"])
    );
    expect(audit.strippedAttributes).toEqual(
      expect.arrayContaining([
        "svg.onclick",
        "svg.data-extra",
        "rect.onload",
        "path.data-test",
      ])
    );
  });

  it("keeps unknown elements and attributes when allowed", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><custom data-foo="bar"><rect width="10" height="10" /></custom></svg>`;

    const { svg: cleaned } = sanitiseSVG(svg, {
      allowedTags: ["svg", "rect"],
      allowedAttributes: {
        "*": ["width", "height", "xmlns"],
      },
      allowComments: true,
      allowUnknownElements: true,
      allowUnknownAttributes: true,
    });

    expect(cleaned).toContain("<custom");
    expect(cleaned).toContain("data-foo=\"bar\"");
  });
});

describe("svg avatar validation", () => {
  it("returns sanitized svg metadata", async () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" style="fill: red" /></svg>`;
    const result = await validateSvgAvatar(Buffer.from(svg, "utf8"));

    expect(result.format).toBe("svg");
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
    expect(result.safeBuffer.toString("utf8")).not.toContain("style=");
  });

  it("rejects oversized svgs", async () => {
    const payload = " ".repeat(256 * 1024 + 10);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg">${payload}</svg>`;

    expect(() => validateSvgAvatar(Buffer.from(svg, "utf8"))).toThrow(
      "SVG too large"
    );
  });
});
