export function createId(prefix = 'item') {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}
