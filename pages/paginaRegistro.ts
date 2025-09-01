import {Page, Locator} from '@playwright/test';

export class PaginaRegistro {
    readonly page: Page;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly botonRegistrarse: Locator;
    readonly mensajeRegistroExitoso: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        this.inputFirstName = page.locator('[name="firstName"]');
        this.inputLastName = page.locator('[name="lastName"]');
        this.inputEmail = page.locator('[name="email"]');
        this.inputPassword = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonRegistrarse = page.getByRole('button', { name: 'Registrarse' });
        this.mensajeRegistroExitoso = page.getByText('Registro exitoso!');
    }
}