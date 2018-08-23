
var userController = require('../controllers/userController');

// server side apis here



console.log('hit');
exports.login = function(req, res) {
    
    console.log('hi');
    var username = req.body.username ;
    var password = req.body.password ;
 
    if (username == '' || password == '') {
        return res.send(401);
    }
    
    if (username == 'Admin' && password== 'Admin'){
        return res.json({username:"Admin" , password: "Admin"});
    }
    else 
        return res.json({errMsg:"User doesn't exist. Please enter valid user"});
           
};



