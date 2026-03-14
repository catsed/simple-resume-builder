import { moveArrayItemById } from '../../src/utils/moveArrayItem'

describe('moveArrayItemById', () => {
    test('moves an item up', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
            { id: '3', value: 'C' },
        ]

        const result = moveArrayItemById(items, '2', 'up')

        expect(result.map((item) => item.id)).toEqual(['2', '1', '3'])
    })

    test('does not change order when target item is first and moved up', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
        ]

        const result = moveArrayItemById(items, '1', 'up')

        expect(result).toEqual(items)
    })

    test('moves an item down', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
            { id: '3', value: 'C' },
        ]

        const result = moveArrayItemById(items, '2', 'down')

        expect(result.map((item) => item.id)).toEqual(['1', '3', '2'])
    })

    test('returns the same array reference when item id is not found', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
        ]

        const result = moveArrayItemById(items, 'missing-id', 'down')

        expect(result).toBe(items)
    })

    test('returns the same array reference when target item is last and moved down', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
        ]

        const result = moveArrayItemById(items, '2', 'down')

        expect(result).toBe(items)
    })

    test('does not mutate the original array when a move is valid', () => {
        const items = [
            { id: '1', value: 'A' },
            { id: '2', value: 'B' },
            { id: '3', value: 'C' },
        ]

        const result = moveArrayItemById(items, '3', 'up')

        expect(result).not.toBe(items)
        expect(items.map((item) => item.id)).toEqual(['1', '2', '3'])
        expect(result.map((item) => item.id)).toEqual(['1', '3', '2'])
    })
})