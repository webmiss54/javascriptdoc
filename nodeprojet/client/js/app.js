// je crée un tb vide pour stocker mes données
var data = [];
// 1 : gérer la récupération de données
// je crée mon objet requete 
var marequete = new XMLHttpRequest();
// j'ouvre une requete get
marequete.open('GET', "http://localhost:3000/api/liste", true);
// je lanche ma requete
marequete.send();

// on écoute ce qu'il se passe
marequete.addEventListener("readystatechange", processRequest, false);
// callback de ma requete http
function processRequest(event) {
    console.log(event);
    console.log(marequete.readyState);
    console.log(marequete.status);
    // console.log(event);

    if (marequete.readyState == 4 && marequete.status == 200) {
        // var mareponse = marequete.response;
        var mareponseText = marequete.responseText;
        // parser la reponse texte en json 
        mareponseText = JSON.parse(mareponseText);
        // appel la fonction bindlist avec la réponse en param

        // stocker le tableau dans la variable data
        data = mareponseText;
        data.forEach(function(eleve) {
            bindList(eleve);

        });
        // console.log(mareponse);
    }

}


// données récupérées

// créer element liste
var monUl = document.createElement("ul");
// ajout classe list-group
monUl.classList.add("list-group")
    // retrouver le wrap principal
var monWrap = document.getElementById("wrap");

// ajout le ul au wrap
monWrap.appendChild(monUl);


// gérer le toggle au click sur le bouton pour faire apparaitre le formulaire
var monBtn = document.getElementById("addNew");
monBtn.addEventListener("click", function(event) {
    document.getElementById("myForm").classList.toggle("show");

});

// faire le traitement sur le tableau de données récupérées (création du li et ajout au ul)

// bind chaque element dans la liste ul
function bindList(eleve) {
    // créer l'element li
    var monLi = document.createElement("li");
    // remplir le contenu du li
    monLi.innerHTML = eleve.nom + ' ' + eleve.prenom;
    // ajout class
    monLi.classList.add("list-group-item");
    // mettre en data- l'_id de l'élève pour pouvoir le retrouver
    monLi.setAttribute("data-idEleve", eleve._id);

    // ajout btn profile
    addBtnProfile(monLi);
    // ajout btn delete
    addBtnDelete(monLi);
    // ajout btn edit
    // addBtnEdit(monLi);


    // monLi.appendChild(deleteBtn);
    monUl.appendChild(monLi);
}


// fonctions d'ajout des bouttons
function addBtnProfile(elem) {
    var btnProfile = document.createElement("span");
    btnProfile.classList.add("badge")
    btnProfile.innerHTML = "<span class='glyphicon glyphicon-user' aria-hidden='true'></span>";
    btnProfile.addEventListener("click", detectClick);
    elem.appendChild(btnProfile);
}

function addBtnDelete(elem) {
    var deleteBtn = document.createElement("span");
    deleteBtn.classList.add("badge")
    deleteBtn.innerHTML = "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>";
    deleteBtn.addEventListener("click", deleteEleve);
    elem.appendChild(deleteBtn);
}

function addBtnEdit(elem) {
    var deleteEdit = document.createElement("span");
    deleteEdit.classList.add("badge")
    deleteEdit.innerHTML = "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>";
    deleteEdit.addEventListener("click", editEleve);
    elem.appendChild(deleteEdit);
}



// detect le click sur chaque btn profile
function detectClick(event) {
    event.preventDefault();
    // console.log(this);
    console.log(event);
    console.log(event.target);
    var myTarget = event.target.parentNode.parentNode;
    console.log(myTarget);
    var eleveId = myTarget.getAttribute("data-idEleve");
    console.log(eleveId);

    window.location = "./profil" + '#' + myTarget.getAttribute("data-idEleve");
}


// fonction qui gère le formulaire
function submitForm(event) {
    // event.preventDefault();
    console.log("submitted");
    var monForm = document.getElementById("newUser").elements;
    var newUser = {
        id: data.length + 1
    };
    console.log(typeof monForm);
    // console.log( monForm[0]);
    _.forIn(monForm, function(item) {
        console.log(item);
        newUser[item.name] = item.value;

    });
    console.log(newUser);
    data.push(newUser);
    bindList(newUser);
    console.log(data);

};

// supprimer un eleve
function deleteEleve(event) {
    event.preventDefault();
    console.log("delete");
    console.log(event);
    console.log(event.target);
    var myTarget = event.target.parentNode.parentNode;
    console.log(myTarget);
    var eleveId = myTarget.getAttribute("data-ideleve");
    console.log(eleveId)
    var myIndex = data.findIndex(function(i) {
        return i.id === eleveId
    });
    data.splice(myIndex, 1);
    removeElem(myTarget);
    // console.log(myIndex);

    // // je cherche l'eleve correspondant a l'index
    // var monuser = dataList[myIndex];
    // console.log(monuser);

};

// editer un eleve
// function editEleve(event) {
//     console.log("edit");
//     document.getElementById("myForm").classList.toggle("show");
//     var myTarget = event.target.parentNode.parentNode;
//     console.log(myTarget);
//     var eleveId = myTarget.getAttribute("data-idEleve");
//     console.log(eleveId);
//     var myIndex = data.findIndex(function(i) {
//         return i._id === eleveId;
//     });
//     console.log(myIndex);
//     var monForm = document.getElementById("newUser").elements;
//     _.forIn(monForm, function(item) {
//         // console.log(item.value);
//         // console.log(item.name);
//         item.value = data[myIndex][item.name];
//         // newUser[item.name] = item.value;

//     });



// };