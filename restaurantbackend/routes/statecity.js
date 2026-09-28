var express = require('express');
var router = express.Router();
var pool=require('./pool');

/* GET statecity listing. */
router.get('/fetch_all_states', function(req, res, next) {
 try
 {
  pool.query("select * from states",function(error,result){
    if(error)
    {
      res.status(400).json({status:false,message:"Database error",data:[]});
    }
    else
    {
      res.status(200).json({status:true,message:"States fetched successfully",data:result});
    }
  });
}
    catch(e)
    {
      res.status(500).json({status:false,message:"Internal server error",data:[]});
    }
  });

  router.post('/fetch_all_cities', function(req, res, next) {
 try
 {
  pool.query("select * from city where stateid=?", [req.body.stateid], function(error,result){
    if(error)
    {
      res.status(400).json({status:false,message:"Database error",data:[]});
    }
    else
    {
      res.status(200).json({status:true,message:"Cities fetched successfully",data:result});
    }
  });
}
    catch(e)
    {
      res.status(500).json({status:false,message:"Internal server error",data:[]});
    }
  });
module.exports = router;