module.exports = {
  "development": {
    "username": "phenuser",
    "password": '123.456',
    "database": "dev-phendb",
    "host": "200.110.94.21",
    "dialect": "postgres",
    "port":"5430"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
