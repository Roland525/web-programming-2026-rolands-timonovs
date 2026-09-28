# Individuālā refleksija

## 1. Ko deva tipi?

JavaScript gandrīz nepārbauda tipus, bet TypeScript palīdz agrāk pamanīt kļūdas.

Piemēram, man bija problēma ar `progress`. Ja vērtība bija tukša, tā pārvērtās par `0`, lai gan tā nevajadzētu notikt. Es izlaboju vērtības pārbaudi.

## 2. `null` un `querySelector`

`querySelector` var atgriezt `null`, jo vajadzīgais elements var nebūt HTML dokumentā.

Tāpēc es izveidoju pārbaudi:

```typescript
if (!projectGrid) return;
```

Ja elements nav atrasts, kods tālāk netiek izpildīts. Tādā veidā programma neapstājas ar kļūdu.

## 3. Dati no ārpuses

`localStorage` datiem nevar pilnībā uzticēties, jo lietotājs tos var izmainīt, izmantojot DevTools. Tāpēc pēc `JSON.parse` es papildus pārbaudu datus ar funkciju `isProject`.

Lietotāja tekstu ir drošāk pievienot ar `textContent`, nevis `innerHTML`.

Piemēram, ja lietotājs ieraksta `<b>test</b>`, tad ar `textContent` tas tiks parādīts kā parasts teksts. Izmantojot `innerHTML`, pārlūkprogramma to var uztvert kā HTML kodu.

## 4. Jūsu vērtējums

Manuprāt, TypeScript nav nepieciešams ļoti mazam skriptam, kurā ir tikai dažas koda rindas un gandrīz nav datu.

Tomēr projektā ar formām, daudzām funkcijām un dažādiem datu tipiem TypeScript ir noderīgs. Tas palīdz ātrāk atrast kļūdas un labāk saprast, kādi dati tiek izmantoti kodā.
