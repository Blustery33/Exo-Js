import { service } from "../doodle-service.js";

let calendrier = {
    current_date: null,
    selectedDates: []
};

calendrier.init = function (tbodyName) {
    calendrier.tbodyName = tbodyName;
    let tbody = document.getElementById(tbodyName);
    // Boucle pour vider le tbody avant le remplissage
    while (tbody.lastChild) {
        tbody.removeChild(tbody.lastChild);
    }

    for (let lig = 1; lig <= 6; lig++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let col = 1; col <= 7; col++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            let span = document.createElement('span');
            td.appendChild(span);
            span.classList.add('day');
            span.id = '' + lig + '-' + col;
            //span.innerHTML=span.id;
            if (col == 7)
                span.classList.add('dimanche');
        }
    }
    // Ajout du bouton enregistre
    /*
     <div class="row">
        <div class="col"></div>
        <div class="col-10"><button id="enregistre">Enregistre</button></div>
        <div class="col"></div>
    </div> 
    */
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    let td = document.createElement('td');
    tr.appendChild(td);
    td.colSpan=5;
    let button = document.createElement('button');
    button.id="enregistre";
    button.innerHTML="Enregistre";
    td.appendChild(button);

    // Mise en place des gestionnaires d'événements
    let previousMonth = document.getElementById('previousMonth');
    previousMonth.onclick = function () {
        let date = calendrier.current_date;
        let m = date.getMonth();
        m--;
        date.setMonth(m);
        console.log("previousMonth:" + date);
        calendrier.fillup(date);
    };
    let nextMonth = document.getElementById('nextMonth');
    nextMonth.onclick = function () {
        let date = calendrier.current_date;
        let m = date.getMonth();
        m++;
        date.setMonth(m);
        console.log("nextMonth:" + date);
        calendrier.fillup(date);
    }

    let buttonEnregistre= document.getElementById('enregistre');
    buttonEnregistre.onclick = function () {
        console.log("enregistre");
        let divLibelle = document.getElementById('libelle');

        let dates = [];
        calendrier.selectedDates.forEach(item  => {
            dates.push({"value": item.date});
        });

        let requestBody = 
        {
            "operation": "update_event",
            "event" : { "id": service.current_event.id, "libelle" : divLibelle.value},
            "dates" : dates,
            "personnes": [{"id": 16},{"pseudo" : "tom", "email" : "tom@audiens.fr"}]
        };
        console.log(JSON.stringify(requestBody));
        service.putEvent(requestBody);
    }
}

calendrier.fillup = function (dateIn) {
    // Si la date n'est pas présente, on prend la date du jour
    let date;
    if (!dateIn) {
        date = new Date();
    } else {
        date = dateIn;
    }
    // On remet le jour à 1 pour commencer au début du mois.
    date.setDate(1);
    var jour = date.getDate();
    var mois = date.getMonth();
    var annee = date.getFullYear();

    // On conserve la date courante
    calendrier.current_date = date;
    console.log("fillup: current_date=" + calendrier.current_date);

    let months = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
    let jours_dans_mois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (annee % 4 == 0 && annee != 1900) {
        jours_dans_mois[1] = 29;
    }

    // Efface le contenu de la grille
    calendrier.clear(calendrier.tbodyName);

    // Le mois courant
    let currentMonth = document.getElementById('currentMonth');
    currentMonth.innerHTML = months[mois] + ' ' + annee;
    // Nombre de jours du mois
    let nombreDeJours = jours_dans_mois[mois];
    // Première cellule à remplir sur la ligne 1
    //let first = date.getDay();
    // Positionne la date pour remplir la première cellule
    //date.setDate(date.getDate() - first +1);
    let lig = 1; // Ligne et colonne de la grille
    let col = date.getDay();
    if (col == 0)
        col = 7;
    let cptJours = 1;
    for (let j = 1; j <= nombreDeJours; j++) {
        let jj = cptJours++;
        let id = '' + lig + '-' + col;
        //console.log("id="+id);
        let span = document.getElementById(id);
        span.innerHTML = jj;
        span.onclick = function () {
            if (this.innerHTML != "") {
                this.classList.toggle('selected');
                // Fabrique une date au format YYYY-MM-DD
                let m = 1 + calendrier.current_date.getMonth();
                let strMonth = m > 9 ? '' + m : '0' + m;
                let strDate = '' + calendrier.current_date.getFullYear() + '-' + strMonth + '-' + this.innerHTML;
                //console.log('strDate=' + strDate);
                if (this.classList.contains('selected')) {

                    // On ajoute la date
                    //console.log('On ajoute la date');
                    let option = document.createElement('option');
                    option.innerHTML = strDate;
                    let objDateSelected = { "date": strDate, "span": this, "option": option };
                    calendrier.selectedDates.push(objDateSelected);
                    let selectSelectedDates = document.getElementById('selectedDates');

                    selectSelectedDates.appendChild(option);

                } else {
                    //console.log('On supprime la date');
                    // On supprime la date
                    currentMonth = 1 + calendrier.current_date.getMonth();
                    let currentYear = calendrier.current_date.getFullYear();
                    let selectSelectedDates = document.getElementById('selectedDates');
                    calendrier.selectedDates.forEach(function(item,index) {
                        console.log('date sélectionée:' + item.date);
                        console.log('strDate='+strDate+',item.date=' + item.date+',index='+index);
                        if (strDate == item.date) {
                            calendrier.selectedDates.splice(index,1);
                            selectSelectedDates.remove(item.option);
                        }
                    });

                }

            }
        }
        //date.setDate(date.getDate() +1);
        col++;
        if (col == 8) {
            col = 1;
            lig++;
        }
    }
    // Affiche les dates sélectionnées =remettre les pastilles vertes sur les jours
    // On boucle sur les dates sélectionnées
    currentMonth = 1 + calendrier.current_date.getMonth();
    let currentYear = calendrier.current_date.getFullYear();
    calendrier.selectedDates.forEach(item => {
        console.log('date sélectionée:' + item.date);
        // Si une date fait partie du mois courant
        // ... on change le style du span 
        let tab = item.date.split('-');
        if (tab[0] == currentYear && tab[1] == currentMonth) {
            console.log('  ----:' + item.date);
            item.span.classList.add('selected');
        }
    });

    //    console.log('mois:'+mois);
    //    console.log('getDay:'+date.getDay());
}

//export { calendrier };

calendrier.clear = function (tbodyName) {

    // Efface la classe selected
    let collection = document.getElementsByClassName('selected');
    //console.log(collection);
    while (collection.length > 0) {
        //console.log(collection[0]);
        collection[0].classList.remove('selected');
    }

    let tbody = document.getElementById(tbodyName);
    // Efface le contenu des span
    for (let lig = 1; lig <= 6; lig++) {
        for (let col = 1; col <= 7; col++) {
            let id = '' + lig + '-' + col;
            document.getElementById(id).innerHTML = '';
        }
    }
}

export { calendrier };