const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  /*return await db.Inventory.findAll({
    include: [
      {
        model: db.Product,
        attributes: ["productCode", "productName", "buyPrice"],
      },
      {
        model: db.Office,
        attributes: ["officeCode", "city", "country"],
      },
    ],
  });*/
  return await db.sequelize.query(
    `SELECT  i.inventoryId, country, CONCAT(o.addressLine1, ", ", o.city) as officeAddress,
            p.productName, i.quantityAvailable, i.lastUpdated
    FROM inventories i JOIN offices o ON i.officeCode = o.officeCode
                       JOIN products p ON i.productCode = p.productCode
    ORDER BY country,productName`,
    {
      type: QueryTypes.SELECT,
    }
  );
}


async function getById(id) {
  return await getInventory(id);
}

async function create(params) {
  // validate
  if (await db.Inventory.findOne({ where: { productCode: params.productCode } && {officeCode: params.officeCode}})) {
    throw 'This item "' + params.productCode +'" with the office code "' + params.officeCode + '" is already inventory table';
  }

  const inventory = new db.Inventory(params);

  // save inventory
  await inventory.save();
}

async function update(id, params) {
  const inventory = await getInventory(id);

  // copy params to inventory and save
  /*Object.assign(inventory, params);
  await inventory.save();*/

  Object.assign(inventory, params);
  inventory.lastUpdate = Date.now();
  await inventory.save();

  return inventory.get();
}

async function _delete(id) {
  const inventory = await getInventory(id);
  await inventory.destroy();
}

// helper functions

async function getInventory(id) {
  const inventory = await db.Inventory.findByPk(id);
  if (!inventory) throw "Office not found";
  return inventory;
}