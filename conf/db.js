const env = process.env.NODE_ENV; //环境变量；

// 配置;
let MYSQL_CONF
let REDIS_CONF
let SEQUELIZE_CONF 


if( env === 'dev' ){
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }


}

if( env === 'production' ){
    // mysql
    // MYSQL_CONF = {
    //     host: "localhost",
    //     user: "root",
    //     password: "123456",
    //     port: "3306",
    //     database: "myblog"
    // };
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "myblog"
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    };
}

if( env === 'winDev' ){
    // mysql
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "myblog"
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    };

    // Sequelize
    SEQUELIZE_CONF = {
        dbname: 'myblog',
        uname: 'root',
        upwd: '',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  SEQUELIZE_CONF
};
