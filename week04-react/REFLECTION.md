# Individuālā refleksija

Melnraksts mācībām. Sagatavots ar MI palīdzību. Pirms iesniegšanas jāuzraksta saviem vārdiem un jāpapildina ar saviem novērojumiem.

## 1. Props tipi

Izmēģinājumā no StatCard tika izņemts obligātais note. Tipu pārbaude parādīja TS2741, jo šī īpašība trūka. Ar tone="green" parādījās TS2322, jo atļautas tikai norādītās vērtības. Pārlūka dev režīms pats neveic pilnu tipu pārbaudi. JavaScript projektā šādas tipu kļūdas netiktu atrastas pirms palaišanas. Kartītei varētu trūkt teksta vai krāsas.

## 2. Kas pārnāca, kas pazuda

Types apraksta datus, guards pārbauda saņemtās vērtības, un api.ts saņem datus no tīkla. Šie faili neveido lapas elementus, tāpēc tos varēja pārnest bez izmaiņām. Render.ts veidoja DOM elementus un ievietoja tos lapā. React projektā šo darbu dara JSX un komponentes. Kartītes dati palika līdzīgi, mainījās veids, kā tos attēlo.

## 3. Funkcija kā prop

ErrorBox rāda kļūdu un pogu. Funkcija onRetry pasaka, kas jādara pēc klikšķa. Tāpēc tā pati komponente der gan projektiem, gan termiņiem. Ja tajā būtu fetchProjects, tā būtu piesaistīta tikai projektiem. Ar `onClick={onRetry}` funkcija tiek nodota pogai. Ar iekavām funkcija tiktu izsaukta jau lapas zīmēšanas laikā.

## 4. `key` un stāvoklis

Project.id paliek saistīts ar konkrēto projektu arī tad, kad saraksts mainās. Masīva indekss var mainīties pēc filtrēšanas. Izmēģinājumā bez key tipu pārbaude izdevās, bet lint parādīja kļūdu par trūkstošu key. Filtra vērtība glabājas ProjectSection stāvoklī. Kad pēc termiņu atkārtotas ielādes ienāk jauni props, komponente paliek tajā pašā vietā. Pārbaudē filtrs Done tāpēc palika izvēlēts.
