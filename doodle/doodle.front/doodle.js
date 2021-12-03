//import * as calendrier from "./event/calendrier.js";
import { service } from "./doodle-service.js";
import { calendrier } from "./event/calendrier.js";
import { eventModule } from "./event/eventModule.js";


let doodle = {
   "eventList": []
};


doodle.createEvent = function () {
   console.log("createEvent");
   fetch('./event/event.html')
      .then(function (response) {
         // L'objet response est un objet de l'api fetch
         // response.text() fournit le contenu de la réponse au format text.
         return response.text();
      })
      .then(function (data) {
         // console.log(data);
         // Ici on charge le fragment dans la div contenu
         let divContenu = document.getElementById('contenu');
         divContenu.innerHTML = data;
         // On paramètre le gestionnaire d'événement onclick
         let okButton = document.getElementById('okButton');
         // Les deux méthodes fonctionnent
         okButton.addEventListener("click", okButton_click_eventListener);
         //okButton.onclick = okButton_click_eventListener;
      });
};

//-----------------------------------------------------------------------------
//                                                                           
//    okButton_click_eventListener                                                
//                                                                            
//----------------------------------------------------------------------------
/*
{
    "operation": "add_event",
    "personne": {"pseudo" : "bob", "email" : "bob@audiens.fr", "mdp": "secret"},
    "event" : { "libelle" : "mon premier evenement","reponses" : [{"value": "disponible", "color": "#00ff00"},{"value": "non disponible", "color": "#ff0000"}]}
}
*/
function okButton_click_eventListener() {

   // Vérification du formulaire
   const regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
   // Présence des valeurs
   let divMessage = document.getElementById('message');
   if (document.getElementById('pseudo').value.trim() == "") {
      divMessage.innerHTML = 'le pseudo est obligatoire..!';
      document.getElementById('pseudo').focus();
      return;
   }

   let mailRegister = document.getElementById('email');
   if (regexMail.test(mailRegister.value) === false) {
      //mailRegister.classList.toggle('negative');
      divMessage.innerHTML = "Le champ email est requis";
      //e.preventDefault();
      document.getElementById('email').focus();
      return;
   }

   const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
   if (regexPassword.test(document.getElementById('mdp').value.trim()) === false) {
      divMessage.innerHTML = 'le mot de passe est obligatoire..!';
      document.getElementById('mdp').focus();
      return;
   }

   if (document.getElementById('libelle').value.trim() == "") {
      divMessage.innerHTML = 'le libellé est obligatoire..!';
      document.getElementById('libelle').focus();
      return;
   }

   divMessage.innerHTML = '';

   // Fabrication du corps de la requete 
   let requestBody = {};
   requestBody.operation = 'add_event';
   requestBody.personne = {};
   requestBody.personne.pseudo = document.getElementById('pseudo').value;
   requestBody.personne.email = document.getElementById('email').value;
   requestBody.personne.mdp = document.getElementById('mdp').value;

   requestBody.event = {};
   requestBody.event.libelle = document.getElementById('libelle').value;
   requestBody.event.reponses = [];

   // {"pseudo": "bill", "datesvalidees": [{"value":"2021-12-15"},{"value":"2021-12-16"}]}

   // {"pseudo": "bill", "datesvalidees": ["2021-12-15",2021-12-16"]}

   // requestBody.event.reponses[0] = {};
   // requestBody.event.reponses[0].value = document.getElementById('valeur1').value;
   // requestBody.event.reponses[0].color = document.getElementById('couleur1').value;

   // requestBody.event.reponses[1] = {};
   // requestBody.event.reponses[1].value = document.getElementById('valeur2').value;
   // requestBody.event.reponses[1].color = document.getElementById('couleur2').value;

   console.log('okButton_click_eventListener');
   console.log(JSON.stringify(requestBody));

   service.postEvent(requestBody);

   console.log('okButton_click_eventListener: apres postEvent');
   // Ajoute l'objet dans la liste des évènements
   doodle.eventList.push(requestBody);
   // Enregistre la liste 
   let storage = window.localStorage;
   storage.setItem('eventList',JSON.stringify(doodle.eventList));

   // On affiche le statut de l'opération de sauvegarde
   divMessage.innerHTML='L\'événement a été ajouté...';

   setTimeout(() => {
      fetch('./event/eventDates.html')
      .then(function (response) {
         // L'objet response est un objet de l'api fetch
         // response.text() fournit le contenu de la réponse au format text.
         return response.text();
      })
      .then(function (data) {
         // console.log(data);
         // Ici on charge le fragment dans la div contenu
         let divContenu = document.getElementById('contenu');
         divContenu.innerHTML = data;
         // Renseigne le libellé de l'événement
         let divLibelle = document.getElementById('libelle');
         divLibelle.innerHTML=requestBody.event.libelle;
         // Initialise le calendrier
         calendrier.init('bodyCalendrier');
         calendrier.fillup();
      });
   }, 300);

}


doodle.init = function () {
let btnCreateEvent = document.getElementById('btnCreateEvent');
btnCreateEvent.addEventListener('click',doodle.createEvent);

// Chargement des données du localstorage
let storage = window.localStorage;
let data = JSON.parse(storage.getItem('data'));
if(data){
   service.data = data;
}

// Récupère l'url de la page
let href = window.location.href;
console.log("window.location.href="+href);
// On analyse l'url, si elle contient un UUID on affiche le fragment eventShow.html
// On découpe l'url selon de caractère #
let tab=href.split('#');
let uuid=tab[1];
if(uuid){
   // Chargement de la page eventShow
   console.log("createEvent");
   fetch('./event/eventShow.html')
      .then(function (response) {
         // L'objet response est un objet de l'api fetch
         // response.text() fournit le contenu de la réponse au format text.
         return response.text();
      })
      .then(function (data) {
         // console.log(data);
         // Ici on charge le fragment dans la div contenu
         let divContenu = document.getElementById('contenu');
         divContenu.innerHTML = data;

         eventModule.showEvent(uuid);
         
      });
}
}


doodle.init();