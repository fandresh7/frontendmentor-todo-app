import { sleep } from './sleep'

describe('sleep', () => {
  it('should delay execution for the specified number of milliseconds', async () => {
    const delay = 500
    const start = Date.now()

    await sleep(delay)

    const end = Date.now()
    const elapsed = end - start

    expect(elapsed).toBeGreaterThanOrEqual(delay)
    expect(elapsed).toBeLessThan(delay + 50)
  })
})
