// __tests__/unit/app/page.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../../../app/page';
import React from 'react';

// Mock do fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    body: null,
  } as Response)
) as jest.Mock;

describe('Home', () => {
  it('deve renderizar o título da aplicação', () => {
    render(<Home />);
    const title = screen.getByText('ZeBook · Tutor Jurídico');
    expect(title).toBeInTheDocument();
  });

  it('deve renderizar o campo de entrada de perguntas', () => {
    render(<Home />);
    const textarea = screen.getByPlaceholderText('Ex.: Diferencie ato administrativo vinculado e discricionário.');
    expect(textarea).toBeInTheDocument();
  });

  it('deve renderizar o botão de perguntar', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: 'Perguntar' });
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar a seção de resposta', () => {
    render(<Home />);
    const responseSection = screen.getByText('Resposta');
    expect(responseSection).toBeInTheDocument();
  });

  it('deve renderizar a seção de fontes', () => {
    render(<Home />);
    const sourcesSection = screen.getByText('Fontes');
    expect(sourcesSection).toBeInTheDocument();
  });
});