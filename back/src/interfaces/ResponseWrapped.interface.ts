interface ResponseWrapperError {
    code: string,
    message: string,
}

export default interface ResponseWrapped {
    status: number,
    statusText: string,
    message: string,
    error?: ResponseWrapperError,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
}
