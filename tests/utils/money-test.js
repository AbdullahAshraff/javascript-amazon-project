import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite: format currency', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2394)).toEqual('23.94');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds well when .5', () => {
        expect(formatCurrency(2394.5)).toEqual('23.95');
    });

    it('rounds well when .4', () => {
        expect(formatCurrency(2394.4)).toEqual('23.94');
    });

    it('rounds well when negative number', () => {
        expect(formatCurrency(-2394)).toEqual('23.94');
    });

    it('logs error when passing anything not a number', () => {
        expect(formatCurrency(undefined)).toEqual(undefined);
    });

    // The following test was made using AI TOOLS
    describe('test suite: format currency made With AI', () => {
        it('should format positive prices correctly', () => {
            expect(formatCurrency(100)).toBe('1.00');
            expect(formatCurrency(12345)).toBe('123.45');
            expect(formatCurrency(999)).toBe('9.99');
        });

        it('should format negative prices correctly', () => {
            expect(formatCurrency(-100)).toBe('1.00');
            expect(formatCurrency(-12345)).toBe('123.45');
            expect(formatCurrency(-999)).toBe('9.99');
        });

        it('should handle zero correctly', () => {
            expect(formatCurrency(0)).toBe('0.00');
        });

        it('should return undefined and log an error when input is not a number', () => {
            spyOn(console, 'error'); // Spy on console.error

            expect(formatCurrency('100')).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(
                'price entered is not a number'
            );

            expect(formatCurrency(null)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(
                'price entered is not a number'
            );

            expect(formatCurrency(undefined)).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(
                'price entered is not a number'
            );

            expect(formatCurrency({})).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(
                'price entered is not a number'
            );

            expect(formatCurrency([])).toBeUndefined();
            expect(console.error).toHaveBeenCalledWith(
                'price entered is not a number'
            );
        });

        it('should round the prices correctly', () => {
            expect(formatCurrency(100.49)).toBe('1.00');
            expect(formatCurrency(100.5)).toBe('1.01');
            expect(formatCurrency(-100.49)).toBe('1.00');
            expect(formatCurrency(-100.5)).toBe('1.01');
        });
    });
});
