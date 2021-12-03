var mois = ["Janvier","F&eacute;vrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","D&eacute;cembre"];

function analyse(divname)
{
  var strdate = document.getElementById('date').value;
  // Le séparateur est soit un slash, soit un tiret , soit un espace 
  var tab = strdate.split(/\/|-| /);
  var html = tab[0] + ' ' + mois[tab[1]-1] + ' ' + tab[2];
  document.getElementById(divname).innerHTML = html;  
}