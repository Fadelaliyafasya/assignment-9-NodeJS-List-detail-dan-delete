const fs = require("fs");
const validator = require("validator");

// Membuat folder jika belum ada
const lokasiDirr = "./data";
if (!fs.existsSync(lokasiDirr)) {
  fs.mkdirSync(lokasiDirr);
}

//membuat file contacts.json jika belum ada
const filePath = `./data/contacts.json`;
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const fetchContact = () => {
  //Membaca file JSON
  const file = fs.readFileSync(filePath, "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

//menyimpan data ke JSON
const saveContact = (nama, mobile, email) => {
  // Membuat objek "contact" dengan data yang sudah dikumpulkan sebelumnya.
  const contact = { nama, mobile, email };

  const contacts = fetchContact();

  const duplicateName = contacts.find((contact) => contact.nama === nama);
  if (duplicateName) {
    console.log(
      "Maaf, nama yang Anda pilih sudah terpakai. Tolong coba dengan nama lain!!"
    );
    return false;
  }

  //validasi email user
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email yang dimasukan Invalid!!");
      return false;
    }
  }

  // validasi nomor handphone user
  if (mobile) {
    if (!validator.isMobilePhone(mobile, "id-ID")) {
      console.log("Nomor yang dimasukan Invalid!!");
      return false;
    }
  }

  //menambah kontak baru
  contacts.push(contact);

  //menyimpan data yang sudah diperbarui
  fs.writeFileSync(filePath, JSON.stringify(contacts));
  console.log("Terima kasih, data sudah tersimpan!!");
};

// hapus contact user berdasarkan nama user
const hapusContact = (nama) => {
  const contacts = fetchContact();
  const contactBaru = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase();
  });

  if (contacts.length === contactBaru.length) {
    console.log(`${nama} tidak ditemukan, harap perhatikan kembali!!`);
    return false;
  }

  fs.writeFileSync(filePath, JSON.stringify(contactBaru));
  console.log(`${nama} berhasil dihapus!!`);
};

// daftar kontak --command list
const daftarContact = () => {
  const contacts = fetchContact();

  // mengecek apabila di command list ada
  if (contacts.length === 0) {
    console.log("Daftar Kontak kosong.");
    return [];
  }

  console.log("Daftar Kontak: ");
  contacts.forEach((contact, n) => {
    console.log(`${n + 1}). Nama: ${contact.nama}, Mobile: ${contact.mobile} `);
  });
  return contacts;
};

// detail contact information
const detailContact = (nama) => {
  const contacts = fetchContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(
      "Nama yang anda masukan tidak ditemukan, dan periksa kembali bila mempunyai nama lengkap!!!"
    );
    return false;
  }

  //nampilin nama contact
  console.log("Informasi detail user: ");
  console.log(`Nama: ${contact.nama}`);
  console.log(`Mobile: ${contact.mobile}`);
  if (contact.email) {
    console.log(`Email: ${contact.email}`);
  }
};

module.exports = { detailContact, daftarContact, hapusContact, saveContact };
