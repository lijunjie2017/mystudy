var express = require("express");
var router = require('./router/router.js')
var mysql = require('mysql')
var path = require("path")
var ejs = require("ejs")
var app = express();
var sqlConnect = require('./model/sqlConnect.js')
var connection = sqlConnect.connection

connection.connect();






var sql = 'select * from users';
connection.query(sql,function(err,result){
	if(err){
		console.log('你的检索信息有误，请核对');
		return;
	}
	console.log('------------------------------------------------------------------------------------')
	console.log(result);
	console.log('------------------------------------------------------------------------------------')
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))
app.set('views',path.join(__dirname,'views/'))

app.set('view engine','ejs')
app.engine('html',ejs.__express)
app.set('view engine','html')
app.get("/index",function(req,res,next){
	res.render('index.html')
})

app.get("/login",function(req,res,next){
	console.log(req.query)
	var username = req.query.name
	var password = req.query.password
	console.log(username,password)
	var addsql = "insert into users(username,password)values(?,?)";
	var addsqlParam = [username,password]
	connection.query(addsql,addsqlParam,function(err,result){
	if(err){
		console.log(err)
		return;
	}
	console.log('插入成功')
})

})

console.log("运行成功了呀")

app.listen(3000,"127.0.1.1")