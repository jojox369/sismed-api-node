const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_BANCO,
	username: process.env.MYSQL_USUARIO,
	password: process.env.MYSQL_SENHA,

	entities: [rootDir + '/models/*.{js,ts}'],
	cli: {
		migrationsDir: rootDir + '/database/migrations',
	},
};
