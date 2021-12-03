// Exemple d'objet Personne
// 
// Ecrire un objet avec les propriétés suivantes : pseudo, email
//               et avec les méthodes            : enregistre() dans un premier temps on stocke dans un tableau (avec localStorage )
//                                                 affiche()

function Personne (pseudo,email)
{ 
 this.pseudo = pseudo;
 this.email = email;
 // Méthode d'instance
 this.tostring = function() {
    return this.pseudo+'-'+this.email;
 }; 
 this.delete = function () {
    let pos = Personne.liste.indexOf(this);
    console.log("delete pos="+pos);
    // Supprimer l'élément
    Personne.liste.splice(pos,1);
    Personne.affiche('view');
 };
}
// Variable de classe: Le tableau des personnes
Personne.liste = [];

// Méthode de classe
Personne.enregistre = function() {
 console.log('Personne.enregistre');
 p = new Personne(document.getElementById('pseudo').value,
                  document.getElementById('email').value);
 Personne.liste.push(p);
 // On stocke la liste des personnes sur le disque local.
 let storage = window.localStorage;
 storage.setItem('liste',JSON.stringify(Personne.liste));
};

// Méthode de classe
Personne.load = function() {
    console.log('Personne.load');
    let storage = window.localStorage;
    let tab = JSON.parse(storage.getItem('liste'));
    Personne.liste = [];
    tab.forEach(function(item){
       p = new Personne(item.pseudo,item.email);
       Personne.liste.push(p);
    });
}

// Méthode de classe
Personne.affiche = function(elementId) {
    // Récupère une référence sur la DIV
    let element = document.getElementById(elementId);
    let ul = document.createElement("ul");
    Personne.liste.forEach(function(item){
        console.log(item.tostring());
        let li = document.createElement("li");
        li.innerHTML = item.tostring();
        // On renseigne le gestionnaire d'événement onclick 
        li.onclick = function() {
            this.item.delete();
        };
        li.item = item;
        ul.appendChild(li);
    });
    //html += '</ul>';
    element.innerHTML = "";
    element.appendChild(ul);
}

