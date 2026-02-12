export function detectFormat(
  buffer: Buffer
): "jpeg" | "png" | "webp" | "svg" | undefined {
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return "jpeg";
  }
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "png";
  }
  if (
    buffer.slice(0, 4).toString() === "RIFF" &&
    buffer.slice(8, 12).toString() === "WEBP"
  ) {
    return "webp";
  }

  const header = buffer.slice(0, 1000).toString("utf8").toLowerCase();
  if (header.includes("<svg")) {
    return "svg";
  }

  return undefined;
}
