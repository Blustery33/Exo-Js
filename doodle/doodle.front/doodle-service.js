
let service = {};

service.data = {
        nextid : {"personne":1 , "evenement": 1},
        personnes : [],
        evenements : []
    };

   service.current_event={};

   service.createUUID= function () {
    return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 },
service.getPersonneById = function (id) {};
service.getAllPersonne = function (id) {};
service.getEventById = function (id) {};
service.getAllEvent = function (id) {};
service.putPersonne = function (requestBody) {};
// -------------------------------------------------------------------
//
//  Modification d'un événement
//
// -------------------------------------------------------------------
/*
{"operation":"update_event",
 "event":{"id":18},
 "dates":[{"value":"2021-12-15"},
          {"value":"2021-12-17"},{"value":"2021-12-30"},{"value":"2022-01-19"},{"value":"2022-01-21"}],
 "personnes":[{"id":16},{"pseudo":"tom","email":"tom@audiens.fr"}]}
*/
service.putEvent = function (requestBody) {
    service.data.evenements[requestBody.event.id].dates = requestBody.dates;
   // service.current_event.dates = requestBody.dates;
   let storage = window.localStorage;
   storage.setItem('data',JSON.stringify(service.data));
};

service.postPersonne = function (requestBody) {};
// -------------------------------------------------------------------
//
//  Ajout d'un événement
//
// -------------------------------------------------------------------
/*
{"operation":"add_event",
 "personne":{"pseudo":"bob","email":"bob@audiens.fr","mdp":"Secret1234"},
 "event":{"libelle":"Titre 1",
 "reponses":[{"value":"Disponible","color":"#00ff00"},{"value":"Non disponible","color":"#ff0000"}]}}
*/
// Ajout d'un événement
service.postEvent = function (requestBody) {
    // On recherche l'auteur de l'événement dans la liste.
    //console.log('requestBody)'+JSON.stringify(requestBody));
    if(service.data){
        service.data.personnes.forEach(item=>{
            if(item && item.email==requestBody.personne.email) {
                // On met l'id de l'auteur dans l'evenement
                requestBody.event.auteur={ "auteur": item.id};
            }
        });
    }

    if(requestBody.event.auteur==null){
        // On recherche le prochain id de personne
        let idPersonne = service.data.nextid['personne'];
        service.data.nextid['personne']++;
        requestBody.personne.id=idPersonne;
        service.data.personnes[idPersonne]=requestBody.personne;
    }
    // On récupère le prochain id disponible
    let idEvent = service.data.nextid['evenement'];
    service.data.nextid['evenement']++;
    requestBody.event.id=idEvent;
    // On ajoute l'uuid 
    requestBody.event.uuid=service.createUUID();
    // On stocke l'objet event dans le tableau
    service.data.evenements[idEvent]=requestBody.event;

    let storage = window.localStorage;
    storage.setItem('data',JSON.stringify(service.data));

    // On conserve l'événement courant pour un usage ultérieur.
    service.current_event=requestBody.event;
    console.log("postEvent: fin");
    return idEvent;
};

export { service };