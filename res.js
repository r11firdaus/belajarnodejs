'use strict';

exports.ok = (values, res) => {
    let data = {
        'status': 200,
        'values': values
    };
    res.json(data);
    res.end();
}

// response untuk nested matkul by mahasiswa
exports.okmatkul = (values, res) => {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // tentukan key gruop
        if (akumulasikan[item.nama]) {
            // buat variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            if (Array.isArray(group.matkul)) {
                // tambahkan value ke dalam group matkul
                group.matkul.push(item.matkul);
            } else {
                group.matkul = [group.matkul, item.matkul];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});
    let data = {
        'status': 200,
        'values': hasil
    };
     res.json(data);
     res.end();
}
