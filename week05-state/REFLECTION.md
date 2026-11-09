# Individuālā refleksija

Melnraksts mācībām. Sagatavots ar MI palīdzību. Pirms iesniegšanas jāuzraksta saviem vārdiem un jāpapildina ar saviem novērojumiem.

## 1. Kontrolēts lauks

Laukam ar value vajag arī onChange. Izmēģinājumā bez onChange tekstu ievadīt nevarēja, un konsole brīdināja par tikai lasāmu lauku. Value katrā zīmēšanā nāca no stāvokļa, bet nebija darbības, kas šo stāvokli maina. Pareizajā variantā onChange saņem ievadīto tekstu un nodod to update funkcijai.

## 2. Stāvoklis nav parasts mainīgais

Mainot values.description uz vietas un nododot to pašu objektu setValues, lauks palika tukšs. Pēc rakstīšanas citā laukā parādījās pēdējais burts o. React saņēma to pašu objektu un sākumā nepārzīmēja formu. Ar jaunu objektu tas pamana izmaiņu. Rakstot 42, console.log uzreiz pēc update vispirms rādīja tukšu tekstu, tad 4. Apstrādātājs vēl redzēja iepriekšējās zīmēšanas vērtību.

## 3. Kur dzīvo stāvoklis

Projektus izmanto saraksts un statistikas kartīte, tāpēc tie glabājas kopīgajā App komponentē. Ja tie būtu tikai formā, pārējās komponentes tos nesaņemtu. Forma glabā savus laukus un kļūdas. Filtru izmanto tikai ProjectSection, tāpēc tas var palikt tur. Šādi katra vērtība ir tajā vietā, kur tā tiešām vajadzīga.

## 4. Pašu hook

LocalStorage var saturēt vecus datus, nepareizu JSON vai vērtības ar citiem laukiem. IsProjectList pārbauda saņemto masīvu. Izmēģinājumā ar `{bad` lapa turpināja strādāt un parādīja API projektus. Lasīšana notiek useState sākuma funkcijā. Rakstīšana notiek save funkcijā reizē ar stāvokļa maiņu. Tāpēc papildu useEffect nav vajadzīgs. Ja saglabāšana nav iespējama, projekts vēl darbojas atvērtajā lapā.
