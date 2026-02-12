export function parsePng(buffer: Buffer): {
  width: number;
  height: number;
} {
  // IHDR chunk is at byte 8+8 = 16
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}
