// __tests__/setup.ts
import '@testing-library/jest-dom';

// Adiciona suporte para JSX no TypeScript
import React from 'react';

// Mock do next/headers
jest.mock('next/headers', () => {
  return {
    cookies: jest.fn().mockReturnValue({
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    }),
  };
});

// Mock do @supabase/ssr
jest.mock('@supabase/ssr', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        auth: {
          getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
        },
      };
    }),
  };
});

// Mock do @google/generative-ai
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: jest.fn().mockResolvedValue('Resposta de teste do Gemini'),
            },
          }),
        }),
      };
    }),
  };
});