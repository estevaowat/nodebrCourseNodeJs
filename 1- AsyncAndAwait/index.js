var teste = 123

/*
    Tarefas:
    1- Obter um usuario
    2- Obter o numero de telefone de um usuario a partir de seu ID
    3- Obter o endereco do usuario a partir do Id
*/

function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: 'Estevao Watanabe',
                birthDate: new Date()
            })
        }, 2000);
    })
}

function getPhoneNumber(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                ddd: 11,
                number: 993770109
            })
        }, 2000)
    });
}

function getAddress(idUsuario) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            return resolve({
                street: 'Rua Duque de Caxias',
                number: 575
            })
        }, 2000)
    })
    
}

main();
async function main() {

    try {
        console.time('time-to-get-personal-data')
        const user = await getUser();
        
        const result = await Promise.all([
            getPhoneNumber(user.id),
            getAddress(user.id)
        ])

        const phoneNumber = result[0]
        const address = result[1]
         console.log(`
             Name: ${user.name}
             Phone Number: (${phoneNumber.ddd}) ${phoneNumber.number}
             Address: ${address.street}, ${address.number}
         `);

         console.timeEnd('time-to-get-personal-data')
    } catch (error) {
        console.error("Ops bro! Something go wrong... ", error);
    }
}