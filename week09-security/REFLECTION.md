# Individuālā refleksija

Aizpildiet šo daļu individuāli nodarbības beigās, **neizmantojot mākslīgā intelekta rīkus**.

Ieteicamais kopējais apjoms: **aptuveni 200-300 vārdi**.

---

## 1. Viena rinda koda

3.1. un 3.2. sadaļā viens un tas pats apraksts uzvedās pilnīgi citādi.

Kas mainījās starp `{project.description}` un `dangerouslySetInnerHTML`? Kāpēc uzbrukums saglabājās arī pēc lapas pārlādes? Kāpēc `<script>` tags nenostrādāja, bet `<img onerror>` - jā, un ko tas saka par „sanitizāciju”, kas izdzēš tikai `<script>`?

---

## 2. Divas aizsardzības līnijas

Ja `renderRichText` jau aptur XSS, kāpēc vēl vajadzīga CSP? Ko jūs redzējāt 4.2. sadaļas 1. izmēģinājumā? Kāpēc stingru CSP pārbaudījām ar `preview`, nevis `dev`?

---

## 3. Svešs kods jūsu lapā

Ko atrada `npm audit`? Vai šīs ievainojamības nonāk lietotāja pārlūkā vai paliek tikai jūsu datorā? Kā jūs to noskaidrojāt?

---

## 4. Jūsu lēmums

Kur jūs glabātu CampusFlow pieteikšanās tokenu un kāpēc? Kurš uzbrukums jūsu izvēlei paliek bīstamākais, un ar ko jūs to aizvērtu?
