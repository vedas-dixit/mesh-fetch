import '@testing-library/jest-dom';

// Mock fetch API
global.fetch = jest.fn();

// Mock Response constructor
class MockResponse {
  private body: string;
  private init: ResponseInit;
  public ok: boolean;
  public status: number;
  public headers: Headers;

  constructor(body: string | object, init: ResponseInit = {}) {
    this.body = typeof body === 'string' ? body : JSON.stringify(body);
    this.init = init;
    this.ok = init.status ? init.status >= 200 && init.status < 300 : true;
    this.status = init.status || 200;
    this.headers = new Headers(init.headers);
  }

  async json() {
    return JSON.parse(this.body);
  }

  async text() {
    return this.body;
  }
}

global.Response = MockResponse as any;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock performance.now()
if (!window.performance) {
  Object.defineProperty(window, 'performance', {
    value: {
      now: jest.fn(() => Date.now()),
    },
    writable: true,
  });
}

// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  (global.fetch as jest.Mock).mockClear();
}); 