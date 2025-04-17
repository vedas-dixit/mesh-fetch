import { pick } from '../../src/objects/pick';

describe('pick', () => {
    it('should pick simple properties from an object', () => {
        const obj = { name: 'John', age: 30, email: 'john@example.com' };
        const result = pick(obj, ['name', 'age']);
        expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should pick nested properties using dot notation', () => {
        const obj = {
            name: 'John',
            details: {
                age: 30,
                address: {
                    street: '123 Main St',
                    city: 'Boston'
                }
            }
        };
        const result = pick(obj, ['name', 'details.age', 'details.address.city']);
        expect(result).toEqual({
            name: 'John',
            details: {
                age: 30,
                address: {
                    city: 'Boston'
                }
            }
        });
    });

    it('should handle array indices', () => {
        const obj = {
            name: 'John',
            phones: ['123-456-7890', '098-765-4321'],
            contacts: [
                { type: 'email', value: 'john@example.com' },
                { type: 'phone', value: '555-0123' }
            ]
        };
        const result = pick(obj, ['name', 'phones.0', 'contacts.1.type']);
        expect(result).toEqual({
            name: 'John',
            phones: ['123-456-7890'],
            contacts: [undefined, { type: 'phone' }]
        });
    });

    it('should handle wildcards in arrays', () => {
        const obj = {
            contacts: [
                { type: 'email', value: 'john@example.com' },
                { type: 'phone', value: '555-0123' }
            ]
        };
        const result = pick(obj, ['contacts.*.type']);
        expect(result).toEqual({
            contacts: [{ type: 'email' }, { type: 'phone' }]
        });
    });

    it('should preserve prototype chain when option is set', () => {
        class Person {
            constructor(public name: string, public age: number) {}
            greet() { return `Hello, ${this.name}`; }
        }
        const person = new Person('John', 30);
        const result = pick(person, ['name'], { preservePrototype: true });
        expect(result).toEqual({ name: 'John' });
        expect(Object.getPrototypeOf(result)).toBe(Person.prototype);
    });

    it('should handle non-enumerable properties when option is set', () => {
        const obj = { name: 'John', age: 30 };
        Object.defineProperty(obj, 'id', {
            value: '12345',
            enumerable: false
        });
        const result = pick(obj, ['name', 'id'], { includeNonEnumerable: true });
        expect(result).toEqual({ name: 'John', id: '12345' });
    });

    it('should handle special types', () => {
        const date = new Date('2024-01-01');
        const regex = /test/g;
        const map = new Map([['key', 'value']]);
        const set = new Set(['item']);
        const error = new Error('test error');

        const obj = {
            date,
            regex,
            map,
            set,
            error
        };

        const result = pick(obj, ['date', 'regex', 'map', 'set', 'error']);
        
        expect(result.date!).toBeInstanceOf(Date);
        expect(result.date!.getTime()).toBe(date.getTime());
        expect(result.regex!).toBeInstanceOf(RegExp);
        expect(result.regex!.source).toBe(regex.source);
        expect(result.map).toBeInstanceOf(Map);
        expect(result.set).toBeInstanceOf(Set);
        expect(result.error).toBeInstanceOf(Error);
    });

    it('should handle circular references', () => {
        // Create a simple circular object
        const obj: any = { name: 'John', age: 30 };
        obj.self = obj;

        // Only pick non-circular properties
        const result = pick(obj, ['name', 'age']);
        expect(result.name).toBe('John');
        expect(result.age).toBe(30);
        expect(result.self).toBeUndefined();
    });

    it('should handle undefined and null values', () => {
        const obj = {
            name: 'John',
            details: null,
            settings: undefined,
            nested: {
                value: null
            }
        };
        const result = pick(obj, ['name', 'details', 'settings', 'nested.value']);
        expect(result).toEqual({
            name: 'John',
            details: null,
            nested: {
                value: null
            }
        });
    });

    it('should handle empty paths array', () => {
        const obj = { name: 'John', age: 30 };
        const result = pick(obj, []);
        expect(result).toEqual({});
    });

    it('should handle non-existent paths', () => {
        const obj = { name: 'John' };
        const result = pick(obj, ['name', 'age', 'details.address']);
        expect(result).toEqual({ name: 'John' });
    });
}); 