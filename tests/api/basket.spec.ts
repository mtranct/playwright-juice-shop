import { test, expect } from '@playwright/test';

test.describe('Defect DEF-001: basket negative quantity', () => {
  test.fail(); // Known Juice Shop gap — see defects/DEF-001-basket-negative-quantity.md

  test('server should reject a negative basket item quantity', async ({ request }) => {
    const email = `qe-test-${Date.now()}@test.com`;
    const password = 'Password123!';

    await request.post('/api/Users', {
      data: {
        email,
        password,
        passwordRepeat: password,
        securityQuestion: { id: 9, question: 'placeholder', createdAt: '2020-01-01T00:00:00.000Z', updatedAt: '2020-01-01T00:00:00.000Z' },
        securityAnswer: 'na',
      },
    });

    const loginRes = await request.post('/rest/user/login', { data: { email, password } });
    const loginBody = await loginRes.json();
    const token = loginBody.authentication.token;

    const basketRes = await request.post('/api/BasketItems/', {
      headers: { Authorization: `Bearer ${token}` },
      data: { ProductId: 1, BasketId: String(loginBody.authentication.bid), quantity: 1 },
    });
    const basketBody = await basketRes.json();
    const itemId = basketBody.data.id;

    const patchRes = await request.put(`/api/BasketItems/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { quantity: -100 },
    });

    expect(patchRes.status(), 'Server should reject negative quantity with 400').toBe(400);
  });
});