import { type RemoteDataResult, failure, success } from '../states'

export interface FetchError {
    message: string
    status?: number
}

export async function service<S = any>(
    request: Request | URL,
    init?: RequestInit,
): Promise<RemoteDataResult<S, FetchError>> {
    try {
        const response = await fetch(request, init)
        if (response.ok) {
            return success((await response.json()) as S)
        } else {
            return failure<FetchError>({ message: await response.text(), status: response.status })
        }
    } catch (err) {
        if (err instanceof Error) {
            return failure({ message: err.message })
        }

        return failure({ message: 'Unknown error' })
    }
}
