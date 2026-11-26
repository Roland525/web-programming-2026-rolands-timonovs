# CampusFlow drošība

## 1. Audita tabula

| Apdraudējums | Kur CampusFlow | Kas to aptur | Kā pārbaudīts |
|---|---|---|---|
| Aprakstā ievadīts HTML | Projekta lapa | React rāda tagus kā tekstu. Tikai zvaigznītes un rindas pārtraukums maina izskatu. | Tests ar `<img>`. Chrome parādīja `<b>map</b>` kā tekstu arī pēc pārlādes. |
| Bojāti projekta dati | Pārlūka atmiņa | `isProjectList` pārbauda saglabātos projektus pirms lietošanas. | `guards.test.ts` pārbauda arī projektu ar progresu `"40"` skaitļa vietā. |
| Pieprasījums uz svešu adresi | Laikapstākļu kartīte | `connect-src` atļauj tikai šo vietni un laikapstākļu API. | Kad pārbaudē izņēma API no galvenes, Chrome bloķēja pieprasījumu. |
| Cita vietne ieliek CampusFlow savā rāmī | Visa lapa | `frame-ancestors 'none'` to aizliedz. | Direktīva ir lapas HTTP atbildē. |
| Pakotne ar zināmu drošības kļūdu | Projekta atkarības | `npm audit` ziņo par kļūdu. CI apstājas pie augsta riska. | Lokāls audits un atsevišķa pārbaude ar vecu `lodash`. |

## 2. CSP

- `default-src 'self'` ir pamatnoteikums resursiem bez atsevišķas direktīvas. Tos drīkst ielādēt no šīs vietnes.
- `script-src 'self'` atļauj skriptu failus no šīs vietnes.
- `style-src 'self'` atļauj stilu failus no šīs vietnes.
- `img-src 'self' data:` atļauj vietnes attēlus un attēlus no datu adresēm.
- `connect-src 'self' https://api.open-meteo.com` atļauj saņemt projektu datus un laikapstākļus.
- `object-src 'none'` aizliedz iegultus objektus.
- `base-uri 'self'` ļauj par lapas pamata adresi izvēlēties tikai šīs vietnes adresi.
- `form-action 'self'` ļauj formai sūtīt datus tikai uz šo vietni.
- `frame-ancestors 'none'` aizliedz rādīt CampusFlow citas lapas rāmī.

Ar `npm run preview` pārlūks saņēma CSP galveni. Ar `npm run dev` šīs galvenes nebija. Parastajā priekšskatījumā Rīgas laikapstākļi ielādējās. Bez API atļaujas kartītē parādījās “Weather unavailable”. [MDN par CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)

Ir vēl divas galvenes. `X-Content-Type-Options: nosniff` liek pārlūkam ievērot norādīto faila tipu. Ar `Referrer-Policy: same-origin` citas vietnes nesaņem CampusFlow lapas adresi.

## 3. Atkarības

Projekta audits atrada 0 zināmu ievainojamību. Pārbaudē bija iekļautas arī izstrādes pakotnes.

Atsevišķā mapē pārbaudīts pakotņu saraksts ar `lodash@4.17.20` kā tiešu atkarību. Audits atzīmēja vienu augsta riska pakotni. Tajā bija arī problēma ar komandu izpildi, kuru izlaboja versijā 4.17.21. Citiem ziņojumiem vajadzēja jaunāku versiju. Audits ieteica 4.18.1. CampusFlow vecā pakotne netika pievienota.

GitHub pārbaudē ir `npm audit --audit-level=high`. Zema un vidēja riska ziņojumi paliek redzami. Augsta vai kritiska riska gadījumā pārbaude apstājas, lai kļūdu varētu izskatīt pirms publicēšanas.

## 4. Tokens un CSRF

CampusFlow pašlaik nav pieteikšanās. Ja to pievienotu, sesijas tokenam izvēle būtu sīkfails ar `HttpOnly`, `Secure` un `SameSite=Lax`. JavaScript nevar nolasīt šo sīkfailu, un pārlūks to sūta pa HTTPS. Datus no `localStorage` lapas skripts var nolasīt.

CSRF nozīmē, ka cita vietne mēģina veikt darbību lietotāja vārdā. Piemēram, lietotājs ir pieteicies CampusFlow, un cita lapa mēģina mainīt viņa projekta nosaukumu.

Ar `SameSite=Lax` pārlūks sīkfailu var nosūtīt, ja lietotājs no citas vietnes seko parastai saitei uz CampusFlow. Ar `SameSite=Strict` pat šajā pirmajā pieprasījumā sīkfailu nesūta. [MDN par sīkfailiem](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)

Projekta maiņai serveris pārbaudītu arī atsevišķu CSRF tokenu. Parastas saites atvēršana projekta datus nemainītu. [OWASP par CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
