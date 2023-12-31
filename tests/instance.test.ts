import { buildQueryParams, init } from '../src/services/init'
describe('Service `instance`', () => {
    test('method `setInstanceBaseURL`', () => {
        const { axiosInstance, setInstanceBaseURL } = init()
        const baseURL = 'fakeURL'

        setInstanceBaseURL(baseURL)
        expect(axiosInstance.defaults.baseURL).toBe(baseURL)
    })

    test('methods `setInstanceToken` and `resetInstanceToken`', () => {
        const { axiosInstance, setInstanceToken, resetInstanceToken } = init()
        setInstanceToken({
            access_token: 'access_token',
            token_type: 'token_type',
        })

        expect(axiosInstance.defaults.headers.Authorization).toBe('token_type access_token')
        resetInstanceToken()
        expect(axiosInstance.defaults.headers.Authorization).toBeUndefined()
    })

    describe('method `buildQueryParams`', () => {
        ;[
            [{ a: 1 }, 'a=1'],
            [{ a: null }, 'a=null'],
            [{ a: undefined }, ''],
            [{ a: true }, 'a=true'],
            [{ a: '42' }, 'a=42'],
            [{ a: [1, 2, 3] }, 'a=1&a=2&a=3'],
            [{ a: [1, 2, [3, 4, [5, 6]]] }, 'a=1&a=2&a=3%2C4%2C5%2C6'],
            [{ a: 1, b: 2 }, 'a=1&b=2'],
            [{ a: 1, b: undefined }, 'a=1'],
            [{ a: { b: { c: 42 } } }, 'a=%5Bobject%20Object%5D'],
        ].forEach(([params, query]) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            test(`use for ${JSON.stringify(params)} 'returns ${query}`, () => {
                expect(buildQueryParams(params as object)).toEqual(query)
            })
        })
    })
})
