import { test, expect } from '@playwright/test';

test.describe('Defect DEF-002: registration password mismatch', () => {
  test.fail(); // Known Juice Shop gap — see defects/DEF-002-registration-password-mismatch.md

  test('server should reject mismatched password and passwordRepeat', async ({ request }) => {
    const email = `qe-test-${Date.now()}@test.com`;

    const res = await request.post('/api/Users', {
      data: {
        email,
        password: 'Password123!',
        passwordRepeat: 'CompletelyDifferent456!',
        securityQuestion: {
          id: 9,
          question: 'Your eldest siblings middle name?',
          createdAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
        securityAnswer: 'na',
      },
    });

    // Expected (correct) behavior — should be a 400, so this currently fails, documenting DEF-002.
    expect(res.status(), 'Server should reject mismatched passwords with 400').toBe(400);
  });
});