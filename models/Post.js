const db = require('./db')

const Post = db.sequelize.define('comments',{
	id:{
		type: db.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	phrase:{
		type: db.Sequelize.TEXT
	}
})

// Recria a tabela
//Post.sync({force: true})

module.exports = Post