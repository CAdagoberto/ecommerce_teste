// Simulando requisição da API

export const esperarMs = tempo =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, tempo)
    })
