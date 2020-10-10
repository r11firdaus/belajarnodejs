const connection = require('../koneksi');
const jwt = require('jsonwebtoken');
const config = require('../config/secret')
const mysql = require('mysql');
const md5 = require('md5');

verifikasi = () => {
    return (req, res, next) => {
        const data = {
            email: req.body.email,
            password: req.body.password,
        }
        let query ="SELECT ?? FROM ?? WHERE ??=? AND ??=?";
        let table = ['role','user','email',data.email,'password',md5(data.password)];
        query = mysql.format(query, table);

        connection.query(query, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                let tokenWithBearer = req.headers.authorization;
                if (tokenWithBearer) {
                    let token = tokenWithBearer.split(' ')[1];
                    //  verifikasi
                    jwt.verify(token, config.secret, (err, decoded) => {
                        if (err) {
                            return res.status(401).send({ auth: false, message: 'Token tidak terdaftar!' });
                        } else {
                            if (query === 2) {
                                req.auth = decoded;
                                next();
                            } else {
                                return res.status(401).send({ auth: false, message: 'Gagal mengotorisasi user' });
                            }
                        }
                    })
                } else {
                    return res.status(401).send({ auth: false, message: 'Token tidak tersedia!' });
                }
                
            }
        })

    }
}

 module.exports = verifikasi;
//  masih eror autentukasi login