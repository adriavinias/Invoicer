import {faker} from '@faker-js/faker'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    Array.from({length: 30}).map(async (_, i)=> {
       await prisma.customer.create({
            data:{
                email: faker.internet.email(),
                telephone: faker.string.numeric({length: 9}),
                name: faker.company.name(),
                vatnif: faker.string.alphanumeric({length: {min: 7, max: 9}}),
                street: faker.location.street(),
                postal_code: faker.location.zipCode('#####'),
                city: faker.location.city(),
                country: faker.location.country(),
            }
        })
    })
}

main()
.catch((e) => {
    console.log(e)
}).finally(async () => {
    await prisma.$disconnect()
})