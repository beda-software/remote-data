import axios, { type AxiosRequestConfig } from 'axios'

import { type RemoteDataResult, failure, success } from '../states'

export interface Token {
    access_token: string
    token_type: string
}

const flatten = (list: any[]): any[] =>
    list.reduce((a: any[], b: any) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

const encodeEntry = (key: string, value: any) => encodeURIComponent(key) + '=' + encodeURIComponent(value)

function packEntry(accumulator: string[], [key, value]: any) {
    if (typeof value === 'undefined') {
        return accumulator
    }

    if (Array.isArray(value)) {
        value.forEach((value) => {
            accumulator.push(encodeEntry(key, Array.isArray(value) ? flatten(value) : value))
        })
    } else {
        accumulator.push(encodeEntry(key, value))
    }

    return accumulator
}

export function buildQueryParams(params: Record<string, any>) {
    return Object.entries(params).reduce<string[]>(packEntry, []).join('&')
}

export function init(baseURL?: string) {
    const axiosInstance = axios.create({
        paramsSerializer: buildQueryParams,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        baseURL,
    })

    return {
        axiosInstance,
        setInstanceBaseURL: (baseURL: string) => {
            axiosInstance.defaults.baseURL = baseURL
        },
        setInstanceToken: (token: Token) => {
            axiosInstance.defaults.headers.Authorization = `${token.token_type || 'Bearer'} ${token.access_token}`
        },
        resetInstanceToken: () => {
            delete axiosInstance.defaults.headers.Authorization
        },
        service: async <S = any, F = any>(config: AxiosRequestConfig): Promise<RemoteDataResult<S, F>> => {
            try {
                const response = await axiosInstance(config)

                return success(response.data)
            } catch (err: any) {
                return failure(err.response ? err.response.data : err.message)
            }
        },
    }
}
