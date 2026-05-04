// Simulando requisição da API

export function esperarMs(tempo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, tempo)
    })
}
