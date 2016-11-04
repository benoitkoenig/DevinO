// Views

function displayPage(name) {
	$(".page").css("display", "none");
	$("#" + name).css("display", "block");
}

function displayTime(temps) {
	if (temps == "Start") {
		$("#temps").html("Lancer le sablier");
	} else {
		var chaine = Math.floor(temps/60) + ":";
		if (temps%60 < 10) {chaine += "0"; }
		chaine += (temps % 60 + "");
		$("#temps").html(chaine);
	}
}

function displayFooter(show) {
	if (show) {
		$("#footerHeight")
			.animate({"height": "0%"}, 200);
	} else {
		$("#footerHeight")
			.animate({"height": "100%"}, 200);
	}
}

function displayAnimateSliders(devino, indice) {
	$(".slider_champ").animate(
		{"margin-left": "110%"},
		100,
		"linear",
		function() {
			$("#devino .slider_contenu").html("<div>"+devino+"</div>");
			$("#indice .slider_contenu").html("<div>"+indice+"</div>");
			$(".slider_champ").css("margin-left", "-90%").animate({"margin-left": "10%"}, 200, "linear");
		}
	);
}

function displayInit() {
	$("#header").css("display", "block");
	displayPage("accueil");
}


// Models

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var devinos = [];
var indices = [];
var interval = null;
var temps = 0;

function relance() {
	if (interval != null) {
		clearInterval(interval);
		interval = null;
	}
	temps = 0;
	if (devinos.length == 0) {
		devinos = shuffle(["Léopard", "Éléphant", "Ours", "Lézard", "Dinosaure", "Aigle", "Chat", "Chien", "Poisson", "Singe", "Loup", "Dragon", "Tigre", "Scarabée", "Renard", "Dauphin", "Kangourou", "Coccinelle", "Sapin", "Feuille", "Fleur", "Buisson", "Pommier", "Fruit", "Palmier", "Graine", "Racine", "Bois", "Reine", "Soldat", "Docteur", "Sportif", "Informaticien", "Vendeur", "Étudiant", "Enfant", "Père", "Retraité", "Cloche", "Bouteille", "Verre", "Plat", "Bocal", "Table", "Lampe", "Siège", "Téléphone", "Lit", "Rome", "Paris", "Londres", "Tokyo", "Lille", "Berlin", "New-York", "San Francisco", "Pékin", "Athènes", "Hawaii", "Brésil", "Jamaïque", "Californie", "Italie", "Canada", "Islande", "Grèce", "Madagascar", "Réunion", "Bordeaux", "Champagne", "Troyes", "Aoste", "Evian", "Munster", "Cadillac", "Inde", "Grenade", "Phare", "Tour", "Port", "Château", "Mine", "Restaurant", "Chalet", "Barrage", "Pont", "Hôtel", "Balle", "Gant", "Crosse", "Panier", "Patin", "Manette", "Raquette", "Batte", "Corde", "But", "Scène", "Guitare", "Jonglage", "Dessin", "Musique", "Danse", "Flûte", "Batterie", "Clavier", "Poésie", "Miel", "Crêpes", "Pizza", "Gâteau", "Burger", "Riz", "Pâtes", "Sushi", "Bonbon", "Pain", "Bateau", "Ski", "Avion", "Randonnée", "Vol", "Croisière", "Safari", "Plongée", "Excursion", "Escalade", "Guillaume", "Claire", "Pierre", "Thomas", "Anne", "Olivier", "Mehdi", "Max", "Loïc", "Paul", "Thé", "Café", "Jus", "Soda", "Vin", "Cola", "Bière", "Cru", "Sirop", "Lait", "Nuage", "Neige", "Iceberg", "Fumée", "Glace", "Vague", "Pluie", "Brume", "Vent", "Tornade", "Noël", "Vacances", "Voyage", "Cadeaux", "Fête", "Week-end", "Jeux", "Repas", "Surprise", "Fève", "Pirate", "Chevalier", "Astronaute", "Fée", "Princesse", "Magicien", "Pompier", "Détective", "Inventeur", "Saint", "Zéro", "Un", "Deux", "Sept", "Dix", "Vingt", "Cent", "Mille", "Demi", "Quart", "Nez", "Main", "Coeur", "Foie", "Tête", "Dos", "Bras", "Doigt", "Oeil", "Joue"]);
	}
	if (indices.length == 0) {
		indices = shuffle(["Bleu", "Nord", "L", "Gaulois", "Animal", "Feu", "Outil", "Espace", "Moi", "Rouge", "Sud", "M", "Étoile", "Végétal", "Froid", "Structure", "Temps", "Toi", "Vert", "Ville", "O", "Sorcier", "Fumée", "Chaleur", "Bâtiment", "Lui", "Jaune", "Région", "T", "Inconnu", "Pierre", "Chaud", "Livre", "Elle", "Violet", "Pays", "X", "Indice", "Bois", "Température", "Film", "Nous", "Rose", "Europe", "Lettre", "Métal", "Automne", "BD", "Vous", "Brun", "Est", "Verre", "Hiver", "Manga", "Eux", "Orange", "Ouest", "Eau", "Printemps", "Musique", "Blanc", "Continent", "Été", "Histoire", "Noir", "Île", "Année", "Magie", "Turquoise", "Passé", "Saison", "Métier", "Couleur", "Futur", "Mois", "Fiction", "Désert", "Semaine", "Montagne", "Jour", "Océan", "Nuit", "Mer", "Glace", "Pré", "Capitale", "Endroit", "Soleil", "Lune", "Planète", "Terre", "Équateur", "Maitre", "A"]);
	}
	displayTime("Start");
	displayFooter(false);
	displayAnimateSliders(devinos.splice(0, 1), indices.splice(0, 1));
}

function toggleTime() {
	displayFooter(true);
	if (interval == null) {
		if (temps == 0) {
			temps = 120;
		}
		interval = setInterval(function() {
			temps -= 1;
			if (temps == 0) {
				clearInterval(interval);
				interval = null;
			}
			displayTime(temps);
		}, 1000);
		displayTime(temps);
	} else {
		clearInterval(interval);
		interval = null;
	}
}


// Views events initialization

$("#header").on("click", function() { displayPage("accueil"); });
$("#gotoRegles").on("click", function() { displayPage("regles"); });
$("#reglesDuJeu>div").on("click", function() { displayPage("regles"); });
$("#jouer").on("click", function() { displayPage("jeu"); });
$("#retourAuJeu").on("click", function() { displayPage("jeu"); });
$("#footer>div:nth-child(2)").on("click", relance);
$("#temps").on("click", toggleTime);


// Initialization

$(document).ready(function() {
	handleSliders();
	relance();
	displayInit();
});
