var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Eleve = require('./models/eleve.js');
var app = express();

// j'instance la connection mongo 
var promise = mongoose.connect('mongodb://localhost:27017/ifa', {
    useMongoClient: true,
});
// quand la connection est réussie
promise.then(function(db) {

    console.log('db.connected');
    // je démarre mon serveur node sur le port 3000
    app.listen(3000, function() {
        console.log('listening on 3000 and database is connected');
    });

});

// express configs
// j'utilise bodyparser dans toutes mes routes pour parser les res.body en json
app.use(bodyParser.urlencoded({
    extended: true
}));

// je déclare mon dossier qui contient mes vues
app.set('views', './views');
// je déclare mon type de moteur de rendu
app.set('view engine', 'jade');

// je déclare mes fichiers statiques
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));

// je renvoie l'index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
});
app.get('/profil', function(req, res) {
    res.sendFile(__dirname + '/client/profil.html')
});



// API : 
// renvoyer toute la liste des eleves
app.get('/api/liste', function(req, res) {
    Eleve.find({}, function(err, collection) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            console.log(collection);
            return res.send(collection);
        }
    });

});

// renvoie un seul eleve avec son id en param 
app.get('/api/liste/:id', function(req, res) {
    console.log(req.params);
    console.log(req.params.id);
    Eleve.findOne({
        "_id": req.params.id
    }, function(err, monobject) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            
            res.send(monobject);
        }
    });
   

});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

// exemple de rendu html / jade
app.get('/api/liste/jade/:id', function(req, res) {
    console.log(req.params);
    console.log(req.params.id);
    Eleve.findOne({
        "_id": req.params.id
    }, function(err, monobject) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.render('profil', {
                title: 'Hey',
                nom: monobject.nom,
                prenom: monobject.prenom
            });
           
        }
    });
  
                                          
});   