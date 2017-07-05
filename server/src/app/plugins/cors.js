module.exports = {
	register: require('hapi-cors'),
	options: {
		origins: ['http://localhost:8080']
	}
}
