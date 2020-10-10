'use strict';
const response = require('./res');
const connection = require('./koneksi');

exports.index = (req, res) => {
    response.ok('Aplikasi rest API berjalan', res)
};

// show data mahasiswa
exports.showDataMhs = (req, res) => {
    connection.query('SELECT * FROM mahasiswa', (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}

// show data mahasiswa by id
exports.showDataMhsById = (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mhs = ?', [id], (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res);
        }
    })
}

// post data mahasiswa
exports.addDataMhs = (req, res) => {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)', [nim, nama, jurusan],
    (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok('Berhasil Menambahkan data!', res)
        }
    })
}

// update data mahasiswa
exports.updateDataMhs = (req, res) => {
    let id = req.params.id;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query(`UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mhs=${id}`, [nim, nama, jurusan],
    (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Ubah data!", res)
        }
    })
}

// delete data mahasiswa
exports.deleteDataMhs = (req, res) => {
    let id= req.params.id;
    connection.query(`DELETE FROM mahasiswa WHERE id_mhs=${id}`, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok("Berhasil Hapus Data", res)
        }
    })
}

exports.showmatkulMhs = (req, res) => {
    connection.query('SELECT mahasiswa.id_mhs, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matkul, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matkul = matakuliah.id_matkul AND krs.id_mhs = mahasiswa.id_mhs ORDER BY mahasiswa.id_mhs',
    (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.okmatkul(rows, res);
        }
    }
    )
}

exports.showmatkulMhsById = (req, res) => {
    let id = req.params.id
    connection.query(`SELECT mahasiswa.id_mhs, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matkul, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE mahasiswa.id_mhs = ${id} AND krs.id_matkul = matakuliah.id_matkul AND krs.id_mhs = mahasiswa.id_mhs ORDER BY mahasiswa.id_mhs`,
    (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.okmatkul(rows, res);
        }
    }
    )
}

exports.showDataUser = (req, res) => {
    connection.query('SELECT * FROM user', (error, rows, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}