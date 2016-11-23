import {
    buildSchema
} from 'graphql'

export default buildSchema(`
    type Query {
        employees: [Employee]
        employee(id: Int!): Employee
    }

    type Employee {
        id: ID!
        name: String!
        extension: String!
        email: String!
        officeCode: Int!
        job: String!
        address: String!
        manager: Employee
        subordinates: [Employee]
    }

`);