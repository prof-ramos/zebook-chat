// __tests__/unit/app/layout.test.tsx
import { render, screen } from '@testing-library/react';
import RootLayout from '../../../app/layout';
import React from 'react';

// Mock do i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('RootLayout', () => {
  it('deve renderizar o layout com children', () => {
    render(
      <RootLayout>
        <div>Conteúdo de teste</div>
      </RootLayout>
    );
    
    const testContent = screen.getByText('Conteúdo de teste');
    expect(testContent).toBeInTheDocument();
  });
});