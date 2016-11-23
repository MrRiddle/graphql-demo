import {
    graphql,
    buildSchema
} from 'graphql'

import schema from '../schema/employees'

const resolve = {
    employees: ({
        officeCode
    }) => {
        if (officeCode !== undefined) {
            return db.queryAsync('SELECT * FROM employees LEFT OUTER JOIN offices ON employees.officeCode = offices.officeCode WHERE employees.officeCode = ? ORDER BY employeeNumber ASC', officeCode).then(rows => formatter(rows));
        } else {
            return db.queryAsync('SELECT * FROM employees LEFT OUTER JOIN offices ON employees.officeCode = offices.officeCode ORDER BY employeeNumber ASC').then(rows => formatter(rows));
        }
    },
    employee: ({
        id
    }) => db.queryAsync('SELECT * FROM employees WHERE employeeNumber = ?', id).then(rows => formatter(rows)).then(rows => rows[0])
}

const getManager = id => {
    if (id)
        return db.queryAsync('SELECT * FROM employees WHERE employeeNumber = ?', id).then(rows => formatter(rows)).then(rows => rows[0]);
    else
        return null;
}

const getSubordinates = id => {
    if (id)
        return db.queryAsync('SELECT * FROM employees WHERE reportsTo = ?', id).then(rows => formatter(rows));
    else
        return [];
}

function formatter(rows) {
    return rows.map(e => ({
        id: e.employeeNumber || 0,
        name: [(e.firstName || ''), (e.lastName || '')].join(' '),
        extension: e.extension || '',
        email: e.email || '',
        officeCode: e.officeCode || '',
        job: e.jobTitle || '',
        address: [(e.country || ''), (e.state || ''), (e.city || ''), (e.addressLine1 || ''), (e.addressLine2 || '')].filter(e => e).join(', '),
        manager: getManager(e.reportsTo),
        subordinates: getSubordinates(e.employeeNumber)
    }))
}

const service = [
    '/employees',
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