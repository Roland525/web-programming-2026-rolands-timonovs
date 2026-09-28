# Individuālā refleksija

## 1. Ko deva tipi?

JavaScript ļauj mainīgajos glabāt dažādu tipu vērtības un bieži kļūdu parāda tikai tad, kad programma jau darbojas. TypeScript pārbauda tipus pirms lapas palaišanas. Šajā darbā TypeScript parādīja kļūdu, kad kategorija no formas bija parasts `string`, bet projektam vajadzēja tipu `Category`. Es uzrakstīju funkciju `isCategory`, kas pārbauda, vai vērtība tiešām ir viena no atļautajām kategorijām. Pēc šīs pārbaudes TypeScript saprata pareizo tipu.

## 2. `null` un `querySelector`

`querySelector` var atgriezt `null`, jo meklētais elements var nebūt HTML lapā. Tāpēc es pirms elementa izmantošanas pārbaudīju, vai tas ir atrasts. Piemēram, projektu saraksts tiek zīmēts tikai tad, ja `projectGrid` eksistē. Es izvēlējos šo veidu, jo tas ir vienkāršs un lapa nesalūzt, ja HTML trūkst kāds elements.

## 3. Dati no ārpuses

`JSON.parse` tikai pārvērš tekstu par JavaScript vērtību. Tas nepārbauda, vai rezultātā tiešām ir pareizi projekti. Lietotājs var ierakstīt `localStorage` jebkādus datus. Tāpēc es izmantoju `isProject` funkciju, kas pārbauda visus laukus. Ja dati nav pareizi, lapa izmanto sākuma projektus.

Lietotāja tekstu nedrīkst likt lapā ar `innerHTML`, jo tajā var būt HTML vai kaitīgs skripts. Es izmantoju `textContent`, tāpēc `<b>test</b>` paliek parasts teksts.

## 4. Mans vērtējums

TypeScript var būt lieks ļoti mazai vienas rindas programmai. Lielākā projektā ar formām, datiem un vairākām funkcijām tas ir noderīgs, jo palīdz agrāk pamanīt kļūdas un saprast, kādi dati katrai funkcijai ir vajadzīgi.
