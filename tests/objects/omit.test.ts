import { omit } from '../../src/objects/omit';

describe('omit', () => {
  it('should omit specified properties from object', () => {
    interface UserInput {
      name: string;
      age: number;
      email: string;
      password: string;
    }
    const input: UserInput = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      password: 'secret',
    };
    const result = omit<UserInput, 'password' | 'email'>(input, ['password', 'email']);
    expect(result).toEqual({
      name: 'John',
      age: 30,
    });
  });

  it('should handle nested objects', () => {
    interface NestedInput {
      name: string;
      details: {
        age: number;
        email: string;
        address: {
          city: string;
          country: string;
        };
      };
    }
    const input: NestedInput = {
      name: 'John',
      details: {
        age: 30,
        email: 'john@example.com',
        address: {
          city: 'New York',
          country: 'USA',
        },
      },
    };
    const result = omit<NestedInput, 'details'>(input, ['details']);
    expect(result).toEqual({
      name: 'John',
    });
  });

  it('should handle arrays', () => {
    interface Contact {
      type: string;
      value: string;
    }
    interface ArrayInput {
      name: string;
      contacts: Contact[];
    }
    const input: ArrayInput = {
      name: 'John',
      contacts: [
        { type: 'email', value: 'john@example.com' },
        { type: 'phone', value: '123-456-7890' },
      ],
    };
    const result = omit<ArrayInput, 'contacts'>(input, ['contacts']);
    expect(result).toEqual({
      name: 'John',
    });
  });

  it('should handle non-existent paths', () => {
    interface SimpleInput {
      name: string;
      age: number;
    }
    const input: SimpleInput = {
      name: 'John',
      age: 30,
    };
    const result = omit<SimpleInput, 'age'>(input, ['age']);
    expect(result).toEqual({
      name: 'John',
    });
  });

  it('should handle empty objects', () => {
    const input = {} as Record<string, unknown>;
    const result = omit(input, []);
    expect(result).toEqual({});
  });

  it('should handle empty paths array', () => {
    interface SimpleInput {
      name: string;
      age: number;
    }
    const input: SimpleInput = {
      name: 'John',
      age: 30,
    };
    const result = omit<SimpleInput, never>(input, []);
    expect(result).toEqual(input);
  });

  it('should handle null and undefined values', () => {
    interface NullableInput {
      name: string;
      age: null;
      email: undefined;
      details: {
        address: null;
      };
    }
    const input: NullableInput = {
      name: 'John',
      age: null,
      email: undefined,
      details: {
        address: null,
      },
    };
    const result = omit<NullableInput, 'age' | 'details'>(input, ['age', 'details']);
    expect(result).toEqual({
      name: 'John',
      email: undefined,
    });
  });

  it('should handle special object types', () => {
    interface SpecialInput {
      date: Date;
      regex: RegExp;
      name: string;
    }
    const date = new Date();
    const regex = /test/g;
    const input: SpecialInput = {
      date,
      regex,
      name: 'John',
    };
    const result = omit<SpecialInput, 'name'>(input, ['name']);
    expect(result).toEqual({
      date,
      regex,
    });
  });

  it('should preserve object prototype when specified', () => {
    class User {
      constructor(
        public name: string,
        public age: number,
        public email: string
      ) {}
      getInfo() {
        return `${this.name}, ${this.age}`;
      }
    }

    const user = new User('John', 30, 'john@example.com');
    const result = omit<User, 'email'>(user, ['email'], { preservePrototype: true }) as User;

    expect(result instanceof User).toBe(true);
    expect(result.getInfo()).toBe('John, 30');
  });

  it('should handle circular references', () => {
    interface CircularInput {
      name: string;
      details: {
        age: number;
        parent?: CircularInput;
      };
      self?: CircularInput;
    }
    const input = {
      name: 'John',
      details: {
        age: 30,
      },
    } as CircularInput;
    input.self = input;
    input.details.parent = input;

    const result = omit<CircularInput, 'self'>(input, ['self']);
    expect(result.name).toBe('John');
    expect(result.details.parent).toBe(input);
    expect((result as any).self).toBeUndefined();
  });

  it('should handle non-enumerable properties when specified', () => {
    const input = Object.create(null) as { visible: number; hidden: number };
    Object.defineProperty(input, 'visible', {
      value: 1,
      enumerable: true,
    });
    Object.defineProperty(input, 'hidden', {
      value: 2,
      enumerable: false,
    });

    const result = omit<typeof input, 'visible'>(input, ['visible'], {
      includeNonEnumerable: true,
    });
    expect(Object.getOwnPropertyDescriptor(result, 'hidden')).toBeDefined();
    expect((result as any).visible).toBeUndefined();
  });
});
