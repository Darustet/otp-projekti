var mysql = require("mysql");

var hostname = "ep9.h.filess.io";
var database = "otp_lowersitof";
var port = "3305";
var username = "otp_lowersitof";
var password = "a0801bab4112095dc98fc267777e15f507c4560b";


var con = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("SELECT * FROM event", function (err, result) {
    if (err) throw err;
    console.log(result);
});
