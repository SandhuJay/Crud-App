const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User =  mongoose.model('userdetails');

router.get('/',(req, res) => {
     res.render("userdata/addedit", {
        viewTitle: "Insert User",
       
    });
});

router.post('/',(req, res) => {
    if (req.body._id == '')
        insertRecord(req,res)
        else
        updateRecord(req, res);
});


  function insertRecord(req, res){
    var employee = new User();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
   
    employee.save((err, doc) => {
        if (!err)
            res.redirect('user/list');
      
            else {
                  if (err.name == 'ValidationError') {
                     handleValidationError(err, req.body);
                     res.render("userdata/addedit", {
                          viewTitle: 'Insert User',
                          user: req.body,
                        
                      });
                    }
         else
            console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('user/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("userdata/update", {
                    viewTitle: 'Update User',
                    user: req.body,
                    
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("userdata/list", {
                list: docs,
             
            });
        }
        else {
            console.log('Error in retrieving User list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("userdata/update", {
                viewTitle: "Update User details",
                user: doc,
              
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});

module.exports = router;
