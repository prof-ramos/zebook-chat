// __tests__/unit/app/page.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../../../app/page';
import React from 'react';

describe('Home', () => {
  it('deve renderizar a mensagem de boas-vindas', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText('Bem-vindo ao ZeBook');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('deve renderizar a descrição', () => {
    render(<Home />);
    const description = screen.getByText('Seu assistente jurídico para concursos públicos.');
    expect(description).toBeInTheDocument();
  });
});