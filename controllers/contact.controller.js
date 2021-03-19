module.exports = {
    list(request, h){
        return [
            {
                id: 1,
                name: "Rafael Fernandes da Silva",
                number: "11 9999-9999",
                description: "Consultor de Qualidade",
              },
              {
                id: 2,
                name: "João da Silva",
                number: "11 9999-9998",
                description: "Aula de Inglês",
              },
              {
                id: 3,
                name: "Maria da Silva",
                number: "11 9999-9997",
                description: "Aula de Francês",
              },
        ]
    }
}
