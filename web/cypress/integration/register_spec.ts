describe('register page', () => {
  const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should have login link', () => {
    cy.get('[role=login]').should('exist');
    cy.get('[role=login]').should('have.text', 'Login');
    cy.get('[role=login]').click();
    cy.url().should('include', '/login');
  });

  // SUCCEEDS: skipping for now
  it.skip('should register a new user', () => {
    cy.get('[role=email').type(`${random}@gmail.com`);
    cy.get('[role=username').type(random);
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    // cy.url().should('include', '/login');
  });

  it('should get username taken error', () => {
    cy.get('[role=email').type(`${random}@gmail.com`);
    cy.get('[role=username').type('test');
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    cy.get('#field-4-feedback').should('contain', 'Username is already taken.');
  });

  it('should get username contains "@" error', () => {
    cy.get('[role=email').type(`${random}@gmail.com`);
    cy.get('[role=username').type('test@');
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    cy.get('#field-4-feedback').should('contain', 'Username cannot contain @');
  });

  it('should get username is not long enough error', () => {
    cy.get('[role=email').type(`123@gmail.com`);
    cy.get('[role=username').type('123');
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    cy.get('#field-4-feedback').should('contain', 'Username must be at least 4 characters long');
  });

  it('should get email in use error', () => {
    cy.get('[role=email').type(`test@gmail.com`);
    cy.get('[role=username').type(`${random}211`);
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    cy.get('#field-2-feedback').should('contain', 'Email is already in use.');
  });

  it('should get email does not contain "@" error', () => {
    cy.get('[role=email').type(`${random}gmail.com`);
    cy.get('[role=username').type(`${random}211`);
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password');
    cy.get('[role=submit').click();
    cy.get('#field-2-feedback').should('contain', 'Invalid email');
  });

  it('should get password is not long enough error', () => {
    cy.get('[role=email').type(`${random}2123@gmail.com`);
    cy.get('[role=username').type(`${random}211`);
    cy.get('[role=password').type('p');
    cy.get('[role=confirm-password').type('p');
    cy.get('[role=submit').click();
    cy.get('#field-6-feedback').should('contain', 'Password must be at least 4 characters');
  });

  it('should get password does not match error', () => {
    cy.get('[role=email').type(`${random}2123@gmail.com`);
    cy.get('[role=username').type(`${random}211`);
    cy.get('[role=password').type('password');
    cy.get('[role=confirm-password').type('password1');
    cy.get('[role=submit').click();
    cy.get('#field-8-feedback').should('contain', 'Passwords do not match');
  });
});

export {};
