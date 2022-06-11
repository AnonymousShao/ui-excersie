const Mock = require('mockjs');

const url = `POST /api/getCoinPrice`;

const data = Mock.mock({
  'price|0-999999.1-2': 1456.20,
});

module.exports = {
  [url](req, res) {
    const { id } = req.body;
    res.status(200).json({
      id,
      ...data,
    });
  }
}