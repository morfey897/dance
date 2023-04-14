import { base64url } from 'rfc4648';

export function encodeB64(s: string) {
  return base64url.stringify(new TextEncoder().encode(s), { pad: false });
}

export function decodeB64(s: string): string {
  return new TextDecoder().decode(base64url.parse(s, { loose: true }));
}