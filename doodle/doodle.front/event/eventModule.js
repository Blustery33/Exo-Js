
import { service } from "../doodle-service.js";

let eventModule = {
    checkboxTab: []
};

eventModule.showEvent = function (uuid) {
    // Rechercher l'événement et ....
    service.data.evenements.forEach(item => {
        // console.log('item='+item);
        if (item && item.uuid == uuid) {
            // Conserve l'item dans service
            service.current_event = item;
        }
    });
    // ...et l'afficher
    document.getElementById('libelle').innerHTML = service.current_event.libelle;
    // Afficher les dates : thead
    let divEventcaption = document.getElementById('headerevent');
    let months = new Array('Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août', 'Sep', 'Oct', 'Nov', 'Déc');

    service.current_event.dates.forEach(item => {
        let th = document.createElement('th');
        //div.classList.add('col');
        let tab = item.value.split('-');
        th.title = tab[2] + ' ' + months[parseInt(tab[1]) - 1] + ' ' + tab[0];
        th.innerHTML = tab[2] + ' ' + months[parseInt(tab[1]) - 1];
        divEventcaption.appendChild(th);

    });
    // On ajoute une balise th vide
    divEventcaption.appendChild(document.createElement('th'));

    // Afficher le formulaire de saisie : tbody
    let tbody = document.getElementById('bodyEvent');
    // Effacer le contenu du tbody
    while(tbody.lastChild){
        tbody.removeChild(tbody.lastChild);
    }
       
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    let td = document.createElement('td');
    tr.appendChild(td);
    let inputText = document.createElement('input');
    inputText.id = "pseudo";
    td.appendChild(inputText);

    service.current_event.dates.forEach(item => {
        td = document.createElement('td');
        tr.appendChild(td);
        let ckbx = document.createElement('input');
        ckbx.type = 'checkbox';
        ckbx.value = item.value;
        ckbx.id = 'ckbx-' + item.value;
        td.appendChild(ckbx);
        eventModule.checkboxTab.push(ckbx);

    });
    // Le bouton de validation
    td = document.createElement('td');
    tr.appendChild(td);
    let button = document.createElement('button');
    let img = document.createElement('img');
    button.appendChild(img);
    img.src = "./images/ok.png";
    img.style.width = "16px";
    img.style.height = "16px";
    td.appendChild(button);
    // Le gestionnaire d'événement click
    button.addEventListener('click', () => {
        let reponse = { "pseudo": document.getElementById('pseudo').value, "datesvalidees": [] };
        eventModule.checkboxTab.forEach(item => {
            // {"pseudo": "bill", "datesvalidees": [{"value":"2021-12-15"},{"value":"2021-12-16"}]}
            if (item.checked) {
                reponse.datesvalidees.push({ "value": item.value });
            }
        });
        // ajouter la réponse aux réponses de l'événement
        service.current_event.reponses.push(reponse);
        // Sauvegarde des valeurs
        let storage = window.localStorage;
        storage.setItem('data',JSON.stringify(service.data));
        // Appel récursif à la fonction 
        eventModule.showEvent(uuid);
    });

    // Affichage des réponses
    service.current_event.reponses.forEach(item => {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let td = document.createElement('td');
        tr.appendChild(td);
        let divPseudo = document.createElement('div');
        divPseudo.innerHTML = item.pseudo
        td.appendChild(divPseudo);

        // Pour toute les dates de l'événement....
        service.current_event.dates.forEach(itemDate => {
            td = document.createElement('td');
            tr.appendChild(td);
            let div = document.createElement('div');
            td.appendChild(div);
            // Recherche la date dans la liste des dates validées
            item.datesvalidees.forEach(itemDateValidee=>{
                if(itemDateValidee.value==itemDate.value){
                    let img = document.createElement('img');
                    div.appendChild(img);
                    img.src = "./images/ok.png";
                    img.style.width = "32px";
                    img.style.height = "32px";
                }
            });
        });
    });

};


export { eventModule };