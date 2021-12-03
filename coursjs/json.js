

let personne = JSON.parse({ "nom": "dupond", "prenom": "jean"});

console.log("nom="+personne.nom); 

console.log(JSON.stringify(personne)); //-= { "nom": "dupond", "prenom": "jean"}



function _estMajeur()
{
  if (this.age >= 18)
   return true;
  else
   return false;
}


let f1 = _estMajeur;    // une affectation de la référence de la méthode _estMajeur
let v2 = _estMajeur();  // Appel de la fonction, v2 prend la valeur retounée par _estMajeur


let v3 = f1();  // Appel à la fonction f1 qui est en fait la fonction _estMajeur, v3 contiendra la même chose que v2
