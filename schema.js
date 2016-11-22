import { buildSchema } from 'graphql';

let count = 0;

export const schema = buildSchema(`
    type Query {
        list: [Component]
        total(id: Int): Int
    }

    type Component {
        id: ID!
        name: String!
        type: String!
        author: User!
    }

    type User {
        name: String!
        componentCount: Int!
    }
`);

const length = 10;
const components = Array.from({length}).map((v, k) => k).map(i => ({
        id: i,
        name: `Comp${i}`,
        type: 'logic',
        author: {
            name: 'someone',
            componentCount: 3
        }
    }));

export const resolve = { 
    list: () => components,
    total: (obj) => obj.id * 100
}