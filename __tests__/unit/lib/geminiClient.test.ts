// __tests__/unit/lib/geminiClient.test.ts
import { getGeminiResponse } from '../../../lib/geminiClient';

// Mock do GoogleGenerativeAI
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

describe('geminiClient', () => {
  it('deve retornar uma resposta do Gemini', async () => {
    const response = await getGeminiResponse('Pergunta de teste');
    expect(response).toBe('Resposta de teste do Gemini');
  });
});