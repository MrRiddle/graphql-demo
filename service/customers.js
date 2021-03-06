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
    },
    customer: ({
        id
    }) => db.queryAsync('SELECT * FROM customers WHERE customerNumber = ?', id).then(rows => formatter(rows)).then(rows => rows[0])
}

function formatter(rows) {
    return rows.map(e => ({
        id: e.customerNumber || '',
        name: e.customerName || '',
        contact: [(e.contactFirstName || ''), (e.contactLastName || '')].join(' '),
        phone: e.phone,
        address: [(e.country || ''), (e.state || ''), (e.city || ''), (e.addressLine1 || ''), (e.addressLine2 || '')].filter(e => e).join(', ')
    }))
}

const service = [
    '/customers',
    (req, res) => {
        let {
            query
        } = req.body;
        graphql(schema, query, resolve)
            .then((result) => {
                res.send(result);
            })
    }
]
export default service;