// __tests__/unit/lib/supabaseClient.test.ts
import { createSupabaseClient } from '../../../lib/supabaseClient';

// Mock do createClient do @supabase/ssr
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

// Mock do cookies
jest.mock('next/headers', () => {
  return {
    cookies: jest.fn().mockReturnValue({
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    }),
  };
});

describe('supabaseClient', () => {
  it('deve criar um cliente Supabase', () => {
    // Definindo variáveis de ambiente mockadas
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://mock.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'mock-anon-key';

    const client = createSupabaseClient();
    expect(client).toBeDefined();
  });
});