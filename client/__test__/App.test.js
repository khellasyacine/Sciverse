import { render, screen } from '@testing-library/react';
import verifyMdp from './verifyMdp';
import { expect, it, describe } from 'vitest';
describe('App', () => {
    it('verifyMdp returns true for identical passwords', () => { 
        const password1 = 'password123';
        const password2 = 'password123'; 
        const result = verifyMdp(password1, password2); 
        expect(result).toBe(true); 
       });
    it('verifyMdp returns true for identical passwords', () => { 
        const password1 = 'password321';
        const password2 = 'password123'; 
        const result = verifyMdp(password1, password2); 
        expect(result).toBe(false); 
       });
  });
  