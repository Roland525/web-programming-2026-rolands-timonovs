# Individuālā refleksija

Melnraksts mācībām. Sagatavots ar MI palīdzību. Pirms iesniegšanas jāuzraksta saviem vārdiem un jāpapildina ar saviem novērojumiem.

## 1. `Link` pret `<a>`

Link maina aktīvo lapu lietotnes iekšā. Pārlūka pārbaudē, pārejot no Projects uz Deadlines, jauni projektu un termiņu pieprasījumi netika veikti. Parasta a saite uz citu adresi ielādē dokumentu no jauna. Tad no jauna sākas arī datu ielāde. Formas teksts var pazust abos gadījumos, jo pēc pārejas Projects komponente vairs nav redzama.

## 2. Kas izdzīvo pāreju

Pārbaudē filtrs Done un nepievienotais formas teksts pēc aiziešanas un atgriešanās pazuda. Tie glabājas ProjectSection un AddProjectForm. Šīs komponentes tiek izveidotas no jauna. Pievienotais projekts palika, jo tā dati ir App stāvoklī. Pēc F5 projekts tiek nolasīts no localStorage. Tāpēc arī jaunā projekta detaļu adrese darbojas pēc pārlādes.

## 3. Adrese kā dati

Projekta id atrodas adresē. UseParams to nolasa, un find meklē projektu sarakstā. Adrese pēc F5 paliek tā pati, tāpēc lapa zina, ko meklēt. Vispirms jāpārbauda loading un error, tikai tad jāmeklē projekts. Lēnas ielādes pārbaudē bija redzams Loading project. Ja meklētu pārāk agri, lietotājs kļūdaini redzētu Project not found, lai gan dati vēl nav saņemti.

## 4. Kopīgais rāmis

Layout paliek ekrānā, mainoties tā iekšējai lapai. Tāpēc Header un tā izvēlnes stāvoklis arī paliek. Saitēm pievienota closeMenu funkcija, kas aizver izvēlni pēc klikšķa. Outlet norāda vietu aktīvās lapas saturam. Bez tā galvene un kājene būtu redzamas, bet izvēlētā lapa neparādītos. Pārbaudē nezināmai adresei kopīgajā rāmī parādījās 404 lapa.
