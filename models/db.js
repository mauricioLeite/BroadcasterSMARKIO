const Sequelize = require('sequelize');
const sequelize = new Sequelize('broadcaster','root','',{
	host: "localhost",
	dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    	console.log("Connection successfully!");
	}).catch(function(erro){
    	console.log("Conection failed: "+erro);
})

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}