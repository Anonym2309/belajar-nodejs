"use strict";

const { json } = require("body-parser");

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tampil").get(jsonku.tampilDataMahasiswa);

  app.route("/tampil/:id").get(jsonku.tampilBerdasarkanId);

  app.route("/tambah").post(jsonku.tambahMahasiswa);

  app.route("/ubah").put(jsonku.ubahDataMahasiswa);

  app.route("/hapus").delete(jsonku.hapusDataMahasiswa);

  app.route("/tampilmatakuliah").get(jsonku.tampilGroupMatakuliah);
};
