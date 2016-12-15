import {
    buildSchema
} from 'graphql'

export default buildSchema(`
    type Query {
        customers(from: Int, to: Int): [Customer]
        customer(id: Int!): Customer
    }

    type Customer {
        id: ID!
        name: String!
        contact: String!
        phone: String!
        address: String!
    }

`);