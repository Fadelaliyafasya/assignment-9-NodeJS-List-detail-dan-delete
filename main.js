const contacts = require("./contact");
const yargs = require("yargs");

// command untuk menambakan contact baru
yargs
  .command({
    command: "add",
    describe: "add new contact",
    builder: {
      nama: {
        describe: "Contact Name",
        demandOption: true,
        type: "string",
      },

      email: {
        describe: "Contact Email",
        demandOption: false,
        type: "string",
      },

      mobile: {
        describe: "Contact mobile phone number",
        demandOption: true,
        type: "string",
      },
    },

    handler(argv) {
      if (!argv.nama) {
        console.log("Nama tidak boleh kosong, masukan kembali!!");
      } else {
        contacts.saveContact(argv.nama, argv.mobile, argv.email);
      }
    },
  })
  .demandCommand();

// command menampilkan list
yargs.command({
  command: "list",
  describe: "Menampilkan list semua nama kontak dan nomor handphone",
  handler(argv) {
    contacts.daftarContact(argv.nama, argv.mobile);
  },
});

// command detail contact
yargs.command({
  command: "detail",
  describe: "Menampilkan informasi contact",
  builder: {
    nama: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },

    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },

    mobile: {
      describe: "Contact mobile phone number",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama, argv.email, argv.mobile);
  },
});

// command untuk menghapus contact yang di input kan
yargs.command({
  command: "delete",
  describe: "Menghapus data user contact berdasarkan nama user",
  builder: {
    nama: {
      describe: "Mengapus data user",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    contacts.hapusContact(argv.nama);
  },
});

yargs.parse();
