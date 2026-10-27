# Reva Molo — Editorial Portfolio

Portofolio digital interaktif Reva Molo, S.Sos (*Cum Laude*, Universitas Brawijaya) — Creative Strategist & Content Development. Dilengkapi pemutar motion graphics multi-rasio programatik (Remotion) dengan tata suara (*sound design*) elegan dan minimalis.

---

## 🚀 Panduan Deploy ke Vercel via GitHub

Folder ini sudah **100% siap langsung dideploy ke Vercel** tanpa konfigurasi rumit tambahan.

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori, misalnya: `web-portofolio-revamolo` atau `revamolo-portfolio`.
3. Pilih **Public** atau **Private**.
4. **JANGAN** centang "Add a README file" atau .gitignore (karena berkas tersebut sudah tersedia di folder ini).
5. Klik **Create repository**.

### Langkah 2: Hubungkan & Push Folder Ini ke GitHub
Buka terminal/PowerShell di dalam folder ini (`web-portofolio-revamolo`), lalu jalankan perintah berikut (ganti `USERNAME` & `NAMA-REPO` dengan milik Anda):

```bash
# 1. Pastikan remote mengarah ke repositori GitHub Anda
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# 2. Push ke branch main
git branch -M main
git push -u origin main
```

*(Catatan: Git repositori lokal sudah kami inisialisasi dan commit pertama sudah dibuat otomatis).*

---

### Langkah 3: Hubungkan ke Vercel & Deploy
1. Masuk ke [vercel.com](https://vercel.com/) menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pada daftar *Import Git Repository*, pilih repositori `web-portofolio-revamolo` yang baru saja Anda push.
4. Pada bagian **Configure Project**:
   - **Framework Preset**: Pilih **"Other"** (Vercel otomatis mendeteksi konfigurasi statis).
   - **Root Directory**: Biarkan `./` (default).
   - **Build Command**: Kosongkan (tidak membutuhkan build command karena semua aset video & HTML sudah jadi).
   - **Output Directory**: Kosongkan.
5. Klik **"Deploy"**.
6. Dalam waktu ~10-20 detik, website portofolio Anda sudah aktif di domain resmi Vercel (misalnya: `https://web-portofolio-revamolo.vercel.app`).

---

## ⚡ Fitur Optimasi Vercel yang Sudah Dikonfigurasi (`vercel.json`)
- **Range Request Support (`Accept-Ranges: bytes`)**: Memungkinkan streaming video MP4 super cepat, instan autoplay di HP/desktop tanpa perlu menunggu seluruh file video diunduh.
- **Edge Caching CDN**: Aset video dan audio di-cache hingga 1 tahun (`max-age=31536000, immutable`), menghemat kuota dan mempercepat loading global.
- **Clean URLs**: URL navigasi otomatis rapi tanpa ekstensi `.html`.

---

## 💻 Cara Menjalankan Secara Lokal (Offline / Testing)

### Opsi A (Paling Mudah di Windows):
Cukup **klik dua kali berkas `start-server.bat`**. Browser Anda akan otomatis terbuka ke `http://localhost:3000`.

### Opsi B (Lewat Terminal / Node.js):
```bash
node server.js
```
Buka `http://localhost:3000` di peramban.

---

## 📁 Struktur Direktori
```
web-portofolio-revamolo/
├── index.html        # Halaman utama portofolio editorial responsif
├── style.css         # Desain sistem emerald editorial, glassmorphism & animasi
├── main.js           # Engine interaksi (particle canvas, tab switcher rasio video)
├── vercel.json       # Konfigurasi streaming video & CDN headers untuk Vercel
├── package.json      # Metadata proyek
├── server.js         # HTTP streaming server untuk pengujian lokal
├── start-server.bat  # 1-Click launcher untuk Windows
├── .gitignore        # Aturan pengabaian file Git
├── README.md         # Dokumentasi lengkap
├── out/              # Video hasil render Remotion & poster
│   ├── portofolio-revamolo-test1(header).mp4     (Banner 1920x600 - 3.2:1)
│   ├── portofolio-revamolo-test1(landscape).mp4  (Landscape 1920x1080 - 16:9)
│   ├── portofolio-revamolo-test1(portrait).mp4   (Reel Vertikal 1080x1920 - 9:16)
│   └── *.png                                     (Poster & favicon)
└── public/audio/     # 13 aset sound design minimalis & elegan (.wav)
```
