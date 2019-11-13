const db = require('./db')

const Comments = db.sequelize.define('comments',{
	id:{
		type: db.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	phrase:{
		type: db.Sequelize.TEXT
	}
})

module.exports = Comments