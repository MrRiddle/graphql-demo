import {
    graphql,
    buildSchema
} from 'graphql'

import schema from '../schema/customers'

const resolve = {
    customers: ({
        from,
        to
    }) => {
        if (from !== undefined && to !== undefined) {
            return db.queryAsync('SELECT * FROM customers ORDER BY customerNumber ASC LIMIT ? , ?', [from, to]).then(rows => formatter(rows));
        } else {
            return db.queryAsync('SELECT * FROM customers ORDER BY customerNumber ASC').then(rows => formatter(rows));
        }
    }
}

function formatter(rows) {
    return rows.map(e => ({
        id: e.customerNumber || '',
        name: e.customerName || '',
        contact: [(e.contactFirstName || ''), (e.contactLastName || '')].join(' '),
        phone: e.phone,
        address: [(e.country || ''), (e.state || ''), (e.city || ''), (e.addressLine1 || ''), (e.addressLine2 || '')].filter(e => {
            if (e) return e;
        }).join(', ')
    }))
}


let ql = `
    query {
        customers(from:0, to:5) {
            id
            name
            address
        }
    }
`;

const service = [
    '/customers',
    (req, res) => {
        graphql(schema, ql, resolve)
            .then((result) => {
                res.send(result);
            })
    }
]
export default service;