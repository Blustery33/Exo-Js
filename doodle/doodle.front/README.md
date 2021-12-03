# Application DOODLE

### Documentation 
L'application doit gérer la synchronisation des disponibilités en fonction d'un événement.

L'api doit permettre 
* l'ajout d'un événement et enregistrement d'un nouvel auteur de l'événement.
* l'ajout d'un événement pour un auteur existant.
* Définir les dates proposées et la liste des personnes sondées pour cet événement.
* Création d'un lien UUID pour que les personnes sondées puissent accéder au doodle.
* Enregistrer les réponses des personnes sondées.
* Récupérer les valeurs d'un événement (liste des personnes sondées + leurs réponses)


### Les flux JSON

#### Ajout d'un événement et enregistrement d'un nouvel auteur de l'événement.
Request
{
    "operation": "add_event",
    "personne": {"pseudo" : "bob", "email" : "bob@audiens.fr", "mdp": "secret"},
    "event" : { "libelle" : "mon premier evenement","reponses" : [{"value": "disponible", "color": "#00ff00"},{"value": "non disponible", "color": "#ff0000"}]}
}

Response
{
    "status" : "200",
    "message": "l'événement a été ajouté"
    "personne": {"id" : 27, "pseudo" : "bob", "email" : "bob@audiens.fr", "mdp": "secret"}
    "event" : { "id": 18, "libelle" : "mon premier evenement","reponses" : [{"id":675,"value": "disponible", "color": "#00ff00"},{"id": 676,"value": "non disponible", "color": "#ff0000"}]}
}

#### l'ajout d'un événement pour un auteur existant.
Request
{
    "operation": "add_event",
    "personne": {"id" : 27,"pseudo" : "bob", "email" : "bob@audiens.fr", "mdp": "secret"}
    "event" : { "libelle" : "mon deuxième evenement","reponses" : []}
}

Response
{
    "status" : "200",
    "message": "l'événement a été ajouté"
    "personne": {"id" : 27, "pseudo" : "bob", "email" : "bob@audiens.fr", "mdp": "secret"}
    "event" : { "id": 19, "libelle" : "mon deuxième evenement","reponses" : [{"id":677,"value": "disponible", "color": "#00ff00"},{"id": 678,"value": "non disponible", "color": "#ff0000"}]}
}

#### Définir les dates proposées et la liste des personnes sondées pour cet événement.
Request
{
    "operation": "update_event",
    "event" : { "id": 18, "libelle" : "mon deuxième evenement"},
    "dates" : [{"value": "2021-12-15"},{"value": "2021-12-16"}{"value": "2021-12-18"}],
    "personnes": [{"id": 16},{"pseudo" : "tom", "email" : "tom@audiens.fr"}]

}

Response
{
    "status" : "200",
    "message": "l'événement a été modifié"
    "event" : { "id": 18, "libelle" : "mon deuxième evenement"},
    "dates" : [{"id": 245,"value": "2021-12-15"},{"id": 246,"value": "2021-12-16"}{"id":247,"value": "2021-12-18"}],
    "personnes": [{"id": 16, "pseudo": "albert", "email": "albert@audiens.fr"},{"id": 28,"pseudo" : "tom", "email" : "tom@audiens.fr"}]
}
#### Enregistrer les réponses des personnes sondées.
Request
{
    "operation": "add_response",
    "event":{ "id": 18, "libelle" : "mon deuxième evenement"},
    "personne": {"id": 16},
    "reponses" : [{ "date": {"id": 245,"value": "2021-12-15"},"reponse": {"value": 675} },
                  { "date": {"id": 246,"value": "2021-12-16"},"reponse": {"value": 675} },
                  { "date": {"id": 247,"value": "2021-12-18"},"reponse": {"value": 676} }
                 ]
}

Response
{
    "status" : "200",
    "message": "les réponses ont eté enregistrées"
    "event":{ "id": 18, "libelle" : "mon deuxième evenement"},
    "personne": {"id": 16 ,"pseudo": "albert", "email": "albert@audiens.fr"},
    "reponses" : [{"date": {"id": 245,"value": "2021-12-15"},"reponse": {"id": 337, "value": 675} },
                  {"date": {"id": 246,"value": "2021-12-16"},"reponse": {"id": 338, "value": 675} },
                  {"date": {"id": 247,"value": "2021-12-18"},"reponse": {"id": 339, "value": 676} }
                 ]
}

#### Récupérer les valeurs d'un événement (liste des personnes sondées + leurs réponses)
Request
{
    "operation": "get_event",
    "event":{ "id": 18},
}

Response
{
    "status" : "200",
    "message": "opération réussie"
    "event":{ "id": 18, "libelle" : "mon deuxième evenement"},
    "auteur": {"id": 16,"pseudo": "albert", "email": "albert@audiens.fr",},
    "personnes" : [
        {"id": 16,  "pseudo": "albert", "email": "albert@audiens.fr",    
         "reponses" : [{ "date": {"id": 245,"value": "2021-12-15"},"reponse": {"value": 675} },
                       { "date": {"id": 246,"value": "2021-12-16"},"reponse": {"value": 675} },
                       { "date": {"id": 247,"value": "2021-12-18"},"reponse": {"value": 676} }
                      ]
        },
        {"id" : 27, "pseudo" : "bob", "email" : "bob@audiens.fr",
         "reponses" : [{ "date": {"id": 245,"value": "2021-12-15"},"reponse": {"value": 675} },
                       { "date": {"id": 246,"value": "2021-12-16"},"reponse": {"value": 676} },
                       { "date": {"id": 247,"value": "2021-12-18"},"reponse": {"value": 675} }
                      ]
        }
        ]
}


### Le service doodle.service
L'objectif de ce service est de simuler les échanges avec l'application 
en stockant les données dans localstorage

* des compteurs pour les identifiants (id personne, id d'événement, ...)
* une liste des personnes
* une liste des événements

Le service comporte plusieurs méthodes
* getPersonneById(id);
* getAllPersonne();
* getEventById(id);
* getAllEvent();
* putPersonne(requestBody);
* putEvent(requestBody);
* postPersonne(requestBody);
* postEvent(requestBody);

### distribution de liens pour accéder au doodle
A chaque nouvel événement on associe un UUID. 
On peut ensuite distribuer le lien http://monserveur/doodle/#123e4567-e89b-12d3-a456-426614174000
Lorsqu'on clique sur ce lien , on arrive sur la page d'affichage de l'événement.

