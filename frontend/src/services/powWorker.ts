import { solve } from './powSolver'

// One proof-of-work search lane, off the main thread so solving never
// stutters the UI. session.ts runs several of these side by side.
self.onmessage = (event: MessageEvent<{ challenge: string; bits: number; start: number; stride: number }>) => {
  const { challenge, bits, start, stride } = event.data
  self.postMessage({ nonce: solve(challenge, bits, start, stride) })
}
