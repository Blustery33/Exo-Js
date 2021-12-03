function add_onclick()
{
	// récupère les valeurs saisies dans les champs text
	var operande1 = document.getElementById("operande1").value;
	var operande2 = document.getElementById("operande2").value;
	// on concatène les valeurs avec l'opérateur
	var expression = operande1 + '+' + operande2;
	var resultat = eval(expression);
	// affiche le résultat dans la balise div 
	var element = document.getElementById("xyz");
	element.innerHTML = resultat;
}
