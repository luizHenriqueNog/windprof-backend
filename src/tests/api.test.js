const request = require('supertest');
const app = require('../app');
const openaiService = require('../services/openaiService');

jest.mock('../services/openaiService', () => ({
    translateCss: jest.fn(),
}));

describe('API tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Bem vindo(a) à API do TransformAI.");
  });

  describe('POST /translate', () => {
    test('should return translated result on success', async () => {
      const mockMessage = 'Test message';
      const mockResult = { translated: 'Mensagem de teste' };
      openaiService.translateCss.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/translate')
        .send({ messages: [{ content: mockMessage }] });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockResult);
      expect(openaiService.translateCss).toHaveBeenCalledWith(mockMessage, expect.anything());
    });

    test('should return 500 on translation service failure', async () => {
      openaiService.translateCss.mockRejectedValue(new Error('Mock error'));

      const response = await request(app)
        .post('/translate')
        .send({ messages: [{ content: 'Test message' }] });

      expect(response.statusCode).toBe(500);
    });
  });
});