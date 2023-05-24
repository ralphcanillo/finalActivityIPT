// const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { DataTypes, NOW } = require('sequelize');
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll() {
    return await db.Customer.findAll({where: {isActive: '1'}});
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Customer.findOne({ where: { customerNumber: params.customerNumber } })) {
        throw 'Customer "' + params.customerNumber + '" is already registered';
    }

    const customer = new db.Customer(params);

    // save customer
    await customer.save();
}

async function update(id, params) {
    const customer = await getUser(id);

    // copy params to customer and save
    Object.assign(customer, params);
    customer.lastUpdated = DataTypes.DATEONLY(NOW);
    await customer.save();

    return customer.get();
}

async function _delete(id) {
    const customer = await getUser(id);

    customer.isActive = '0';
    await customer.save();

    return customer.get();
}

// helper functions

async function getUser(id) {
    const customer = await db.Customer.findOne({where: {isActive : 1, customerNumber: id}});
    if (!customer) throw 'Customers not found';
    return customer;
}


