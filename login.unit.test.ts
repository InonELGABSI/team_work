import { authService } from './src/services/authService'

describe('login feature', () => {
  it('logs in with valid demo credentials', async () => {
    await expect(
      authService.login({
        email: 'demo@demo.com',
        password: '123456',
      }),
    ).resolves.toEqual({ email: 'demo@demo.com' })
  })

  it('rejects invalid credentials', async () => {
    await expect(
      authService.login({
        email: 'wrong@demo.com',
        password: 'invalid',
      }),
    ).rejects.toThrow('Invalid credentials')
  })

  it('normalizes email and trims password', async () => {
    await expect(
      authService.login({
        email: '  DEMO@DEMO.COM  ',
        password: '123456   ',
      }),
    ).resolves.toEqual({ email: 'demo@demo.com' })
  })
})
