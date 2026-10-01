import { describe, expect, it } from 'vitest'
import { createConcurrencyLimiter } from '../concurrencyLimit'

describe('createConcurrencyLimiter', () => {
  it('never runs more than the limit at once, even as tasks finish and new ones arrive', async () => {
    const run = createConcurrencyLimiter(2)
    let active = 0
    let peak = 0
    const task = async () => {
      active++
      peak = Math.max(peak, active)
      await new Promise((resolve) => setTimeout(resolve, 1))
      active--
    }

    const first = Array.from({ length: 5 }, () => run(task))
    await first[0]
    await Promise.all([...first, ...Array.from({ length: 5 }, () => run(task))])

    expect(peak).toBe(2)
  })

  it('passes results and errors through', async () => {
    const run = createConcurrencyLimiter(1)
    await expect(run(async () => 42)).resolves.toBe(42)
    await expect(run(async () => Promise.reject(new Error('boom')))).rejects.toThrow('boom')
    await expect(run(async () => 'still works')).resolves.toBe('still works')
  })
})
