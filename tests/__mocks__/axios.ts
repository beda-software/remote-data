const instance = async ({ url }: any) => {
    switch (url) {
        case 'success':
            return await Promise.resolve({
                data: 'data-success',
            })
        case 'error-message':
            // eslint-disable-next-line prefer-promise-reject-errors
            return await Promise.reject({
                message: 'error-message',
            })
        case 'error-data':
            // eslint-disable-next-line prefer-promise-reject-errors
            return await Promise.reject({
                response: {
                    data: 'error-data',
                },
            })
        default:
            // eslint-disable-next-line prefer-promise-reject-errors
            return await Promise.reject()
    }
}

instance.defaults = {
    baseURL: null,
    headers: {
        Authorization: null,
    },
}

export default {
    create: () => instance,
}
