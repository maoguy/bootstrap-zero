var port = process.env.PORT || 4000,
    app = require('./app').init(port),
    utils = require('./utils'),
    conf = require('./conf'),
    request = require('request'),
    pageSize = 20;
   
    
app.get('/', function(req, res){

    var templates = require('./templates');
    var starters = [], themes = [];
    
    for (var i=0;i<templates.length;i++) {
    
        if (templates[i].tags.indexOf("starter")!=-1) {
            starters.push(templates[i]);    
        }
        
        if (templates[i].tags.indexOf("theme")!=-1) {
            themes.push(templates[i]);  
        } 
    }
    
    res.render("index",{templates:templates,starters:starters,themes:themes,utils:utils,path:"/"});
    
});

app.get('/templates/:id', function(req, res){

    console.log("/templates.......");

    var templates = require('./templates');
    var id = req.params.id;
   
    if (typeof id==="undefined") {
        return;
    }
    
    for (var i=0;i<templates.length;i++) {
    
        var prev = (templates[i-1])||templates[templates.length-1];
        var next = (templates[i+1])||templates[0];
    
        if (templates[i].id===id) {
            res.render("detail",{template:templates[i],utils:utils,next:next,prev:prev});
            return;
        }    
        
    }
    
    res.render("404",{error:"no results"});
    
});

app.get('/bootstrap-template/:title', function(req, res){

    console.log("/template by title.......");

    var templates = require('./templates');
    var title = req.params.title;
   
    if (typeof title==="undefined") {
        return;
    }
    else {
        title = title.replace("-"," ");
    }
    
    for (var i=0;i<templates.length;i++) {
    
        var prev = (templates[i-1])||templates[templates.length-1];
        var next = (templates[i+1])||templates[0];
    
        if (templates[i].title.toLowerCase()===title.toLowerCase()) {
            res.render("detail",{template:templates[i],utils:utils,next:next,prev:prev});
            return;
        }    
        
    }
    
    res.render("404",{error:"no results"});
    
});

app.get('/api/templates', function(req, res){
    var fs = require('fs');
    
   //fs.readFile('./templates.json', 'utf8', function (err, data) {
    //    res.json(data);
    //});
    
    var data = require('./templates');
    res.json(data);
    
    //var fileJSON = require('./static/templates.json');
    //res.send(fileJSON);

    //fs.readFile('./templates.json', 'utf8', function (err, data) {
    //    res.send(data);
    //});
    
    //res.writeHead(200, {"Content-Type": "application/json"});
    //fs.createReadStream('templates.json',{flags:'r',encoding:'utf-8'}).pipe(res);
    
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
    res.render('404.ejs');
});

