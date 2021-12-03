



function Personne (pseudo,email)
{
    this.pseudo = pseudo;
    this.email = email;
    this.tostring = function (){
        return this.pseudo+ ' - ' + this.email;
    };

}

Personne.people = [];

Personne.ajoute = function (){
    p = new Personne(document.getElementById("pseudo").value, document.getElementById("email").value);
    Personne.people.push(p);
    console.log(Personne.people);
};
function affiche(elementId){
    let element = document.getElementById(elementId);
    let html = '<ul>';
    Personne.people.forEach(function (item){
        console.log(item.tostring());
        html += '<li>' +item.tostring() + '</li>'
    });
    html += '</ul>';
    element.innerHTML = html;
}
