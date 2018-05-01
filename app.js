var express = require('express')
var app = express()
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/retail";
var bodyparser = require('body-parser');
var obj = require('./student');
mongoose.connect('mongodb://localhost:27017/retail');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    'extended': false
}));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'main.html');
});

app.get('/create', function (req, res) {
    res.sendFile(__dirname + '/' + 'insert.html');
});


app.get('/retrieve', function (req, res) {
    res.sendFile(__dirname + '/' + 'retrieve.html');
});


app.get('/update', function (req, res) {
    res.sendFile(__dirname + '/' + 'update.html');
});



app.get('/delete', function (req, res) {
    res.sendFile(__dirname + '/' + 'delete.html');
});


app.get('/deleteselected', function (req, res) {
    res.sendFile(__dirname + '/' + 'deleteselected.html');
});

app.post('/data', function (req, res) {

    var data = {
        name :req.body.name,
        email: req.body.email,
        mob : req.body.mob,
        quantity : req.body.quantity,
        price : req.body.price


    }
obj.addStudent(data, function(err, data) {
        if (data) {
           response ="Data Inserted succesfully"

            res.send(response);
        } else {
           error = {
                "error": "Sorry Insertion Failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});

app.post('/retrieve', function (req, res) {

var ret=req.body.name;

obj.getStudentByField(ret, function(err, ret) {
        if (ret) {
           response = "Data Retrieved succesfully"
            res.send(ret);
        } else {
           error = {
                "error": "Sorry Retrieve Failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});


app.post('/delete', function(req, res) {
    var name = req.body.name;
    obj.removeStudent(name, function(err, name) {
        if (name) {
            response ="Retailer  Record has been Deleted!"

            res.send(response);
        } else {
            error = {
                "error": "Please check Entered ID"
            }
            res.json(error);
            console.log(err);
        }
    });
});





app.post('/update', function(req, res) {
    var name = req.body.name;
    var data = ({
        name: req.body.name,
        email: req.body.email,
        mob: req.body.mob,
        quantity: req.body.quantity,
       price: req.body.price
    });
    //Calls the function from student.js model
    obj.updateStudent(name,data, {}, function(err, student) {
        if (student) {
          response = "Retailer  Details have been Updated!"
            res.send(response);
            console.log(data);
        } else {
          error = "Sorry Update Failed"

            res.json(error);
        }

            console.log(err);
    });
});





app.post('/entiredata', function(req, res) {
    obj.getDetails(function(err,dt) {
        console.log(dt);
        if (dt) {
           response = {
                "result": dt
            }
            res.send(dt);
        } else {
           error = {
                "error": "Sorry Retrieve Failed"
            }
            res.json(error);
        }
    });
});



app.listen(8081);
console.log('listening on port 8081');
