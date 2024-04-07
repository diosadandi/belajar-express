const express = require("express");
const { BarangRouter } = require("./barang/barang.router");
const { ROUTER_BASE_BARANG } = require("./barang/barang.config");
const { MongoDBConnection } = require("./libs/lib.database");
const { ROUTER_BASE_USER } = require("./user/user.config");
const { UserRouter } = require("./user/user.router");
const { ROUTER_BASE_CUSTOMER } = require("./customer/customer.config");
const { CustomerRouter } = require("./customer/customer.router");
const { ROUTER_BASE_ORDER } = require("./order/order.config");
const { OrderRouter } = require("./order/order.router");
const { Logging } = require("./libs/lib.logging");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: '*'
}))

MongoDBConnection();

app.use(express.json());

/**
 * Logging app
 */
app.use((req, res, next) => {
  // Log an info message for each incoming request
  Logging.info(`Received a ${req.method} request for ${req.url}`);
  return next();
});

app.use(ROUTER_BASE_BARANG, BarangRouter);
app.use(ROUTER_BASE_USER, UserRouter);
app.use(ROUTER_BASE_CUSTOMER, CustomerRouter);
app.use(ROUTER_BASE_ORDER, OrderRouter)

module.exports = {
  app
}