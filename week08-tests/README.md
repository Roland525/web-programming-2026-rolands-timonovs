# CampusFlow - 8. nedēļa

Šeit ir CampusFlow testi. Tie pārbauda filtrus, datumus, formu un pogas.

## Palaišana

Mapē `week08-tests` palaid `npm ci`. Lapu atver ar `npm run dev`.

## Pārbaude

```sh
npm run lint
npm run build
npm test
```

## Kas notika pārbaudēs?

- Kad minimālais nosaukuma garums bija 2, forma pieņēma `ab`. Tests gaidīja kļūdu.
- Bez `cleanup` otrais tests atrada divas pogas ar nosaukumu Done.
- Bez `await` tests pārbaudīja klikšķi par agru. Funkcija vēl nebija izsaukta. Lint šo kļūdu neparādīja.
- Bez pārbaudes `if (!result.ok) return` testi izgāja, bet būve apstājās ar TypeScript kļūdu TS2339.

Pēc katras pārbaudes izmaiņa tika atcelta.
