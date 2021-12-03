var tab = new Array();
var cpt = 0;
 
 function ajoute()
 {
   tab[cpt++] = document.getElementById('texte').value;
 }
 
 function affiche(divname)
 {
  var html = '';
  // for (var i=0; i<tab.length;i++)
  //   {
  //     html += tab[i]+'<br>';
  //   }
  tab.forEach(function (item) {
    html += item+'<br>';
 });
  document.getElementById(divname).innerHTML = html;  
  
 }