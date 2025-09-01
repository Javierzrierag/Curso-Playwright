import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;

test.beforeEach(async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  await page.goto('http://localhost:3000/signup');
});

test('Create new User', async ({ page }) => {
  function generateEmailWithTimestamp(): string {
  const timestamp = Date.now(); 
  return `testuser${timestamp}@example.com`;
}
  const email = generateEmailWithTimestamp();
  await page.locator('[name="firstName"]').fill('Javier');
  await page.locator('[name="lastName"]').fill('Riera');
  await page.locator('[name="email"]').fill(email);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('javierriera123');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();

});

test('Failed to create user, email already exist', async ({ page }) => {
  await page.locator('[name="firstName"]').fill('Javier');
  await page.locator('[name="lastName"]').fill('Riera');
  await page.locator('[name="email"]').fill('javierriera@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('javierriera123');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('Email already in use')).toBeVisible();
});
