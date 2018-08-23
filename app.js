/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');
	
var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
    dbName: 'rapidcare'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var userController = require('./controllers/userController');

// all environments
app.set('port', process.env.PORT || 5000 );
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'javascripts')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
app.use('/user',user);

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

  
function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }

    cloudant = require('cloudant')(dbCredentials.url);

    // check if DB exists if not create
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });

    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

app.get('/', routes.index);

app.post('/login',userController.login);

/*Added method to get Patient Details */

app.get('/api/getPatients', function(request, response) {
    console.log("Get method invoked.. ")

      db = cloudant.use(dbCredentials.dbName);

      db.list(function(err, body) {
          if (!err) {
              var len = body.rows.length;
              console.log('total # of docs -> ' + len);
              if (len == 0) {
                 
              } else {
               var query = {
                        "selector": {
                          "document_type" : "symptoms" 
                        }
                      };
       
           db.find(query, function(err, doc) {
               if (!err) {
                   console.log(doc.docs);
                  return response.json({ result : doc.docs});  
               //   response.write(JSON.stringify(doc.docs));
                   console.log('ending response...');
                   response.end();
                   }
                else {
                   console.log(err);
               }
           });
              }

          } else {
              console.log(err);
          }
      });
});

app.get('/api/getSymptoms', function(request, response) {

    var patientName = request.param('patientName');
    var patientAge = request.param('patientAge');
    var patientOccupation = request.param('patientOccupation');
    var patientSymptoms = request.param('patientSymptoms');
    var patientCountry = request.param('patientCountry');
    var patientState = request.param('patientState');
    var patientZip = request.param('patientZip');

    // var request = require('request');
    // request.post({
    //     headers: {'content-type' : 'application/x-www-form-urlencoded'},
    //     url:     'http://localhost/test2.php',
    //     body:    "mes=heydude"
    // }, function(error, response, body){
    //     console.log(body);
    // });


    // NEED TO MAKE NLU CALL BEFORE THIS
    dbInsertQuery = {"document_type":"symptoms","hospital_name":"All India Institute of Medical Sciences","location":patientCountry,"patient_name":patientName,"patient_age":patientAge,"patient_occ":patientOccupation,"City":patientState,"Symptoms_reported":patientSymptoms,"disease":"cholera","prediction":{"cholera":55,"malaria":25},"date_updated":"23-08-2018"}
    console.log(dbInsertQuery)

    db = cloudant.use(dbCredentials.dbName);
    db.insert(dbInsertQuery, function (er, result) {
        if (er) {
            throw er;
        }

        var data=[{
            'diseaseName': 'Cholera',
            'ageRange': "30-40"
        },{
            'diseaseName': 'Influenza',
            'ageRange': "40-50"
        }];
    
        return response.json({ result : data});
        console.log('ending response...');
        response.end();
    });
});


app.use(express.static(__dirname));
exports = module.exports = app;
http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
