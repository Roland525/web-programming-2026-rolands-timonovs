# Individuālā refleksija

Melnraksts mācībām. Sagatavots ar MI palīdzību. Pirms iesniegšanas jāuzraksta saviem vārdiem un jāpapildina ar saviem novērojumiem.

## 1. Kad `fetch` nemet kļūdu?

Serveris var atbildēt ar 404, un fetch tomēr saņem atbildi. Tas vēl nenozīmē, ka saņemti vajadzīgie dati. Tāpēc api.ts ir pārbaude `if (!response.ok)`. Ja tā neizpildās veiksmīgi, kods izmet kļūdu ar HTTP statusu. Tālāk lapa parāda kļūdas tekstu un pogu Try again. Bez šīs pārbaudes kods varētu mēģināt izmantot kļūdas lapu kā projektu datus.

## 2. `any` un `unknown`

Ar any var piekļūt laukiem, nepārbaudot to saturu. Kļūda tad var parādīties tikai pārlūkā. Unknown liek vispirms noskaidrot, kādi dati saņemti. Rinda `const data: unknown = await response.json()` ļauj veikt šo pārbaudi. Pieraksts `as Project[]` pats datus nepārbauda. Funkcija isProject pārbauda laukus, kategoriju un progresa robežas. Katram masīva elementam jāiztur pārbaude.

## 3. Sveša API dati

CurrentWeather dod lapai īsus un vienādus lauku nosaukumus. Piemēram, temperature_2m datu slānī kļūst par temperature. Tāpēc pārējai lapai nav jāzina visi ārējā API nosaukumi. Ja API lauks mainītos, pārbaude neizdotos un kartīte rādītu Weather unavailable. Projektu un termiņu saraksti turpinātu darboties, jo tiem ir atsevišķi ielādes stāvokļi.

## 4. Lietotāja skatījums

Pārlūka automatizētajā pārbaudē projektu pieprasījums tika bloķēts. Projektu vietā parādījās kļūda un poga Try again, bet termiņi palika redzami. Pēc bloķēšanas noņemšanas poga ielādēja projektus. Bez ielādes stāvokļiem tukšs laukums nepasaka, vai dati vēl nāk vai ir kļūda. Tagad katram gadījumam ir teksts. Šo pārbaudi var atkārtot DevTools Network cilnē.
