export function parseSvg(buffer: Buffer): {
  width: number;
  height: number;
} {
  const text = buffer.toString("utf8");

  const matchViewBox = /viewBox\s*=\s*"([^"]+)"/i.exec(text);
  const matchWidth = /width\s*=\s*"(\d+)(px)?"/i.exec(text);
  const matchHeight = /height\s*=\s*"(\d+)(px)?"/i.exec(text);

  let width: number | undefined;
  let height: number | undefined;

  if (matchWidth && matchHeight) {
    width = parseInt(matchWidth[1], 10);
    height = parseInt(matchHeight[1], 10);
  } else if (matchViewBox) {
    const parts = matchViewBox[1].split(/\s+/);
    if (parts.length === 4) {
      width = parseFloat(parts[2]);
      height = parseFloat(parts[3]);
    }
  }

  if (!width || !height) {
    throw new Error("Could not determine SVG dimensions");
  }

  return { width, height };
}
