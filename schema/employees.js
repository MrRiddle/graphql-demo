import {
    buildSchema
} from 'graphql'

export default buildSchema(`
    type Query {
        employees: [EmployeeWithColleague]
        employee(id: Int!): EmployeeWithColleague
    }

    type EmployeeWithColleague implements Employee{
        id: ID!
        name: String!
        extension: String!
        email: String!
        officeCode: Int!
        job: String!
        address: String!
        manager: EmployeeBasicInfo
        colleagues: [EmployeeBasicInfo]
        subordinates: [EmployeeBasicInfo]
    }

    type EmployeeBasicInfo implements Employee{
        id: ID!
        name: String!
        extension: String!
        email: String!
        officeCode: Int!
        job: String!
        address: String!
    }

    interface Employee {
        id: ID!
        name: String!
        extension: String!
        email: String!
        officeCode: Int!
        job: String!
        address: String!
    }

`);