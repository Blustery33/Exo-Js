let liste = [];


function getHTTPObject()
{
 var xhr = false;
 if(window.XMLHttpRequest) // Firefox 
    xhr = new XMLHttpRequest(); 
 else if(window.ActiveXObject) // Internet Explorer 
    xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
 else 
  { // XMLHttpRequest non supporté par le navigateur 
    alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
    return; 
  }

 if (xhr)
 {
    /* on definit ce qui doit se passer quand la page repondra */
    xhr.onreadystatechange=function()
    {
       if (xhr.readyState == 4) /* 4 : etat "complete" */
       {
          if (xhr.status == 200) /* 200 : code HTTP pour OK */
          {
             /*
             Traitement de la reponse.
             Ici on affiche la reponse dans une boite de dialogue.
             */
             //alert(xhr.responseText);
             traitement(xhr);
          }
       }
    }
 }
 return xhr;
}

//----------------------------------------------------------------------
//
//   go()
//
//----------------------------------------------------------------------
function go()
{
 /* Creation de l'objet : */
 var xhr = getHTTPObject(); 
 /* Preparation d'une requete asynchrone de type GET : */
 xhr.open("GET", "https://randomuser.me/api/?results=5",true); 
 /* Effectue la requête : */
 xhr.send(null); 
}

 /*----------------------------------------------------------------------------*/
 /*                                                                            */
 /*    traitement                                                             */
 /*                                                                            */
 /*----------------------------------------------------------------------------*/
 function traitement(xhr)
 {
     let reponse = JSON.parse(xhr.responseText);
     liste = reponse.results;
     let lstbox = document.getElementById('liste_personnes');
     let cpt=0;
     liste.forEach(item => {
         let option = document.createElement('option');
         option.values=item.login.uuid;
         option.innerHTML=item.name.title+' '+item.name.first+' '+item.name.last;
         lstbox.appendChild(option);
    });
 }

/*----------------------------------------------------------------------------*/
/*                                                                            */
/*    liste_personnes_onchange                                                             */
/*                                                                            */
/*----------------------------------------------------------------------------*/

function liste_personnes_onchange() {
    let lstbox = document.getElementById('liste_personnes');
    //console.log('liste_personnes_onchange : selectedIndex='+lstbox.selectedIndex);
    // Récupère une référence sur l'item sélectionné
    let item = liste[lstbox.selectedIndex];
    console.log(JSON.stringify(item));
    // Affichage du détail de la personne
    let divdetail = document.getElementById('detail');
    divdetail.innerHTML='';
    
    let lastLabel = document.createElement('label');
    lastLabel.innerHTML = 'Nom :';
    divdetail.appendChild(lastLabel);

    let lastInput = document.createElement('input');
    lastInput.value = item.name.last;
    divdetail.appendChild(lastInput);

    let firstLabel = document.createElement('label');
    firstLabel.innerHTML = 'Prénom :';
    divdetail.appendChild(firstLabel);

    let firstInput = document.createElement('input');
    firstInput.value = item.name.first;
    divdetail.appendChild(firstInput);

    let photo = document.createElement('img');
    photo.src = item.picture.large;
    divdetail.appendChild(photo);

}