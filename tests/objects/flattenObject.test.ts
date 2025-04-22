import { flattenObject } from '../../src/objects/flattenObject';

describe('flattenObject', () => {
  it('should flatten a simple object', () => {
    const input = {
      name: 'John',
      age: 30,
    };
    const expected = {
      name: 'John',
      age: 30,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should flatten nested objects', () => {
    const input = {
      user: {
        name: 'John',
        details: {
          age: 30,
          address: {
            city: 'New York',
            country: 'USA',
          },
        },
      },
    };
    const expected = {
      'user.name': 'John',
      'user.details.age': 30,
      'user.details.address.city': 'New York',
      'user.details.address.country': 'USA',
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle arrays', () => {
    const input = {
      users: ['John', 'Jane'],
      scores: [
        { math: 90, science: 85 },
        { math: 95, science: 92 },
      ],
    };
    const expected = {
      'users.0': 'John',
      'users.1': 'Jane',
      'scores.0.math': 90,
      'scores.0.science': 85,
      'scores.1.math': 95,
      'scores.1.science': 92,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle null and undefined values', () => {
    const input = {
      name: null,
      details: {
        age: undefined,
        address: null,
      },
    };
    const expected = {
      name: null,
      'details.age': undefined,
      'details.address': null,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const input = {
      emptyObj: {},
      emptyArr: [],
      nested: {
        emptyObj: {},
        emptyArr: [],
      },
    };
    const expected = {
      emptyObj: {},
      emptyArr: [],
      'nested.emptyObj': {},
      'nested.emptyArr': [],
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle special object types', () => {
    const date = new Date('2024-01-01');
    const regex = /test/g;
    const input = {
      date: date,
      regex: regex,
      nested: {
        date: date,
        regex: regex,
      },
    };
    const expected = {
      date: date,
      regex: regex,
      'nested.date': date,
      'nested.regex': regex,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle circular references', () => {
    const input: any = {
      a: 1,
      b: {
        c: 2,
      },
    };
    input.b.d = input;

    expect(() => flattenObject(input)).not.toThrow();
    const result = flattenObject(input);
    expect(result['a']).toBe(1);
    expect(result['b.c']).toBe(2);
    // The circular reference should be handled gracefully
    expect(result['b.d']).toBeDefined();
  });

  it('should handle complex nested structures', () => {
    const input = {
      users: [
        {
          name: 'John',
          contacts: {
            email: ['john@example.com', 'john.doe@example.com'],
            phones: [
              { type: 'home', number: '123' },
              { type: 'work', number: '456' },
            ],
          },
        },
      ],
    };
    const expected = {
      'users.0.name': 'John',
      'users.0.contacts.email.0': 'john@example.com',
      'users.0.contacts.email.1': 'john.doe@example.com',
      'users.0.contacts.phones.0.type': 'home',
      'users.0.contacts.phones.0.number': '123',
      'users.0.contacts.phones.1.type': 'work',
      'users.0.contacts.phones.1.number': '456',
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should preserve empty strings and zero values', () => {
    const input = {
      empty: '',
      zero: 0,
      nested: {
        empty: '',
        zero: 0,
      },
    };
    const expected = {
      empty: '',
      zero: 0,
      'nested.empty': '',
      'nested.zero': 0,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle objects with no prototype', () => {
    const input = Object.create(null);
    input.a = 1;
    input.b = { c: 2 };

    const expected = {
      a: 1,
      'b.c': 2,
    };
    expect(flattenObject(input)).toEqual(expected);
  });
});
