# Praktikum Minggu 4 — GameHunter Laravel API

## Resource dan perubahan
Saya menerapkan resource Game dari contract Minggu 3. Project memakai Laravel 13, PHP 8.4, dan SQLite development. Model, migration, seeder, controller, serta dua route sudah dibuat. Contoh Book sebelumnya tetap tersedia.

Seeder berisi dua game contoh: Game Contoh PC dan Game Contoh Browser. Data berasal dari fixture development, belum integrasi CheapShark/FreeToGame. Seeder dapat diulang tanpa menggandakan kedua contoh.

## Endpoint
| Method | Path | Hasil |
| --- | --- | --- |
| GET | /api/games | 200, daftar dalam array data |
| GET | /api/games/{game} | 200, detail dalam object data; 404 jika ID tidak ada |
| GET | /api/games?platform=pc | 200, filter platform |

Header: Accept: application/json. Katalog publik, No Auth. Query platform menerima pc/browser; parameter lain menghasilkan 422.

## Verification
Pengujian dilakukan pada 9 Oktober 2026 terhadap server Laravel dan database lokal.

| Request Postman | Status | Hasil |
| --- | --- | --- |
| List Games | 200 | Dua record development |
| Show Game | 200 | Satu object game |
| Game Not Found | 404 | message dan errors: null |
| Filter PC | 200 | Hanya game PC |
| Invalid Platform | 422 | Error validasi platform |

Pest: **13 test, 34 assertion lulus**. Newman: **5 request, 18 assertion lulus, 0 gagal**. Test Pest memakai database SQLite in-memory; tidak menghapus data development.

## Contract Comparison
Response sesuai [api-contract.md](api-contract.md): field id integer, title/platform/source string, is_free boolean, dan updated_at ISO 8601. Daftar menggunakan array data, detail object data. Error 404 tetap {"message":"Resource not found","errors":null}, sesuai draft GameHunter Minggu 3. Timestamp dan ID aktual dapat berbeda dari contoh.

Saya menggunakan mapping gameData() mengikuti contoh controller praktikum. Cast boolean berada di model. API Resource dapat memisahkan mapping ini pada Minggu 5. Hanya dua route baca untuk Game yang didaftarkan; POST belum tersedia.

## Evidence
Screenshot berikut berasal dari request yang dikirim lewat tombol Send ke server Laravel.

Screenshot diperbarui setelah request dikirim ulang. Tampilan difokuskan pada request, status, dan body response.

### 1. Daftar game — 200 OK

Request `GET /api/games` berhasil. Body berisi dua game dalam array `data`; Postman menunjukkan 4/4 test lulus.

![List Games 200](../images/gamehunter-list-200.jpg)

### 2. Detail game — 200 OK

Request `GET /api/games/1` berhasil. Body berisi satu object `data`; Postman menunjukkan 4/4 test lulus.

![Show Game 200](../images/gamehunter-detail-200.jpg)

### 3. ID tidak ditemukan — 404 Not Found

Request `GET /api/games/999999` menghasilkan `404`. Body berisi `message: "Resource not found"` dan `errors: null`; 3/3 test lulus.

![Game Not Found 404](../images/gamehunter-not-found-404.jpg)


## Cara menjalankan ulang
Dari root project yang memuat artisan:

```bash
php artisan migrate
php artisan db:seed --class=GameSeeder
php artisan route:list --path=api/games
php artisan serve --host=127.0.0.1 --port=8000
```

Di Postman, gunakan GET dengan URL dasar http://127.0.0.1:8000 dan header Accept: application/json. Kirim request /api/games, /api/games/1, dan /api/games/999999, lalu bandingkan status dan body dengan foto bukti.

Pengujian otomatis pada terminal kedua:

```bash
php artisan test --compact tests/Feature/GameReadOnlyTest.php
npx newman run postman/GameHunter_Minggu_4.postman_collection.json
```

## Refleksi
1. URL ditentukan oleh routes/api.php; prefix api ditambahkan Laravel.
2. Struktur tabel ditentukan migration create_games_table.
3. Actual response dibandingkan dengan contract agar client menerima field dan tipe yang dijanjikan.
4. Daftar kosong tetap 200 dengan data: []; wadah resource masih tersedia.
5. API Resource dapat merapikan transformasi JSON pada Minggu 5.

## Kesimpulan
Contract GameHunter sudah diterapkan menjadi endpoint baca Laravel yang mengambil data dari database. Respons sukses dan error sudah diuji. Fitur tulis, autentikasi pengguna, dan sinkronisasi penyedia belum masuk praktikum ini.

## Referensi
- Praktikum 4 — Endpoint Read-only dengan Laravel, materi kelas.
- [Laravel 13 Routing](https://laravel.com/framework/docs/13.x/routing).
- [Laravel Eloquent](https://laravel.com/framework/docs/13.x/eloquent).
- [Laravel Migrations](https://laravel.com/framework/docs/13.x/migrations).
