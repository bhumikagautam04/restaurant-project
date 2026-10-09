var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');

/* GET home page. */
router.post('/restaurant_submit', upload.any(), function(req, res, next) {
  // if (!req.files || req.files.length < 3) {
  //   return res.status(400).json({ status: false, message: "Please upload all three required files.", data: [] });
  // }

  pool.query("insert into restaurants (restaurantname, ownername, phonenumber, emailid, mobileno, url, fssaii, gstno, gsttype, filefssai, fileshopact, filelogo, address, stateid, cityid, createdat, updateat)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.files[0].path, req.files[1].path, req.files[2].path, req.body.address, req.body.stateid, req.body.cityid, new Date(), new Date()], function(error, result) {
    if (error) {
      console.error('Restaurant insert failed:', error);
      res.status(500).json({ status: false, message: error.message, data: [] });
    } else {
      console.log('Restaurant data inserted successfully');
      res.status(200).json({ status: true, message: "Restaurant data inserted successfully", data: [] });
    }
  });
});

module.exports = router;
