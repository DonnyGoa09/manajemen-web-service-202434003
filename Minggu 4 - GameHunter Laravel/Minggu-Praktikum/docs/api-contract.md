# API Contract — GameHunter

Resource utama proyek: Game. Contract ini menerjemahkan draft GameHunter Minggu 3. Bagian Book di bawah dipertahankan sebagai contoh praktikum lama.

| Method | Path | Success | Error |
| --- | --- | --- | --- |
| GET | /api/games | 200, data array | 422 query tidak valid |
| GET | /api/games/{game} | 200, data object | 404 tidak ditemukan |

Header: Accept: application/json. Endpoint publik, tanpa autentikasi.

| Field | Type | Aturan |
| --- | --- | --- |
| id | integer | Positif, dibuat server |
| title | string | 1–200 karakter |
| platform | string | pc atau browser |
| is_free | boolean | true/false |
| source | string | fixture untuk data development; integrasi penyedia belum dibuat |
| updated_at | string | ISO 8601 UTC |

Semua field read-only. Query platform opsional, hanya pc/browser; query lainnya ditolak 422. Daftar kosong: 200 dengan data: []. ID hilang atau tidak berupa integer positif: 404. POST belum tersedia (405).

Contoh detail 200:

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

404:

```json
{"message":"Resource not found","errors":null}
```

422:

```json
{"message":"The given data was invalid.","errors":{"platform":["Gunakan platform pc atau browser; hanya parameter platform yang didukung."]}}
```

Tanggal dan ID contoh boleh berbeda; struktur serta tipe harus tetap sama. Data fixture bukan harga atau katalog live.

---

# API Contract — Minggu 3

## Resource: Book

### Data Model
| Field | Type | Description | Rules |
|---|---|---|---|
| id | integer | Unique identifier | Primary key, auto-increment |
| title | string | Book title | Max 200 characters, required |
| isbn | string | International Standard Book Number | Exactly 13 characters, unique, required |
| available | boolean | Availability status | Default: true |
| created_at | string (ISO 8601) | Timestamp of creation | Auto-generated |
| updated_at | string (ISO 8601) | Timestamp of last update | Auto-generated |

---

## Endpoints

### 1. List All Books
- **Method:** `GET`
- **Path:** `/api/books`
- **Headers:**
  - `Accept: application/json`

#### Response: 200 OK
```json
{
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "isbn": "9780132350884",
      "available": true,
      "created_at": "2026-10-09T00:00:00.000000Z"
    },
    {
      "id": 2,
      "title": "The Pragmatic Programmer",
      "isbn": "9780135957059",
      "available": false,
      "created_at": "2026-10-09T00:00:00.000000Z"
    }
  ]
}
```

---

### 2. Get Book Detail
- **Method:** `GET`
- **Path:** `/api/books/{id}`
- **Headers:**
  - `Accept: application/json`

#### Response: 200 OK
```json
{
  "data": {
    "id": 1,
    "title": "Clean Code",
    "isbn": "9780132350884",
    "available": true,
    "created_at": "2026-10-09T00:00:00.000000Z"
  }
}
```

#### Response: 404 Not Found
```json
{
  "message": "Book not found",
  "errors": null
}
```
