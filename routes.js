'use strict';

module.exports = app => {
    let jsonku = require('./controller');

    app.route('/').get(jsonku.index);
    app.route('/user').get(jsonku.showDataUser);
    app.route('/mahasiswa').get(jsonku.showDataMhs);
    app.route('/mahasiswa/:id').get(jsonku.showDataMhsById);
    app.route('/mahasiswa/add').post(jsonku.addDataMhs);
    app.route('/mahasiswa/update/:id').put(jsonku.updateDataMhs);
    app.route('/mahasiswa/delete/:id').delete(jsonku.deleteDataMhs);
    app.route('/mahasiswamatkul').get(jsonku.showmatkulMhs);
    app.route('/mahasiswamatkul/:id').get(jsonku.showmatkulMhsById);
}