function initTable(divname)
{
   var table=document.getElementById(divname);
   var colnumber = table.getAttribute("colnumber");
   var rownumber = table.getAttribute("rownumber");
   var pasCouleur = Math.round(16581375 / (colnumber*rownumber));
   var couleur = 0;
   for(r=1;r<=rownumber;r++)
   {
	   var row = table.insertRow(r-1);
	   for(c=1;c<=colnumber;c++)
	   {
		   var cell = row.insertCell(c-1);
		   cell.innerHTML = ''+r+'-'+c;
		   
		   hexCouleur = couleur.toString(16);
		   cell.style.backgroundColor='#'+hexCouleur;
		   //cell.style.color="yellow";
		   cell.id=''+r+'-'+c;
		   cell.onclick=clickCell;
		   couleur += pasCouleur;
	   }
	   
   }
}

function clickCell()
{
  console.log("clickCell "+this.id);
  var element = document.getElementById("couleur").style.backgroundColor = this.style.backgroundColor
}