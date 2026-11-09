# Individuālā refleksija

Melnraksts mācībām. Sagatavots ar MI palīdzību. Pirms iesniegšanas jāuzraksta saviem vārdiem un jāpapildina ar saviem novērojumiem.

## 1. Divi pieprasījumi

Dev režīmā diviem datu avotiem kopā bija četri pieprasījumi, un divi tika atcelti. Katra efekta secība bija sākums, tīrīšana, sākums. Preview režīmā bija divi pieprasījumi, pa vienam katram avotam. StrictMode dev režīmā atkārto efektu, lai pārbaudītu tīrīšanu. Bez abort vecais pieprasījums turpinātos, kaut arī tas vairs nav vajadzīgs.

## 2. Atkarību masīvs

Bez atkarību masīva pārbaudē īsā laikā bija daudz jaunu pieprasījumu. Ielāde mainīja stāvokli, React pārzīmēja komponenti, un efekts sāka ielādi vēlreiz. Lint brīdināja par neizmantotu attempt. Ar funkciju tieši App iekšā arī sākās atkārtoti pieprasījumi. Katru reizi radās jauna funkcija. Tipu pārbaude un lint šo variantu pieņēma, tāpēc bija jāskatās tīkla darbība.

## 3. Kur dzīvo ielāde

App paliek virs maršrutiem, tāpēc projekti un termiņi saglabājas, pārejot uz citu lapu. WeatherCard ir tikai Dashboard lapā. Atgriežoties tā tiek izveidota no jauna un ielādē laikapstākļus. Pārbaudē, aizejot prom lēnas laikapstākļu ielādes laikā, pieprasījums tika atcelts. Kļūda lapā neparādījās. Atgriežoties kartīte atkal parādīja ielādi un pēc tam temperatūru.

## 4. Kad vajag `useEffect`

UseEffect šeit savieno React ar tīklu, pārlūka ritinājumu un tastatūras notikumu. Filtra maiņai pietiek ar pogas apstrādātāju un useState. Apraksta garumu var uzreiz aprēķināt no ievadītā teksta. Tam nevajag vēl vienu stāvokli vai efektu. Arī localStorage ieraksts notiek save funkcijā, kad tiek pievienots projekts. Tā ir vieglāk saprast, kura darbība ko maina.
