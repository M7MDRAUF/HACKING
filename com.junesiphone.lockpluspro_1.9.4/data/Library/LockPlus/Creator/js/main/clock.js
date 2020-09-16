//var lang = (window.navigator.language.length >= 2) ? window.navigator.language.split('-')[0] : 'en';

var lang = 'en';
var celsius = false;

function checkDiv(div) {
    'use strict';
    if (document.getElementById(div)) {
        return document.getElementById(div);
    }
    return;
}

function getAffix(div, type) {
    var affix = div.getAttribute('data-' + type);
    affix = affix === null ? '' : affix;
    return affix;
}

var translate = {
    en: {
        weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        sday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        smonth: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        condition: ["Tornado", "Tropical Storm", "Hurricane", "Thunderstorm", "Thunderstorm", "Snow", "Sleet", "Sleet", "Freezing Drizzle", "Drizzle", "Freezing Rain", "Showers", "Showers", "Flurries", "Snow", "Snow", "Snow", "Hail", "Sleet", "Dust", "Fog", "Haze", "Smoky", "Blustery", "Windy", "Cold", "Cloudy", "Cloudy", "Cloudy", "Cloudy", "Cloudy", "Clear", "Sunny", "Fair", "Fair", "Sleet", "Hot", "Thunderstorms", "Thunderstorms", "Thunderstorms", "Showers", "Heavy Snow", "Light Snow", "Heavy Snow", "Partly Cloudy", "Thunderstorm", "Snow", "Thunderstorm", "blank"]
    },
    ru: {
        weekday: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        sday: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        smonth: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        condition: ["Торнадо", "Тропический шторм", "Ураган", "Гроза", "Гроза", "Снег", "Мокрый снег", "Мокрый снег", "Изморозь", "Морось", "Ледяной дождь", "Ливень", "Ливень", "Сильные порывы ветра", "Снег", "Снег", "Снег", "Град", "Мокрый снег", "Пыль", "Туман", "Легкий туман", "Туманно", "Порывисто", "Ветренно", "Холодно", "Облачно", "Облачно", "Облачно", "Облачно", "Облачно", "Ясно", "Солнечно", "Ясно", "Ясно", "Мокрый снег", "Жарко", "Гроза", "Гроза", "Гроза", "Ливень", "Снегопад", "Небольшой снег", "Снегопад", "Переменная облачность", "Гроза", "Снег", "Гроза", "пусто"]
    },
    cz: {
        weekday: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
        sday: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
        smonth: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čen", "Čec", "Srp", "Zář", "Říj", "Lis", "Pro"],
        condition: ["Tornádo", "Tropická bouře", "Hurikán", "Bouře", "Bouře", "Sněžení", "Déšť a sníh", "Déšť a sníh", "Mrznoucí mrholení", "Mrholení", "Mrznoucí déšť", "Přeháňky", "Přeháňky", "Poryvy větru", "Sněžení", "Sněžení", "Sněžení", "Kroupy", "Déšť a sníh", "Prach", "Mlhy", "Řídké mlhy", "Kouř", "Větrno s bouřkami", "Větrno", "Chladno", "Oblačno", "Oblačno", "Oblačno", "Oblačno", "Oblačno", "Jasno", "Slunečno", "Krásně", "Krásně", "Déšť a sníh", "Horko", "Bouře", "Bouře", "Bouře", "Přeháňky", "Husté sněžení", "Lehké sněžení", "Husté sněžení", "Polojasno", "Bouře", "Sněžení", "Bouře", "prázdné"]
    },
    it: {
        weekday: ['Domenica', 'Luned&#236', 'Marted&#236', 'Mercoled&#236', 'Gioved&#236', 'Venerd&#236', 'Sabato'],
        sday: ["Sun", "Mon", "Mar", "Mer", "Gio", "Ven", "Sat"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        smonth: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        condition: ["Tornado", "Tempesta Tropicale", "Uragano", "Temporali Forti", "Temporali", "Pioggia mista a Neve", "Nevischio", "Nevischio", "Pioggia Gelata", "Pioggerella", "Pioggia Ghiacciata", "Pioggia", "Pioggia", "Neve a Raffiche", "Neve Leggera", "Tempesta di Neve", "Neve", "Grandine", "Nevischio", "Irregolare", "Nebbia", "Foschia", "Fumoso", "Raffiche di Vento", "Ventoso", "Freddo", "Nuvoloso", "Molto Nuvoloso", "Molto Nuvoloso", "Nuvoloso", "Nuvoloso", "Sereno", "Sereno", "Bel Tempo", "Bel Tempo", "Pioggia e Grandine", "Caldo", "Temporali Isolati", "Temporali Sparsi", "Temporali Sparsi", "Rovesci Sparsi", "Neve Forte", "Nevicate Sparse", "Neve Forte", "Nuvoloso", "Rovesci Temporaleschi", "Rovesci di Neve", "Temporali isolati", "Non Disponibile"]
    },
    sp: {
        weekday: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        sday: ["Sol", "Mon", "Mar", "Mie", "Jue", "Vie", "Sat"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        smonth: ["Ene", "Feb", "Mar", "Abr", "Mayo", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic"],
        condition: ["Tornado", "Tormenta Tropical", "Huracan", "Tormentas Electricas Severas", "Tormentas Electricas", "Mezcla de Lluvia y Nieve", "Mezcla de lluvia y aguanieve", "Mezcla de nieve y aguaniev", "Llovizna helada", "Llovizna", "Lluvia bajo cero", "Chubascos", "Chubascos", "Rafagas de nieve", "Ligeras precipitaciones de nieve", "Viento y nieve", "Nieve", "Granizo", "Aguanieve", "Polvareda", "Neblina", "Bruma", "Humeado", "Tempestuoso", "Vientoso", "Frio", "Nublado ", "Mayormente nublado", "Mayormente nublado", "despejado", "despejado", "Despejado", "Soleado", "Lindo", "Lindo", "Mezcla de lluvia y granizo", "Caluroso", "Tormentas electricas aisladas", "Tormentas electricas dispersas", "Tormentas electricas dispersas", "Chubascos dispersos", "Nieve fuerte", "Precipitaciones de nieve dispersas", "Nieve fuerte", "despejado", "Lluvia con truenos y relampagos", "Precipitaciones de nieve", "Tormentas aisladas", "No disponible"]
    },
    de: {
        weekday: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        sday: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Ju li", "August", "September", "Oktober", "November", "Dez ember"],
        smonth: ["Jan", "Feb", "Mä", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez "],
        condition: ["Tornado", "Tropischer Sturm", "Wirbelsturm", "Schwere Gewitter", "Gewitter", "Regen und Schnee", "Graupelschauer", "Schneeregen", "Gefrierender Nieselregen", "Nieselregen", "Gefrierender Regen", "Schauer", "Schauer", "Schneegestöber", "Leichte Schneeschauer", "Schneetreiben", "Schnee", "Hagel", "Schneeregen", "Staubig", "Nebelig", "Dunstschleier", "Dunstig", "Stürmisch", "Windig", "Kalt", "Bewölkt", "Meist Bewölkt", "Meist Bewölkt", "Bewölkt", "Bewölkt", "Klar", "Sonnig", "Heiter", "Heiter", "Regen und Hagel", "Heiss", "Örtliche Gewitter", "Vereinzelte Gewitter", "Vereinzelte Gewitter", "Vereinzelte Schauer", "Starker Schneefall", "Vereinzelte Schneeschauer", "Starker Schneefall", "Bewölkt", "Gewitter", "Scheeschauer", "Örtliche Gewitterschauer", "Nicht Verfügbar"]
    },
    fr: {
        weekday: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        sday: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ["Janvie", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        smonth: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jui", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        condition: ["Tornade", "Tropical", "Ouragan", "Orages Violents", "Orages", "Pluie", "Pluie", "Neige", "Bruine", "Bruine", "Pluie", "Averses", "Averses", "Quelques Flocons", "Faibles Chutes de Neige", "Rafales de Neige", "Neige", "GrÃªle", "Neige Fondue", "PoussiÃ©reux", "Brouillard", "Brume", "Brumeux", "TempÃªte", "Vent", "Temps Froid", "Temps Nuageux ", "TrÃ¨s Nuageux", "TrÃ¨s Nuageux", "Nuageux", "Nuageux", "Temps Clair", "Ensoleille", "Beau Temps", "Beau Temps", "Pluie et GrÃªles", "Temps Chaud", "Orages IsolÃ©s", "Orages Eparses", "Orages Eparses", "Averses Eparses", "Fortes Chutes de Neige", "Chutes de Neige Eparses", "Fortes Chutes de Neige", "Nuageux", "Orages", "Chute de Neige", "Orages IsolÃ©s", "Non Disponible"]
    },
    zh: {
        weekday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        sday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        mday: ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        smonth: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        condition: ["龙卷风", "热带风暴", "飓风", "雷暴", "雷暴", "雪", "雨雪", "雨雪", "冻毛毛雨", "细雨", "冻雨", "淋浴", "淋浴", "飘雪", "雪", "雪", "雪", "Hail", "雨雪", "尘", "牙齿", "阴霾", "烟", "风起云涌", "有风", "冷", "多云", "多云", "多云", "多云", "多云", "明确", "晴朗", "公平", "公平", "雨雪", "Hot", "雷暴", "雷暴", "雷暴", "淋浴", "大雪", "小雪", "大雪", "半 多云", "雷暴", "雪", "雷暴", "空白"]
    }
};

function clock(options) {
    'use strict';
    var getTimes = function () {
            var d = new Date(),
                funcs = {
                    daysInMonth: [31,0,31,30,31,30,31,31,30,31,30,31],
                    hour: function () {
                        var hour = (options.twentyfour === true) ? d.getHours() : (d.getHours() + 11) % 12 + 1;
                        return hour;
                    },
                    zhour : function () {
                        var hour = (options.twentyfour === true) ? d.getHours() : (d.getHours() + 11) % 12 + 1;
                        hour = hour < 10 ? "0" + hour : " " + hour;
                        return hour;
                    },
                    rawhour: function () {
                        return d.getHours();
                    },
                    minute: function () {
                        return (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                    },
                    second: function () {
                        return (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();
                    },
                    rawminute: function () {
                        return d.getMinutes();
                    },
                    ampmstrict: function(){
                        return (d.getHours() > 11) ? "pm" : "am";
                    },
                    am: function () {
                        return (d.getHours() > 11) ? "pm" : "am";
                    },
                    amalways: function(){
                        return (d.getHours() > 11) ? "pm" : "am";
                    },
                    tod: function() {
                        return (d.getHours() < 12 ? 'Morning' : d.getHours() < 18 ? 'Afternoon' : 'Evening');
                    },
                    tod2: function() {
                        return (d.getHours() < 12 ? 'Morning' : d.getHours() < 18 ? 'Afternoon' : 'Night');
                    },
                    date: function () {
                        return d.getDate();
                    },
                    paddeddate: function () {
                        return (d.getDate() <= 9) ? "0" + d.getDate() : d.getDate();
                    },
                    prevdate: function () {
                        var pd = (this.date() === 0) ? this.daysInMonth[this.month() - 1] : this.date() - 1;
                        return pd;
                    },
                    nextdate: function () {
                        var nd = (this.date() === 0) ? this.daysInMonth[this.month() + 1] : this.date() + 1;
                        return nd;
                    },
                    day: function () {
                        return d.getDay();
                    },
                    month: function () {
                        return d.getMonth();
                    },
                    monthdate: function() {
                        var month = this.month() + 1;
                        if (month > 12) {
                            month = 0;
                        }
                        return month;
                    },
                    monthdatepadded: function () {
                        var month = this.month() + 1;
                        if (month > 12) {
                            month = 0;
                        }
                        return (month <= 9) ? "0" + month : month;
                    },
                    year: function () {
                        return d.getFullYear();
                    },
                    smyear: function () {
                        return d.getFullYear() % 1000;
                    },
                    hourtext: function () {
                        var hourtxt = (options.twentyfour === true) ? ["Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty One", "Twenty Two", "Twenty Three", "Twenty Four"] : ["Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
                        return hourtxt[this.rawhour()];
                    },
                    minuteonetext: function () {
                        var minuteone = ["o' clock", "o' one", "o' two", "o' three", "o' four", "o' five", "o' six", "o' seven", "o' eight", "o' nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                        if (minuteone[this.rawminute()] !== undefined) {
                            return minuteone[this.rawminute()];
                        }
                        return "";
                    },
                    minuteonetextNoSpace: function () {
                        var minuteone = ["o'clock", "o'one", "o'two", "o'three", "o'four", "o'five", "o'six", "o'seven", "o'eight", "o'nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                        if (minuteone[this.rawminute()] !== undefined) {
                            return minuteone[this.rawminute()];
                        }
                        return "";
                    },
                    minuteonetext2: function () {
                        var minuteone = ["zero zero", "zero one", "zero two", "zero three", "zero four", "zero five", "zero six", "zero seven", "zero eight", "zero nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                        if (minuteone[this.rawminute()] !== undefined) {
                            return minuteone[this.rawminute()];
                        }
                        return "";
                    },
                    minuteonetext3: function () {
                        var minuteone = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine", "thirty", "thirty one", "thirty two", "thirty three", "thirty four", "thirty five", "thirty six", "thirty seven", "thirty eight", "thirty nine", "forty", "forty one", "forty two", "forty three", "forty four", "forty five", "forty six", "forty seven", "forty eight", "forty nine", "fifty", "fifty one", "fifty two", "fifty three", "fifty four", "fifty five", "fifty six", "fifty seven", "fifty eight", "fifty nine", "sixty"];
                        if (minuteone[this.rawminute()] !== undefined) {
                            return minuteone[this.rawminute()];
                        }
                        return "";
                    },
                    minuteonetextdot: function () {
                        var minuteone = ["", "one", "o.two", "o.three", "o.four", "o.five", "o.six", "o.seven", "o.eight", "o.nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                        if (minuteone[this.rawminute()] !== undefined) {
                            return minuteone[this.rawminute()];
                        }
                        return "";
                    },
                    minutetwotext: function () {
                        var minutetwo = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", ""];
                        if (minutetwo[this.rawminute()] !== undefined) {
                            return minutetwo[this.rawminute()];
                        }
                        return "";
                    },
                    daytext: function () {
                        return translate[lang].weekday[this.day()];
                    },
                    daysLeft: function() {
                        var nextYear = new Date("Jan 1, " + Number(d.getFullYear() + 1) + " 00:00:00").getTime(),
                            today = new Date().getTime(),
                            sep = nextYear - today,
                            days = Math.floor(sep / (1000 * 60 * 60 * 24));
                        //var hours = Math.floor((sep % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        //var minutes = Math.floor((sep % (1000 * 60 * 60)) / (1000 * 60));
                        //var seconds = Math.floor((sep % (1000 * 60)) / 1000);
                        return days;
                    },
                    daysLeftPercentLeft: function(){
                        var now = new Date();
                        var start = new Date(now.getFullYear(), 0, 0);  // Start of this year
                        var end = new Date(now.getFullYear() + 1, 0, 0);  // End of this year
                        var done = (now-start) / (end-start);
                        return Math.round(100 - (done*100)) + "%";
                    },
                    daysLeftPercentToGo: function(){
                        var now = new Date();
                        var start = new Date(now.getFullYear(), 0, 0);  // Start of this year
                        var end = new Date(now.getFullYear() + 1, 0, 0);  // End of this year
                        var done = (now-start) / (end-start);
                        return  Math.round(done*100) + "%";
                    },
                    yesterdaydaytext: function () {
                        return (this.day() === 0) ? translate[lang].weekday[6] : translate[lang].weekday[this.day() - 1];
                    },
                    nextdaytext: function () {
                        return (this.day() === 6) ? translate[lang].weekday[0] : translate[lang].weekday[this.day() + 1];
                    },
                    sdaytext: function () {
                        return translate[lang].sday[this.day()];
                    },
                    mdaytext: function () {
                        return translate[lang].mday[this.day()];
                    },
                    snextday: function () {
                        return (this.day() === 6) ? translate[lang].sday[0] : translate[lang].sday[this.day() + 1];
                    },
                    sprevday: function () {
                        return (this.day() === 0) ? translate[lang].sday[6] : translate[lang].sday[this.day() - 1];
                    },
                    monthtext: function () {
                        return translate[lang].month[this.month()];
                    },
                    nextmonthtext: function () {
                        return (this.month() === 11) ? translate[lang].month[0] : translate[lang].month[this.month() + 1];
                    },
                    prevmonthtext: function () {
                        return (this.month() === 0) ? translate[lang].month[11] : translate[lang].month[this.month() - 1];
                    },
                    smonthtext: function () {
                        return translate[lang].smonth[this.month()];
                    },
                    snextmonth: function () {
                        return (this.month() === 11) ? translate[lang].smonth[0] : translate[lang].smonth[this.month() + 1];
                    },
                    sprevmonth: function () {
                        return (this.month() === 0) ? translate[lang].smonth[11] : translate[lang].smonth[this.month() - 1];
                    },
                    datetext: function () {
                        var textdate = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eightheenth", "Nineteenth", "Twentyith", "TwentyFirst", "TwentySecond", "TwentyThird", 'TwentyFourth', "TwentyFifth", "TwentySixth", "TwentySeventh", "TwentyEight", "TwentyNinth", "Thirtyith", "ThirtyFirst"];
                        return textdate[this.date() - 1];
                    },
                    nth: function (d) {
                        if (d > 3 && d < 21) {
                            return 'th';
                        }
                        switch (d % 10) {
                        case 1:
                            return "st";
                        case 2:
                            return "nd";
                        case 3:
                            return "rd";
                        default:
                            return "th";
                        }
                    },
                    dateplus: function () {
                        return this.date() + this.nth(Number(this.date()));
                    }
                };
            options.success(funcs);
            // setTimeout(function () {
            //     getTimes();
            // }, options.refresh);
        };
    getTimes();
}

function convertTOWord(num){
    var onesText = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        tensText = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        aboveText = ['', ' thousand ', ' million ', ' billion ', ' trillion ', ' quadrillion ', ' quintillion ', ' sextillion '],
        generatedArray = [],
        converted = '',
        i = 0;
        while(num){
            generatedArray.push( num % 1000 );
            num = parseInt( num / 1000, 10 );
        }
        while (generatedArray.length) {
            converted = (function( a ) {
                var x = Math.floor( a / 100 ),
                    y = Math.floor( a / 10 ) % 10,
                    z = a % 10;
                return ( x > 0 ? onesText[x] + ' hundred ' : '' ) +
                       ( y >= 2 ? tensText[y] + ' ' + onesText[z] : onesText[10*y + z] );
            })( generatedArray.shift() ) + aboveText[i++] + converted;
        }
        return converted;
}
//clock
function loadClock() {
    clock({
        twentyfour: false,
        refresh: 1000,
        success: function (clock) {
            'use strict';
            window.cF = clock;
            var clockElements = {
                min1: clock.minuteonetext(),
                min3: clock.minuteonetextNoSpace(),
                min2: clock.minutetwotext(),
                monthDPadded: clock.monthdatepadded(),
                fullclock: clock.zhour() + ":" + clock.minute() + ":" + clock.second(),
                datedotsmonth: clock.date() + '.' + clock.sdaytext(),
                datedotsmonthpad: clock.paddeddate() + '.' + clock.sdaytext(),
                smonthdotdate: clock.sdaytext() + '.' + clock.date(),
                smonthdotdatepad: clock.sdaytext() + '.' + clock.paddeddate(),
                monthnumslashdatepad: clock.monthdate() + '/' + clock.paddeddate(),
                monthnumslashdatepad2: clock.monthdatepadded() + '/' + clock.paddeddate(),
                monthnumslashdatepad3: clock.paddeddate() + '/' + clock.monthdatepadded(),
                monthnumslashdate: clock.monthdate() + '/' + clock.date(),
                dateslashmonthpad: clock.paddeddate() + '/' + clock.monthdate(),
                dateslashmonthnumber: clock.date() + '/' + clock.monthdate(),
                dateliketime1: clock.paddeddate() + ':' + clock.monthdatepadded(),
                dateliketime2: clock.monthdatepadded() + ':' + clock.paddeddate(),
                dateslashmonth: clock.date() + '/' + clock.monthtext(),
                dstring: clock.sdaytext() + ', ' + clock.smonthtext() + ' ' + clock.date(),
                dstringpad: clock.sdaytext() + ', ' + clock.smonthtext() + ' ' + clock.paddeddate(),
                daycut1: clock.daytext().substring(1),
                daycut2: clock.daytext().substring(2),
                daycut: clock.daytext().substring(3),
                smonthsplit: clock.monthtext().substring(3),
                timer: "00:00",
                lngclstring: "It's " + clock.hour() + ":" + clock.minute() + " on " + clock.daytext() + " the " + clock.dateplus(),
                clock: clock.hour() + ":" + clock.minute(),
                zclock: clock.zhour() + ":" + clock.minute(),

                clockdot: clock.hour() + "." + clock.minute(),
                zclockdot: clock.zhour() + "." + clock.minute(),

                clockline : clock.hour() + "|" + clock.minute(),
                clockpm : clock.hour() + ":" + clock.minute() + clock.am(),
                zhour: clock.zhour(),
                hour: clock.hour(),
                hrmin: clock.hourtext() + '.' + clock.minute(),
                hrmintx: (clock.minutetwotext() !== "") ? clock.hourtext() + '.' + clock.minuteonetextdot() +  '.' + clock.minutetwotext() : clock.hourtext() + '.' + clock.minuteonetextdot() + clock.minutetwotext(),
                minute: clock.minute(),
                second: clock.second(),
                pm: clock.am(),
                amalways: clock.amalways(),
                tod: clock.tod(),
                tod2: clock.tod2(),
                ttext: clock.hourtext() + " " + clock.minuteonetext() + ' ' + clock.minutetwotext(),
                htext: clock.hourtext(),
                mtext: clock.minuteonetext() + ' ' + clock.minutetwotext(),
                mtext2: clock.minuteonetext2() + ' ' + clock.minutetwotext(),
                mtext3: clock.minuteonetext3(),
                date: clock.date(),
                datepad: clock.paddeddate(),
                datepadfirst: String(clock.paddeddate()).charAt(0),
                datepadsecond: String(clock.paddeddate()).charAt(1),
                prevdate: clock.prevdate(),
                nextdate: clock.nextdate(),
                dateplus: clock.dateplus(),
                datetext: clock.datetext(),
                day: clock.daytext(),

                //ttextstr: clock.hourtext() + "" + clock.minuteonetext() + '' + clock.minutetwotext() + '<span style="text-transform:uppercase">' + clock.daytext() + "</span>the" + clock.dateplus(),

                sclock: clock.hour() + ":" + clock.minute() + clock.ampmstrict(),
                sclockpadded: clock.zhour() + ":" + clock.minute() + clock.ampmstrict(),
                daysleft: clock.daysLeft(),
                daysleftpercent: clock.daysLeftPercentLeft(),
                daysleftpercent2: clock.daysLeftPercentToGo(),
                daydate: clock.daytext() + " " + clock.date(),
                datestringrev: clock.monthtext() + " " + clock.date() + ", " + clock.daytext(),
                nextday: clock.nextdaytext(),
                yestday: clock.yesterdaydaytext(),
                sday: clock.sdaytext(),
                mday: clock.mdaytext(),
                sday1: clock.sdaytext().slice(0,1),
                sday2: clock.sdaytext().slice(1,2),
                sday3: clock.sdaytext().slice(2,3),
                snextday: clock.snextday(),
                sprevday: clock.sprevday(),
                month: clock.monthtext(),
                nextmonth: clock.nextmonthtext(),
                prevmonth: clock.prevmonthtext(),
                monthstring: clock.monthtext() + " the " + clock.dateplus(),
                datedotmonth: clock.paddeddate() + '.' + clock.monthtext(),
                datemonth : clock.date() + " " + clock.monthtext(),
                datemonthrev: clock.monthtext() + " " + clock.date(),
                smonth: clock.smonthtext(),
                smonth1: clock.smonthtext().slice(0,1),
                smonth2: clock.smonthtext().slice(1,2),
                smonth3: clock.smonthtext().slice(2,3),
                snextmonth: clock.snextmonth(),
                sprevmonth: clock.sprevmonth(),
                monthdot : clock.monthtext() + "." + clock.paddeddate(),
                monthdateyear : clock.monthtext() + " " + clock.date() + ", " + clock.year(),
                monthline : clock.monthtext() + "|" + clock.date() + "|" + clock.year(),
                monthlinespace : clock.monthtext() + " | " + clock.date() + " | " + clock.year(),
                mdy : clock.monthdate() + "/" + clock.date() + "/" + clock.year(),
                mdy2 : clock.date() + "/" + clock.monthdate() + "/" + clock.year(),
                monthD: clock.monthdate(),
                datestring : clock.daytext() + ", " + clock.monthtext() + " " + clock.date(),
                datespace : clock.daytext() + " " + clock.monthtext() + " " + clock.date(),
                datedash : clock.daytext() + "-" + clock.monthtext() + "-" + clock.date(),
                dateplusof : clock.dateplus() + " of " + clock.monthtext(),
                dateplusplusof : clock.daytext() + ", " + clock.dateplus() + " of " + clock.monthtext(),
                year: clock.year(),
                daydotdate: clock.daytext() + "." + clock.date(),
                daydatemonth: clock.daytext() + " | " + clock.date() + " " + clock.monthtext(),
                daydatemonth2: clock.date() + " " + clock.monthtext() + " | " + clock.daytext(),
                daydatesmonth: clock.daytext() + ' ' + clock.date() + ' ' + clock.smonthtext(),
                daydatescommamonth: clock.daytext() + ', ' + clock.date() + ' ' + clock.smonthtext(),
                yeartext: convertTOWord(clock.year()),
                yearnum: clock.year().toString().slice(2,4),
                clocksmush: clock.hour() + "" + clock.minute(),
                clocksmush1: clock.hour() + "" + clock.minute(),
                clockdsh1: clock.zhour() + "-" + clock.minute(),
                clockdsh2: clock.hour() + "-" + clock.minute(),
                hrnsmin: clock.hourtext() + ' ' + clock.minute(),
                datebar: clock.monthdate() + '|' + clock.date() + '|' + clock.smyear(),
                datebar2: clock.date() + '|' + clock.monthdate() + '|' + clock.smyear(),
                datesnslash: clock.monthdate() + '/' + clock.date() + '/' + clock.smyear(),
                datesnslash2: clock.date() + '/' + clock.monthdate() + '/' + clock.smyear(),
                datesingled: clock.month() + 1  + '-' + clock.date() + '-' + clock.smyear(),
                datesingled2: clock.date() + '-' + clock.monthdate() + '-' + clock.smyear(),
                hrsmush: clock.hourtext() + '' + clock.minute(),
                dayabdatemonth: clock.sdaytext() + ' ' + clock.date() + ' ' + clock.smonthtext(),
                daycommadatemonth: clock.sdaytext() + ', ' + clock.date() + ' ' + clock.smonthtext(),
                datemonthfirst: clock.date() + ' ' + clock.monthtext(),
                nsmd : clock.smonthtext() + " " + clock.date(),
                ndsm2: cF.paddeddate() + " " + cF.smonthtext(),
                ndsm3: cF.smonthtext() + " " + cF.paddeddate(),
                ndsm4: cF.sdaytext() + " " + cF.paddeddate(),
                ndsm : clock.date() + " " + clock.smonthtext(),
                ndsmP : clock.paddeddate() + " " + clock.smonthtext(),
                ndsmd : clock.date() + " " + clock.sdaytext(),
                nsmdd: clock.sdaytext() + " " + clock.date(),
                ndatedash: clock.daytext() + " - " + clock.monthtext() + " - " + clock.date(),
                nsmmyear: clock.smonthtext() + " " + clock.year(),
                nmdplusyear: clock.monthtext() + " " + clock.dateplus() + " " + clock.year(),
                nhrtmin: clock.hourtext() + ':' + clock.minute(),
                nhrtmin2: clock.zhour() + ':' + clock.minuteonetext() + ' ' + clock.minutetwotext(),
                nhrtmin3: clock.zhour() + ':' + clock.minuteonetextNoSpace() + ' ' + clock.minutetwotext(),
                nhrtarrowmin: clock.hourtext() + '>>' + clock.minute(),
                nttext: "[" + clock.hourtext() + "]" + "" + clock.minuteonetext() + '' + clock.minutetwotext(),
                nttext2: "(" + clock.hourtext() + ")" + "" + clock.minuteonetext() + '' + clock.minutetwotext(),
                smdotdate: clock.smonthtext() + '.' + clock.date(),
                datesmdot: clock.date() + '.' + clock.smonthtext(),
                monthdayyear : clock.monthtext() + " " + clock.date() + " " + clock.year(),
                monthslashdate: clock.monthtext() + '/' + clock.date(),
                fullmonthdotdate: clock.monthtext() + '.' + clock.date(),
                datedotmonthfull: clock.date() + '.' + clock.monthtext(),
                datemonthyear: clock.date() + ' ' + clock.monthtext() + ', ' + clock.year(),
                prevdaystrings: clock.yesterdaydaytext() + ' ' + clock.monthtext() + ' ' + clock.prevdate(),
                todaystrings: clock.daytext() + ' ' + clock.monthtext() + ' ' + clock.date(),
                nextdaystrings: clock.nextdaytext() + ' ' + clock.monthtext() + ' ' + clock.nextdate(),


                datemonthnum: clock.paddeddate() + '' + clock.monthdatepadded(),
                monthnumdate: clock.monthdatepadded() + '' + clock.paddeddate(),
                timeslashdatemonth: clock.zhour() + clock.minute() + " / " + clock.paddeddate() + '' + clock.monthdatepadded(),
                timeslashmonthdate: clock.zhour() + clock.minute() + " / " + clock.monthdatepadded() + '' + clock.paddeddate(),
                monthdateslashtime: clock.monthdatepadded() + '' + clock.paddeddate()  + " / " + clock.zhour() + clock.minute(),
                datemonthslashtime: clock.paddeddate() + '' + clock.monthdatepadded() + " / " + clock.zhour() + clock.minute(),

                sdaymonthdate: clock.sdaytext() + ', ' + clock.monthtext() + ' ' + clock.paddeddate(),
                sdaydatemonth: clock.sdaytext() + ', ' + clock.paddeddate() + ' ' + clock.monthtext(),
                sdaymonthdateno: clock.sdaytext() + ' ' + clock.monthtext() + ' ' + clock.paddeddate(),
                sdaydatemonthno: clock.sdaytext() + ' ' + clock.paddeddate() + ' ' + clock.monthtext(),
                sdaymonth: clock.sdaytext() + ', ' + clock.monthtext(),
            };
            Object.keys(clockElements).forEach(function (key) {
                var value = clockElements[key],
                    div = checkDiv(key);
                if (div) {
                    //Knockout is for SVG
                    if(div.classList.contains('knockout')){
                        if(document.getElementById(div.id + 'knockout')){
                            document.getElementById(div.id + 'knockout').innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
                        }
                    }else{
                        div.innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
                    }
                }
            });
        }
    });
}
loadClock();
//endclock
var weatherdivs = function () {
    'use strict';
    var tcf = (celsius === true) ? 'c' : 'f',
        spd = (celsius === true) ? 'kph' : 'mph',
        weatherElements = {
            coloricon: 'j',
            medwstring: "Cloudy &amp; 76&deg;",
            temp : '76',
            tempdeg : '76&deg;',
            tempdegplus : '76&degF',
            high : '80',
            highdeg : '80&deg',
            highdegplus : '80&degF',
            low : '70',
            lowdeg : '70&deg;',
            lowdegplus : '70&deg;F',
            highdashlow : '80-70',
            highslashlow : '80/70',
            highdashlowdeg : '80&deg;-70&deg;',
            highslashlowdeg : '80&deg;/70&deg;',
            lngwstring: "It's cloudy outside and the temp is around 35&deg;.",
            lngwstring2: "Currently it's 35&deg; outside.",
            lngwstring3: "Currently it's cloudy, the high today will reach 60&deg; </br> Right now it's 90&deg; and your battery is 50%",
            lngwstring4: "It could be cloudy and 50&deg; but who really knows. </br> What I can tell you is your battery is 50%:)",
            lngwstring5: "The current temperature is 90&deg;, it's cloudy with a wind speed of 30mph. </br> Your battery is at 90% and is charging.",
            city : 'Current City',
            condition : 'Cloudy',
            humidity : '60',
            windchill : '20&deg;',
            wind : '25mph',
            winddirection : 'N',
            visibility : '20miles',
            rain : '20%',
            dewpoint : '40&deg;',
            feelslike: '90',
            feelslikedeg: '90&deg;',
            sunrise: '5:00',
            sunset: '7:00',
            update: '7/11/15 8:05',
            icon: 'weather/real/simply.png',
            uvindex: '3',
            county: 'Shelby',
            country: 'United States',
            countryAbbr: 'US',
            //state: 'Tennessee',
            stateAbbr: 'TN',
            pressure: '30.0',
            pressureRising: '1',
            heatindex:'1',
            airquality: '10',
            hour1: "2:00",

            hour1temp: "39°",
            hour1icon: 'weather/real/simply.png',
            hour1precip: '20%',

            hour2: "2:00",
            hour2temp: "39°",
            hour2icon: 'weather/real/simply.png',
            hour2precip: '20%',

            hour3: "2:00",
            hour3temp: "39°",
            hour3icon: 'weather/real/simply.png',
            hour3precip: '20%',

            hour4: "2:00",
            hour4temp: "39°",
            hour4icon: 'weather/real/simply.png',
            hour4precip: '20%',

            hour5: "2:00",
            hour5temp: "39°",
            hour5icon: 'weather/real/simply.png',
            hour5precip: '20%',

            day1day: "Mon",
            day2day: "Tue",
            day3day: "Wed",
            day4day: "Thu",
            day5day: "Fri",

            day1lohigh: '75°/50°',
            day2lohigh: '75°/50°',
            day3lohigh: '75°/50°',
            day4lohigh: '75°/50°',
            day5lohigh: '75°/50°',

            day1icon: 'weather/real/simply.png',
            day2icon: 'weather/real/simply.png',
            day3icon: 'weather/real/simply.png',
            day4icon: 'weather/real/simply.png',
            day5icon: 'weather/real/simply.png',

            day1high: '75°',
            day2high: '75°',
            day3high: '75°',
            day4high: '75°',
            day5high: '75°',

            day1low: '50°',
            day2low: '50°',
            day3low: '50°',
            day4low: '50°',
            day5low: '50°',

            day1highno: '75',
            day2highno: '75',
            day3highno: '75',
            day4highno: '75',
            day5highno: '75',

            day1lowno: '50',
            day2lowno: '50',
            day3lowno: '50',
            day4lowno: '50',
            day5lowno: '50',

            hourlystring1: "10:00 Temp:50° Precip: 20%",
            hourlystring2: "11:00 Temp:50° Precip: 20%",
            hourlystring3: "12:00 Temp:50° Precip: 20%",
            hourlystring4: "01:00 Temp:50° Precip: 20%",
            hourlystring5: "02:00 Temp:50° Precip: 20%",

            hourlystringtemp1: "10:00 50°",
            hourlystringtemp2: "11:00 50°",
            hourlystringtemp3: "12:00 50°",
            hourlystringtemp4: "01:00 50°",
            hourlystringtemp5: "02:00 50°",

            hourlystringtempdash1: "10:00 - 50°",
            hourlystringtempdash2: "11:00 - 50°",
            hourlystringtempdash3: "12:00 - 50°",
            hourlystringtempdash4: "01:00 - 50°",
            hourlystringtempdash5: "02:00 - 50°",

            hourlystringtempcolon1: "10:00 : 50°",
            hourlystringtempcolon2: "11:00 : 50°",
            hourlystringtempcolon3: "12:00 : 50°",
            hourlystringtempcolon4: "01:00 : 50°",
            hourlystringtempcolon5: "02:00 : 50°",

            hourlystringprecip1: "10:00 20%",
            hourlystringprecip2: "11:00 20%",
            hourlystringprecip3: "12:00 20%",
            hourlystringprecip4: "01:00 20%",
            hourlystringprecip5: "02:00 20%",

            hourlystringprecipdash1: "10:00 - 20%",
            hourlystringprecipdash2: "11:00 - 20%",
            hourlystringprecipdash3: "12:00 - 20%",
            hourlystringprecipdash4: "01:00 - 20%",
            hourlystringprecipdash5: "02:00 - 20%",

            hourlystringprecipcolon1: "10:00 : 20%",
            hourlystringprecipcolon2: "11:00 : 20%",
            hourlystringprecipcolon3: "12:00 : 20%",
            hourlystringprecipcolon4: "01:00 : 20%",
            hourlystringprecipcolon5: "02:00 : 20%",

            tempcon: '76 Cloudy',
            tempcon1: '76°f Cloudy',
            tempcon2: '76° Cloudy',
            contemp: "Cloudy 76°",
            contemp2: "Cloudy 76°f",
            windstr: '25mph N'
    };
    Object.keys(weatherElements).forEach(function (key) {
        var value = weatherElements[key],
            div = checkDiv(key);
        if (div) {
            if (key === 'icon' || key === 'day1icon' || key === 'day2icon' || key === 'day3icon' || key === 'day4icon' || key === 'day5icon' || key === 'hour1icon' || key === 'hour2icon' || key === 'hour3icon' || key === 'hour4icon' || key === 'hour5icon') {
                if (!document.getElementById(key).innerHTML.length > 0) {
                    var img = document.createElement('img');
                    img.id = 'iconImg' + key;
                    img.src = value;
                    img.className = 'icon';
                    img.style.width = action.savedElements.placedElements[key]['width'];
                    img.style.height = action.savedElements.placedElements[key]['height'];
                    div.appendChild(img);
                }
            } else {
                div.innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
            }
        }
    });
};
weatherdivs();
//systemEl: ['name~Displays name of the phone', 'firmware~Current firmware', 'battery~Current battery', 'batterypercent~Current battery plus percent', 'unlock~text when tapped unlocks device'],
var systemdivs = function () {
    'use strict';
    var systemEl = {
        name: 'JunesiPhone',
        phonename: 'JunesiPhone', //[[UIDevice currentDevice] name];
        phonename2: 'Hello, JunesiPhone',
        phonename3: 'Good Morning, JunesiPhone',
        firmware: 'Version 8.3 (Build 12F70)', //[NSProcessInfo processInfo].operatingSystemVersionString;
        battery: '100', //Math.round([[UIDevice currentDevice]batteryLevel] * 100);
        batterypercent: '100%',
        chargingtxt: 'Not Charging',
        chargingstate: 'Charging',
        onlycharging: 'Charging',
        batteryperslashcharge: "80% / charging",
        ipaddress: "192.168.x.x",
        unlock: 'Unlock',
        respring: 'Respring',
        sleep: 'Sleep',
        flashlight: 'Flashlight',
        playmusic: 'r',
        nextmusic: 'y',
        prevmusic: 'x',
        playmusichide: 'r',
        nextmusichide: 'y',
        prevmusichide: 'x',
        duration: '3:00',
        elapsed: '0:00',
        durationbar: '',
        songtitle: 'Song Title',
        songartist: 'Song Artist',
        songalbum: 'Song Album',
        songalbumArt: '',
        songtitlenohide: 'Song Title',
        songartistnohide: 'Song Artist',
        songalbumnohide: 'Song Album',
        songalbumArtnohide: '',
        searchicon: "z",
        searchtext: "Search",
        signal: "3",
        signalpercent: "40%",
        alarmstring: "Tue 10:30 AM",
        alarmstringsmall: "Tue 10:30",
        alarm24: "10:30 PM",
        alarm: "8:00",
        alarmhr: "8",
        alarmmin: "30",
        alarmday: "Tuesday",
        alarmsday: "Tue",
        wifi: "2",
        wifipercent: "2%",
        notifymail: "0",
        notifysms: "0",
        notifyphone: "0",
        notifywhats: "0",
        notifytelegram: "0",
        notifytelegramx: "0",
        notifyfacebook: "0",
        notifyfbmessenger: "0",
        notifydiscord: "0",
        notifyviber: "0",
        notifyinstagram: "0",
        notifygmail: "0",
        notifyoutlook: "0",
        notifyairmail: "0",
        notifyymail: "0",
        notifysnapchat: "0",
        notifyreddit: "0",
        notifygoogleplus: "0",
        notifylinkedin: "0",
        notifyslack: "0",
        notifyspark: "0",
        notifytwitter: "0",
        notifytweetbot: "0",
        notifyyoutube: "0",
        ramFree: "700",
        ramUsed: "100",
        ramAvailable: "800",
        ramFreeMB: "700mb",
        ramUsedMB: "100mb",
        ramAvailableMB: "800mb",

        stepsToday: "1000",
        stepsTodayDay: "Today",
        stepsTodaySDay: "Mon",
        stepsTodayDate: "25",
        stepsTodayDatePlus: "25th",

        stepsToday0: "1000",
        stepsTodayDay0: "Monday",
        stepsTodaySDay0: "Mon",
        stepsTodayDate0: "25",
        stepsTodayDatePlus0: "25th",

        stepsToday1: "1000",
        stepsTodayDay1: "Tuesday",
        stepsTodaySDay1: "Tue",
        stepsTodayDate1: "25",
        stepsTodayDatePlus1: "25th",

        stepsToday2: "1000",
        stepsTodayDay2: "Wednesday",
        stepsTodaySDay2: "Wed",
        stepsTodayDate2: "25",
        stepsTodayDatePlus2: "25th",

        stepsToday3: "1000",
        stepsTodayDay3: "Thursday",
        stepsTodaySDay3: "Thu",
        stepsTodayDate3: "25",
        stepsTodayDatePlus3: "25th",

        stepsToday4: "1000",
        stepsTodayDay4: "Friday",
        stepsTodaySDay4: "Fri",
        stepsTodayDate4: "25",
        stepsTodayDatePlus4: "25th",

        stepsToday5: "1000",
        stepsTodayDay5: "Saturday",
        stepsTodaySDay5: "Sat",
        stepsTodayDate5: "25",
        stepsTodayDatePlus5: "25th",

        stepsToday6: "1000",
        stepsTodayDay6: "Sunday",
        stepsTodaySDay6: "Sun",
        stepsTodayDate6: "25",
        stepsTodayDatePlus6: "25th",

        stepsToday7: "1000",
        stepsTodayDay7: "Sunday",
        stepsTodaySDay7: "Sun",
        stepsTodayDate7: "25",
        stepsTodayDatePlus7: "25th",

        events1daystring: "Mon: Doing Something",
        events2daystring: "Tue: Doing Something",
        events3daystring: "Wed: Doing Something",
        events4daystring: "Thur: Doing Something",

        events1daystring7: "Monday Doing Something",
        events2daystring7: "Tuesday Doing Something",
        events3daystring7: "Wednesday Doing Something",
        events4daystring7: "Thursday Doing Something",

        events1monthstring: "June 22: Doing Something",
        events2monthstring: "June 23: Doing Something",
        events3monthstring: "June 24: Doing Something",
        events4monthstring: "June 25: Doing Something",

        events1monthstring2: "June 22nd Doing Something",
        events2monthstring2: "June 23rd Doing Something",
        events3monthstring2: "June 24th Doing Something",
        events4monthstring2: "June 25th Doing Something",

        events1monthstring3: "June 22nd",
        events2monthstring3: "June 23rd",
        events3monthstring3: "June 24th",
        events4monthstring3: "June 25th",

        events1monthstring4: "June 22",
        events2monthstring4: "June 23",
        events3monthstring4: "June 24",
        events4monthstring4: "June 25",

        events1monthstring5: "June 22nd: Doing Something",
        events2monthstring5: "June 23rd: Doing Something",
        events3monthstring5: "June 24th: Doing Something",
        events4monthstring5: "June 25th: Doing Something",

        events1monthstring6: "June 22 Doing Something",
        events2monthstring6: "June 23 Doing Something",
        events3monthstring6: "June 24 Doing Something",
        events4monthstring6: "June 25 Doing Something",

        events1timestring: "05:30pm - 06:30pm",
        events2timestring: "06:30pm - 07:30pm",
        events3timestring: "07:30pm - 08:30pm",
        events4timestring: "09:30pm - 10:30pm",

        events1daystring8: "Monday 22nd June",
        events2daystring8: "Tuesday 23rd June",
        events3daystring8: "Wednesday 24th June",
        events4daystring8: "Thursday 25th June",

        events1date: '06-22-2020',
        events1title: 'Doing Something',
        events1day: 'Monday',
        events1sday: "Mon",
        events1month: 'June',
        events1dateval: '22',
        events1dateplus: "22nd",
        events1starttime: "5:00",
        events1endtime: "6:00",

        events1starttimepadded: "05:00",
        events1starttimepaddedpm: "05:00pm",
        events1starttimepm: "5:00pm",

        events1endtimepadded: "05:00",
        events1endtimepaddedpm: "05:00pm",
        events1endtimepm: "5:00pm",

        events2date: '06-23-2020',
        events2title: 'Doing Something',
        events2day: 'Tuesday',
        events2sday: "Tue",
        events2month: 'June',
        events2dateval: '23',
        events2dateplus: "23nd",
        events2starttime: "7:00",
        events2endtime: "8:00",

        events2starttimepadded: "07:00",
        events2starttimepaddedpm: "07:00pm",
        events2starttimepm: "7:00pm",

        events2endtimepadded: "08:00",
        events2endtimepaddedpm: "08:00pm",
        events2endtimepm: "8:00pm",

        events3date: '06-24-2020',
        events3title: 'Doing Something',
        events3day: 'Wednesday',
        events3sday: "Wed",
        events3month: 'June',
        events3dateval: '24',
        events3dateplus: "24nd",
        events3starttime: "9:00",
        events3endtime: "10:00",

        events3starttimepadded: "09:00",
        events3starttimepaddedpm: "09:00pm",
        events3starttimepm: "9:00pm",

        events3endtimepadded: "10:00",
        events3endtimepaddedpm: "10:00pm",
        events3endtimepm: "10:00pm",

        events4date: '06-25-2020',
        events4title: 'Doing Something',
        events4day: 'Thursday',
        events4sday: "Thu",
        events4month: 'June',
        events4dateval: '25',
        events4dateplus: "25nd",
        events4starttime: "11:00",
        events4endtime: "12:00",

        events4starttimepadded: "11:00",
        events4starttimepaddedpm: "11:00pm",
        events4starttimepm: "11:00pm",

        events4endtimepadded: "12:00",
        events4endtimepaddedpm: "12:00pm",
        events4endtimepm: "12:00pm",
    };
    Object.keys(systemEl).forEach(function (key) {
        var value = systemEl[key],
            div = checkDiv(key),
            knockout;
        if (div) {
            if(div.classList.contains('knockout')){
                knockout = document.getElementById(div.id + 'knockout');
                if(knockout){
                    knockout.innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
                }
            }else{
                div.innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
            }
        }
    });
};
systemdivs();




var miscEl = {
    hueLights: 'Lights',
    hueGroups: 'Groups',
    avatarImage: '',
    quote1: 'Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.',
    quote1Artist: 'Steve Jobs',
    quote1ReadMore: 'read more',
    textOne: 'Enter text',
    textTwo: 'Enter text',
    textThree: 'Enter text',
    textFour: 'Enter text',
    textFive: 'Enter text',
    textSix: 'Enter text',
    textSeven: 'Enter text',
    textEight: 'Enter text',
    textNine: 'Enter text',
    textTen: 'Enter text',
    textEleven: 'Enter text',
    textTwelve: 'Enter text',
    textThirteen: 'Enter text',
    textFourteen: 'Enter text',
    textFifteen: "Enter text",
    textSixteen: "Enter text",
    textSeventeen: "Enter text",
    textEighteen: "Enter text",
    textNineteen: "Enter text",
    textTwenty: "Enter text",
    textTwentyOne: "Enter text",
    boxOne: '',
    boxTwo: '',
    boxThree: '',
    boxFour: '',
    boxFive: '',
    boxCircleOne: '',
    boxCircleTwo: '',
    boxCircleThree: '',
    boxCircleFour: '',
    boxCircleFive: '',
    app1: 'Mail-com.apple.mobilemail',
    app2: 'SMS-com.apple.MobileSMS',
    app3: 'Phone-com.apple.mobilephone',
    app4: 'Twitter-com.atebits.Tweetie2',
    app5: 'Tweetbot3-com.tapbots.Tweetbot3',
    app6: 'Telegram-ph.telegra.Telegraph',
    app7: 'Instagram-com.burbn.instagram',
    app8: 'Pandora-com.pandora',
    app9: 'Spotify-com.spotify.client',
    app10: 'Facebook-com.facebook.Facebook',
    app11: 'Kik-com.kik.chat',
    app12: 'YouTube-com.google.ios.youtube',
    app13: 'WhatsApp-net.whatsapp.WhatsApp',
    app14: 'Safari-com.apple.mobilesafari',
    app15: 'Weather-com.apple.weather',
    app16: 'Clock-com.apple.mobiletimer',
    app17: 'Music-com.apple.Music',
    app18: 'Camera-com.apple.camera',
    app19: 'Reminders-com.apple.reminders',
    app20: 'Notes-com.apple.mobilenotes',
    app21: 'Maps-com.apple.Maps',
    app22: 'Calendar-com.apple.mobilecal',
    app23: 'Calculator-com.apple.calculator',
    app24: 'Cydia-com.saurik.Cydia',
    app25: 'YouTube-com.google.ios.youtube',
    app26: 'Settings-com.apple.Preferences',
    app27: 'AppStore-com.apple.AppStore',
    app28: 'Health-com.apple.Health',
    app29: 'TelegramHD-org.telegram.TelegramHD',
    app30: 'Discord-com.hammerandchisel.discord'
};

var miscDivs = function() {
    'use strict';
    Object.keys(miscEl).forEach(function (key) {
        var value = miscEl[key],
            div = checkDiv(key);
        if(div && div.classList.contains('knockout')){
            if(document.getElementById(div.id + 'knockout')){
                //document.getElementById(div.id + 'knockout').innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
            }
        }else{
            if(div && key.substring(0,3) === 'app'){
                div.innerHTML = value.split('-')[0];
                div.setAttribute('data-target',value.split('-')[1]);
            }else if(div && key.substring(0,6) === 'bundle'){
                //apps placed from the all list
            }else{
                if (div && div.innerHTML === '') {
                    div.innerHTML = getAffix(div, 'prefix') + value + getAffix(div, 'suffix');
                }
            }
        }
    });
    //alert(document.getElementById('screenElements').innerHTML);
}
miscDivs();

var symbolDivs = function() {
    'use strict';
    var symbols = {
        sy1: '⦿',
        sy2: '◉',
        sy3: '○',
        sy4: '◌',
        sy5: '◎',
        sy6: '●',
        sy7: '◔',
        sy8: '◯',
        sy9: '〇',
        sy10: '⊕',
        sy11: '⊖',
        sy12: '⊘',
        sy13: '❝',
        sy14: '❞',
        sy15: '♛',
        sy16: '☾',
        sy17: '﹏',
        sy18: '︴',
        sy19: '☰',
        sy20: '▸',
        sy21: '▾',
        sy22: '⎔',
        sy23: '',
        sy24: '⍝',
        sy25: '⌘',
        sy26: '⌥',
        sy27: '⍋',
        sy28: '✖',
        sy29: '❜',
        sy30: '❛',
        sy31: '▦',
        sy32: '❀',
        sy33: '⋆',
        sy35: '⊛',
        sy36: '◐',
        sy37: '◑',
        sy38: '﹄',
        sy39: '﹃',
        sy40: '〣',
        sy41: '㋡',
        sy42: 'ッ',
        sy43: '✘',
        sy44: '❤',
        sy45: '⤻',
        sy46: '⬏',
        sy47: '☽',
        sy48: '☾',
        sy49: '♪',
        sy50: '〈',
        sy51: '〉',
        sy52: '✹',
        sy53: '☂',

        ft1_mashup: 'A',
        ft2_mashup: 'B',
        ft3_mashup: 'C',
        ft4_mashup: 'D',
        ft5_mashup: 'E',
        ft6_mashup: 'F',
        ft7_mashup: 'G',
        ft8_mashup: 'H',
        ft9_mashup: 'I',
        ft10_mashup: 'J',
        ft11_mashup: 'K',
        ft12_mashup: 'L',
        ft13_mashup: 'M',
        ft14_mashup: 'N',
        ft15_mashup: 'O',
        ft16_mashup: 'P',
        ft17_mashup: 'Q',
        ft18_mashup: 'R',
        ft19_mashup: 'S',
        ft20_mashup: 'T',
        ft21_mashup: 'U',
        ft22_mashup: 'V',
        ft23_mashup: 'W',
        ft24_mashup: 'X',
        ft25_mashup: 'Y',
        ft26_mashup: 'Z',
        ft27_mashup: 'a',
        ft28_mashup: 'b',
        ft29_mashup: 'c',
        ft30_mashup: 'd',
        ft31_mashup: 'e',
        ft32_mashup: 'f',
        ft33_mashup: 'g',
        ft34_mashup: 'h',
        ft35_mashup: 'i',
        ft36_mashup: 'j',
        ft37_mashup: 'k',
        ft38_mashup: 'l',
        ft39_mashup: 'm',
        ft40_mashup: 'n',
        ft41_mashup: 'o',
        ft42_mashup: 'p',
        ft43_mashup: 'q',
        ft44_mashup: 'r',
        ft45_mashup: 's',
        ft46_mashup: 't',
        ft47_mashup: 'u',
        ft48_mashup: 'v',
        ft49_mashup: 'w',
        ft50_mashup: 'x',
        ft51_mashup: 'y',
        ft52_mashup: 'z',
        ft53_mashup: '0',
        ft54_mashup: '1',
        ft55_mashup: '2',
        ft56_mashup: '3',
        ft57_mashup: '4',
        ft58_mashup: '5',
        ft59_mashup: '6',
        ft60_mashup: '7',
        ft61_mashup: '8',
        ft62_mashup: '9',

        ft1_entypoF: 'A',
        ft2_entypoF: 'B',
        ft3_entypoF: 'C',
        ft4_entypoF: 'D',
        ft5_entypoF: 'E',
        ft6_entypoF: 'F',
        ft7_entypoF: 'G',
        ft8_entypoF: 'H',
        ft9_entypoF: 'I',
        ft10_entypoF: 'J',
        ft11_entypoF: 'K',
        ft12_entypoF: 'L',
        ft13_entypoF: 'M',
        ft14_entypoF: 'N',
        ft15_entypoF: 'O',
        ft16_entypoF: 'P',
        ft17_entypoF: 'Q',
        ft18_entypoF: 'R',
        ft19_entypoF: 'S',
        ft20_entypoF: 'T',
        ft21_entypoF: 'U',
        ft22_entypoF: 'V',
        ft23_entypoF: 'W',
        ft24_entypoF: 'X',
        ft25_entypoF: 'Y',
        ft26_entypoF: 'Z',
        ft27_entypoF: 'a',
        ft28_entypoF: 'b',
        ft29_entypoF: 'c',
        ft30_entypoF: 'd',
        ft31_entypoF: 'e',
        ft32_entypoF: 'f',
        ft33_entypoF: 'g',
        ft34_entypoF: 'h',
        ft35_entypoF: 'i',
        ft36_entypoF: 'j',
        ft37_entypoF: 'k',
        ft38_entypoF: 'l',
        ft39_entypoF: 'm',
        ft40_entypoF: 'n',
        ft41_entypoF: 'o',
        ft42_entypoF: 'p',
        ft43_entypoF: 'q',
        ft44_entypoF: 'r',
        ft45_entypoF: 's',
        ft46_entypoF: 't',
        ft47_entypoF: 'u',
        ft48_entypoF: 'v',
        ft49_entypoF: 'w',
        ft50_entypoF: 'x',
        ft51_entypoF: 'y',
        ft52_entypoF: 'z',
        ft53_entypoF: '0',
        ft54_entypoF: '1',
        ft55_entypoF: '2',
        ft56_entypoF: '3',
        ft57_entypoF: '4',
        ft58_entypoF: '5',
        ft59_entypoF: '6',
        ft60_entypoF: '7',
        ft61_entypoF: '8',
        ft62_entypoF: '9',


        ft1_mat2F: 'A',
        ft2_mat2F: 'B',
        ft3_mat2F: 'C',
        ft4_mat2F: 'D',
        ft5_mat2F: 'E',
        ft6_mat2F: 'F',
        ft7_mat2F: 'G',
        ft8_mat2F: 'H',
        ft9_mat2F: 'I',
        ft10_mat2F: 'J',
        ft11_mat2F: 'K',
        ft12_mat2F: 'L',
        ft13_mat2F: 'M',
        ft14_mat2F: 'N',
        ft15_mat2F: 'O',
        ft16_mat2F: 'P',
        ft17_mat2F: 'Q',
        ft18_mat2F: 'R',
        ft19_mat2F: 'S',
        ft20_mat2F: 'T',
        ft27_mat2F: 'a',
        ft28_mat2F: 'b',
        ft29_mat2F: 'c',
        ft30_mat2F: 'd',
        ft31_mat2F: 'e',
        ft32_mat2F: 'f',
        ft33_mat2F: 'g',
        ft34_mat2F: 'h',
        ft35_mat2F: 'i',
        ft36_mat2F: 'j',
        ft37_mat2F: 'k',
        ft38_mat2F: 'l',
        ft39_mat2F: 'm',
        ft40_mat2F: 'n',
        ft41_mat2F: 'o',
        ft42_mat2F: 'p',
        ft43_mat2F: 'q',
        ft44_mat2F: 'r',
        ft45_mat2F: 's',
        ft46_mat2F: 't',

        ft1_mat3F: 'A',
        ft2_mat3F: 'B',
        ft3_mat3F: 'C',
        ft4_mat3F: 'D',
        ft5_mat3F: 'E',
        ft6_mat3F: 'F',
        ft7_mat3F: 'G',
        ft8_mat3F: 'H',
        ft9_mat3F: 'I',
        ft10_mat3F: 'J',
        ft11_mat3F: 'K',
        ft12_mat3F: 'L',
        ft13_mat3F: 'M',
        ft14_mat3F: 'N',
        ft15_mat3F: 'O',
        ft16_mat3F: 'P',
        ft17_mat3F: 'Q',
        ft18_mat3F: 'R',
        ft19_mat3F: 'S',
        ft20_mat3F: 'T',
        ft21_mat3F: 'U',
        ft22_mat3F: 'V',
        ft23_mat3F: 'W',
        ft24_mat3F: 'X',
        ft25_mat3F: 'Y',
        ft26_mat3F: 'Z',
        ft27_mat3F: 'a',
        ft28_mat3F: 'b',
        ft29_mat3F: 'c',
        ft30_mat3F: 'd',
        ft31_mat3F: 'e',
        ft32_mat3F: 'f',
        ft33_mat3F: 'g',
        ft34_mat3F: 'h',
        ft35_mat3F: 'i',
        ft36_mat3F: 'j',
        ft37_mat3F: 'k',
        ft38_mat3F: 'l',
        ft39_mat3F: 'm',
        ft40_mat3F: 'n',
        ft41_mat3F: 'o',
        ft42_mat3F: 'p',
        ft43_mat3F: 'q',
        ft44_mat3F: 'r',
        ft45_mat3F: 's',
        ft46_mat3F: 't',
        ft47_mat3F: 'u',
        ft48_mat3F: 'v',
        ft49_mat3F: 'w',
        ft50_mat3F: 'x',
        ft51_mat3F: 'y',
        ft52_mat3F: 'z',
        ft53_mat3F: '0',
        ft54_mat3F: '1',
        ft55_mat3F: '2',
        ft56_mat3F: '3',
        ft57_mat3F: '4',
        ft58_mat3F: '5',
        ft59_mat3F: '6',
        ft60_mat3F: '7',
        ft61_mat3F: '8',
        ft62_mat3F: '9',

        ft1_mat4F: 'A',
        ft2_mat4F: 'B',
        ft3_mat4F: 'C',
        ft4_mat4F: 'D',
        ft5_mat4F: 'E',
        ft6_mat4F: 'F',
        ft7_mat4F: 'G',
        ft8_mat4F: 'H',
        ft9_mat4F: 'I',
        ft10_mat4F: 'J',
        ft11_mat4F: 'K',
        ft12_mat4F: 'L',
        ft13_mat4F: 'M',
        ft14_mat4F: 'N',
        ft15_mat4F: 'O',
        ft16_mat4F: 'P',
        ft17_mat4F: 'Q',
        ft18_mat4F: 'R',
        ft19_mat4F: 'S',
        ft20_mat4F: 'T',
        ft21_mat4F: 'U',
        ft22_mat4F: 'V',
        ft23_mat4F: 'W',
        ft24_mat4F: 'X',
        ft25_mat4F: 'Y',
        ft26_mat4F: 'Z',
        ft27_mat4F: 'a',
        ft28_mat4F: 'b',
        ft29_mat4F: 'c',
        ft30_mat4F: 'd',
        ft31_mat4F: 'e',
        ft32_mat4F: 'f',
        ft33_mat4F: 'g',
        ft34_mat4F: 'h',
        ft35_mat4F: 'i',
        ft36_mat4F: 'j',
        ft37_mat4F: 'k',
        ft38_mat4F: 'l',
        ft39_mat4F: 'm',
        ft40_mat4F: 'n',
        ft41_mat4F: 'o',
        ft42_mat4F: 'p',
        ft43_mat4F: 'q',
        ft44_mat4F: 'r',
        ft45_mat4F: 's',
        ft46_mat4F: 't',
        ft47_mat4F: 'u',
        ft48_mat4F: 'v',
        ft49_mat4F: 'w',
        ft50_mat4F: 'x',
        ft51_mat4F: 'y',
        ft52_mat4F: 'z',
        ft53_mat4F: '0',
        ft54_mat4F: '1',
        ft55_mat4F: '2',
        ft56_mat4F: '3',
        ft57_mat4F: '4',
        ft58_mat4F: '5',
        ft59_mat4F: '6',
        ft60_mat4F: '7',
        ft61_mat4F: '8',
        ft62_mat4F: '9',

        ft1_mat5F: 'A',
        ft2_mat5F: 'B',
        ft3_mat5F: 'C',
        ft4_mat5F: 'D',
        ft5_mat5F: 'E',
        ft6_mat5F: 'F',
        ft7_mat5F: 'G',
        ft8_mat5F: 'H',
        ft9_mat5F: 'I',
        ft10_mat5F: 'J',
        ft11_mat5F: 'K',
        ft12_mat5F: 'L',
        ft13_mat5F: 'M',
        ft14_mat5F: 'N',
        ft15_mat5F: 'O',
        ft16_mat5F: 'P',
        ft17_mat5F: 'Q',
        ft18_mat5F: 'R',
        ft19_mat5F: 'S',
        ft20_mat5F: 'T',
        ft21_mat5F: 'U',
        ft22_mat5F: 'V',
        ft23_mat5F: 'W',
        ft24_mat5F: 'X',
        ft25_mat5F: 'Y',
        ft26_mat5F: 'Z',
        ft27_mat5F: 'a',
        ft28_mat5F: 'b',
        ft29_mat5F: 'c',
        ft30_mat5F: 'd',
        ft31_mat5F: 'e',
        ft32_mat5F: 'f',
        ft33_mat5F: 'g',
        ft34_mat5F: 'h',
        ft35_mat5F: 'i',
        ft36_mat5F: 'j',
        ft37_mat5F: 'k',
        ft38_mat5F: 'l',
        ft39_mat5F: 'm',
        ft40_mat5F: 'n',
        ft41_mat5F: 'o',
        ft42_mat5F: 'p',
        ft43_mat5F: 'q',
        ft44_mat5F: 'r',
        ft45_mat5F: 's',
        ft46_mat5F: 't',
        ft47_mat5F: 'u',
        ft48_mat5F: 'v',
        ft49_mat5F: 'w',
        ft50_mat5F: 'x',
        ft51_mat5F: 'y',
        ft52_mat5F: 'z',
        ft53_mat5F: '0',
        ft54_mat5F: '1',
        ft55_mat5F: '2',
        ft56_mat5F: '3',
        ft57_mat5F: '4',
        ft58_mat5F: '5',
        ft59_mat5F: '6',
        ft60_mat5F: '7',
        ft61_mat5F: '8',
        ft62_mat5F: '9',

    };
    Object.keys(symbols).forEach(function (key) {
        var value = symbols[key],
            div = checkDiv(key);
        if(div){
            if(div.id.indexOf('f1') > -1){
                div.className = 'font1';
            }

            if(div.classList.contains('knockout')){
                if(document.getElementById(div.id + 'knockout')){
                    document.getElementById(div.id + 'knockout').innerHTML = value.split('-')[0];
                }
            }else{
                div.innerHTML = value.split('-')[0];
            }
            
            div.setAttribute('data-target',value.split('-')[1]);
        }
    });
}
symbolDivs();
