export function cloneFixture<TValue>(value: TValue): TValue {
    return JSON.parse(JSON.stringify(value)) as TValue
}