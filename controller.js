/* eslint-disable no-undef */
"use strict";

const response = require("./res");
const connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API Berjalan!!", res);
};

//*Menampilkan semua data mahasiswa
exports.tampilDataMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//*Menampilkan data berdasarkan ID nya
exports.tampilBerdasarkanId = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//*Menambah data mahasiswa
exports.tambahMahasiswa = function (req, res) {
  var NIK = req.body.NIK;
  var nama = req.body.nama;
  var fakultas = req.body.fakultas;

  connection.query(
    "INSERT INTO mahasiswa (NIK,nama,fakultas) VALUES(?,?,?)",
    [NIK, nama, fakultas],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil menambahkan data!!", res);
      }
    }
  );
};

//*mengubah data mahasiswa
exports.ubahDataMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  var NIK = req.body.NIK;
  var nama = req.body.nama;
  var fakultas = req.body.fakultas;

  connection.query(
    "UPDATE mahasiswa SET NIK=?, nama=?, fakultas=? WHERE id_mahasiswa=?",
    [NIK, nama, fakultas, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil mengubah data!!!", res);
      }
    }
  );
};

//*menghapus data mahasiswa
exports.hapusDataMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;

  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa=?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil menghapus data", res);
      }
    }
  );
};

//*menampilkan matakuliah berdasarkan group
exports.tampilGroupMatakuliah = function (req, res) {
  connection.query(
    "SELECT mahasiswa.id_mahasiswa, mahasiswa.NIK, mahasiswa.nama, mahasiswa.fakultas, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.nested(rows, res);
      }
    }
  );
};
