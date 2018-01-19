/**
 * Splits the given string around runs of white-space, converts each part into
 * a number, then yields it.
 *
 * @example
 * // returns [123, 456]
 * lineToNumbers('123 456');
 *
 * @param line A string containing numbers separated by white-space.
 * @return A sequence of numbers parsed from the string.
 */
export function* lineToNumbers(line: string): Iterable<number> {
    const trimmed = line.trim();
    if (trimmed === '') {
        return;
    }
    const parts: Iterable<string> = trimmed.split(/\s+/);
    for (const part of parts) {
        yield Number(part);
    }
}

function isIterable<T>(obj: object): obj is Iterable<T> {
    return obj != null
        && typeof (obj[Symbol.iterator]) === 'function';
}

/**
 * Returns the difference between the largest and the smallest value in the given sequence of numbers.
 * Returns 0 for an empty sequence;
 */
export function minMaxLineSum(numbers: Iterable<number>): number {
    let min: number | null = null;
    let max: number | null = null;

    for (const num of numbers) {
        if (min == null) {
            min = num;
        }
        if (max == null) {
            max = num;
        }
        min = Math.min(min, num);
        max = Math.max(max, num);
    }

    if (min == null || max == null) {
        return 0;
    } else {
        return max - min;
    }
}

/**
 * Yields every distinct pair of items in an array.
 */
export function* iteratePairs<TItem>(items: TItem[]):
    IterableIterator<[TItem, TItem]> {
    if (items.length < 2) {
        return;
    }
    for (let i = 0; i < items.length - 1; i += 1) {
        for (let j = i + 1; j < items.length; j += 1) {
            yield [items[i], items[j]];
        }
    }
}

/**
 * Returns the difference between the two evenly divisible numbers in the sequence.
 */
export function evenDivLineSum(numbers: Iterable<number>): number {
    for (let [min, max] of iteratePairs([...numbers])) {
        // swap min and max if they're in the wrong order
        if (min > max) {
            [min, max] = [max, min];
        }
        // is max evenly divisible by min?
        if (max % min === 0) {
            return max / min;
        }
    }

    return 0;
}

/**
 * Computes a checksum for a sequence of strings with numbers.
 *
 * @example
 * const summer = new CheckSummer();
 * summer.addLine('1 2 3');
 * summer.addLine('4 5 6');
 * // returns 4
 * summer.sum;
 */
export class CheckSummer {
    private _sum: number = 0;

    constructor(
        private readonly _lineSumFunc: (numbers: Iterable<number>) => number
    ) { }
    /**
     * Returns the computed checksum.
     */
    get sum(): number { return this._sum; }

    /**
     * Includes the given line in the checksum.
     *
     * @returns This object.
     */
    public addLine(line: string | Iterable<number>): this {
        let numbers: Iterable<number>;
        if (typeof (line) === 'string') {
            numbers = lineToNumbers(line);
        } else if (isIterable<number>(line)) {
            numbers = line;
        }

        const lineSum = this._lineSumFunc(numbers);
        this._sum += lineSum;

        return this;
    }
}
