const Mock = require('mockjs');

const url = `POST /api/getCoinLogo`;

const data = Mock.mock({
  src: Mock.Random.url('http'),
});

module.exports = {
  [url](req, res) {
    const { id } = req.body;
    setTimeout(() => {
      res.status(200).json({
        id,
        ...data,
      });
    }, 1000);
  }
}