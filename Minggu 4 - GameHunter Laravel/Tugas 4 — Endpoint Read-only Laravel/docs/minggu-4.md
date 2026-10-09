# Tugas 4 — Endpoint Read-only Laravel

## Tujuan

Menerapkan API contract GameHunter menjadi endpoint Laravel yang dapat dijalankan dan diuji.

## Perubahan

Model Game, migration tabel games, GameSeeder, dan GameController dibuat. Seeder menyediakan dua game development. Controller memiliki index() untuk daftar dan show() untuk detail.

## Endpoint dan contract

| Method | Endpoint | Response |
| --- | --- | --- |
| GET | /api/games | 200, array data |
| GET | /api/games/1 | 200, object data |
| GET | /api/games/999999 | 404, resource tidak ditemukan |
| GET | /api/games?platform=pc | 200, daftar game PC |
| GET | /api/games?platform=console | 422, validasi gagal |

Gunakan `Accept: application/json` dan No Auth. Field resource: id integer, title/platform/source string, is_free boolean, dan updated_at ISO 8601. Mapping response menjaga bentuk JSON sesuai [contract](../../Minggu-Praktikum/docs/api-contract.md).

Contoh detail sukses:

```json
{
  "data": {
    "id": 1,
    "title": "Game Contoh PC",
    "platform": "pc",
    "is_free": true,
    "source": "fixture",
    "updated_at": "2026-10-09T08:22:09.000000Z"
  }
}
```

## Bukti pengujian

Pengujian dilakukan pada 9 Oktober 2026 terhadap Laravel 13 dan SQLite development. Screenshot menampilkan response dari request yang dikirim lewat Postman.

### Daftar game — 200 OK

GET /api/games mengembalikan dua game dalam array data. Postman: 4/4 test lulus.

![Daftar game 200 OK](../images/gamehunter-list-200.jpg)

### Detail game — 200 OK

GET /api/games/1 mengembalikan satu object game. Postman: 4/4 test lulus.

![Detail game 200 OK](../images/gamehunter-detail-200.jpg)

### Game tidak ditemukan — 404 Not Found

GET /api/games/999999 mengembalikan error sesuai contract. Postman: 3/3 test lulus.

![Game tidak ditemukan 404](../images/gamehunter-not-found-404.jpg)

Pengujian otomatis: **Pest 13 test, 34 assertion lulus**; **Newman 5 request, 18 assertion lulus**. Foto di atas menampilkan status, body, dan hasil test Postman.

## Error case

ID yang tidak ada menghasilkan 404:

```json
{
  "message": "Resource not found",
  "errors": null
}
```

Platform yang tidak valid menghasilkan 422 dengan pesan validasi pada errors.platform. Daftar kosong tetap 200 dengan data: [], karena endpoint daftar masih tersedia.

## Menjalankan ulang

Ikuti [langkah menjalankan dan pengujian](../../Minggu-Praktikum/docs/minggu-4-praktikum.md). Di Postman, gunakan GET untuk /api/games, /api/games/1, dan /api/games/999999 dengan header Accept: application/json.

## Kesimpulan

Endpoint baca GameHunter sudah mengambil data dari database dan mengikuti contract Minggu 3. Respons sukses dan error sudah diuji. Data masih berupa fixture development.

## Referensi

- Praktikum 4 — Endpoint Read-only dengan Laravel, materi kelas.
- [Laravel Routing](https://laravel.com/framework/docs/13.x/routing).
- [Laravel Eloquent](https://laravel.com/framework/docs/13.x/eloquent).
- [Laravel Migrations](https://laravel.com/framework/docs/13.x/migrations).
