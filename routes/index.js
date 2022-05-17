var express = require('express');
var router = express.Router();
var moment = require('moment')
/* connecting data base */
var monk=require('monk');
var patientdb = monk("localhost:27017/Patient");
var patientcollection = patientdb.get('patientdata');
var appointmentcollection = patientdb.get('appointmentdata');

var monk=require('monk');
var admindb = monk("localhost:27017/AddData");
var admincollection = admindb.get('admin');
var doctorcollection = admindb.get('doctor');
var receptioncollection = admindb.get('receptionist');
//var acceptrejectcollection = admindb.get('Actions');



/* GET home page. */
router.get('/Home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/logout',function(req,res,next){
	if(req.session && req.session.user){
		req.session.reset();
		res.render('login',{title:'Express'});
	}
	else{
		res.redirect('/home')
	}	
})
router.get('/patientreg',function(req,res,next){
  res.render('patientregister',{title:'Express'});
});

router.get('/patientlog',function(req,res,next){
	res.render('patientlogin',{title:'Express'});
});

router.get('/logins',function(req,res,next){
	res.render('login',{title:'Express'});
});

router.get('/docreg',function(req,res,next){
	res.render('doctorreg',{title:'Express'});
});

router.get('/adminreg',function(req,res,next){
	res.render('adminreg',{title:'Express'});
});

router.get('/receptionreg',function(req,res,next){
	res.render('receptionistreg',{title:'Express'});
})

router.get('/adminlogin',function(req,res,next){
	res.render('adminlog',{title:'Express'});
})

router.get('/doctorlogin',function(req,res,next){
	res.render('doctorlog',{title:'Express'});
})

router.get('/receptlogin',function(req,res,next){
	res.render('receptionlog',{title:'Express'});
})

router.get('/adminpage',function(req,res,next){
	res.render('adminpage',{title:'Express'});
})

router.get('/doctors',function(req,res,next){
	res.render('doctors',{title:'Express'});
})

router.get('/appoint',function(req,res,next){
	res.render('appointment',{title:'Express'});
});

router.get('/patientdoc',function(req,res,next){
	res.render('patientdoc',{title:'Express'});
});

router.get('/admindata',function(req,res,next){
	res.render('admindata',{title:'Express'});
});

router.get('/patientop',function(req,res,next){
	res.render('patientop',{title:'Express'});
});
router.get('/receptionist',function(req,res,next){
	res.render('receptionist',{title:'Express'});
});

router.get('/receptiondoc',function(req,res,next){
	res.render('receptiondoc',{title:'Express'});
});

router.get('/receptionop',function(req,res,next){
	res.render('receptionop',{title:'Express'});
});

router.get('/profile',function(req,res,next){
	res.render('profile',{title:'Express'});
})

router.get('/receptdisplay',function(req,res,next){
	res.render('receptiondisplay',{title:'Express'});
})

router.get('/acptrjtdisplay',function(req,res,next){
	res.render('acceptdisplay',{title:'Express'});
})

router.get('/docprofile',function(req,res,next){
	res.render('doctorprofile',{title:'Express'});
})

router.get('/docappointment',function(req,res,next){
	res.render('doctorappointment',{title:'Express'});
})

router.get('/profiledata',function(req,res,next){
	if(req.session && req.session.user){
		res.render('profiledisplay',{title:'Express'});
	}
	else{
		res.redirect('/patientreg')
	}	
})
router.get('/doctordata',function(req,res,next){
	res.render('doctorprofiledis',{title:'Express'});
})

router.post("/patientposting", function (req, res) {
	var data = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
    	gender:req.body.gender,
    	age:req.body.age,
    	email:req.body.email,
      	pwd:req.body.pwd,
     	cpwd:req.body.cpwd,
      	address:req.body.address
	}
	patientcollection.insert(data, function (docs, error) {
		if(docs){
			res.send(docs)
		}else{
			res.send(error)
		}
	})
})
/*Patient Login */
router.post('/checkdata',function(req,res) {
	patientcollection.findOne({'email':req.body.email,'pwd':req.body.pwd},function(error,docs){
	  if(docs==null||error){
		res.sendStatus(500)
		// console.log(docs)
	  }
	  else{
		  req.session.user = docs
		res.send(docs)
		// console.log(docs)
	  }
	})  
})
/* Get patient details */
router.get('/getpatients',function(req, res){
	//console.log(docs)
	if(req.session && req.session.user){
		patientcollection.find({'email':req.session.user.email},function(err, docs){
			console.log(docs);
			if(docs){
				res.send(docs)
			}else{
				res.send(err)
			}
		})
	}
	
})

 
/* Admin Register */
router.post("/adminposting", function (req, res) {
	var data = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
    	adminid:req.body.adminid,
    	email:req.body.email,
      	pwd:req.body.pwd,
     	cpwd:req.body.cpwd,
      	phno:req.body.phno
	}
	admincollection.insert(data, function (docs, error) {
		if(docs){
			res.send(docs)
		}else{
			res.send(error)
		}
	})
}) 
/* Admin Login */
router.post('/admincheckdata',function(req,res) {
	admincollection.findOne({'email':req.body.email,'pwd':req.body.pwd,'adminid':req.body.adminid},function(error,docs){
	  if(docs==null||error){
		res.sendStatus(500)
		console.log(docs)
	  }
	  else{
		res.send(docs)
		console.log(docs)
	  }
	})  
})
/* Doctor Posting */
router.post("/doctorposting", function (req, res) {
	var data = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
    	doctorid:req.body.doctorid,
		specialization:req.body.specialization,
    	email:req.body.email,
      	pwd:req.body.pwd,
     	cpwd:req.body.cpwd,
      	phno:req.body.phno
	}
	doctorcollection.insert(data, function (docs, error) {
		if(docs){
			res.send(docs)
		}else{
			res.send(error)
		}
	})
}) 
/* Doctor Login */
router.post('/doctorcheckdata',function(req,res) {
	doctorcollection.findOne({'email':req.body.email,'pwd':req.body.pwd,'doctorid':req.body.doctorid},function(error,docs){
	  if(docs==null||error){
		res.sendStatus(500)
		// console.log(docs)
	  }
	  else{
		// req.session.user = docs
		res.send(error)
		// console.log(docs)
	  }
	})  
})
/*Get Doctor details */
router.get('/getdoctors',function(req, res){
	//console.log(docs)
		doctorcollection.find({'email':req.body.email,'doctorid':req.body.doctorid},function(err, docs){
			//req.session.name=docs.doctorid
			if(docs){
				res.send(docs)
				console.log(docs);
			}else{
				res.send(err)
			}
		})
	
})
/* Receptionist Posting */

router.post("/receptionistposting", function (req, res) {
	var data = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
    	receptionid:req.body.receptionid,
    	email:req.body.email,
      	pwd:req.body.pwd,
     	cpwd:req.body.cpwd,
      	phno:req.body.phno
	}
	receptioncollection.insert(data, function (docs, error) {
		if(docs){
			res.send(docs)
		}else{
			res.send(error)
		}
	})
}) 
//Receptionist Login
router.post('/receptioncheckdata',function(req,res) {
	receptioncollection.findOne({'email':req.body.email,'pwd':req.body.pwd,'receptionid':req.body.receptionid},function(error,docs){
	  if(docs==null||error){
		res.sendStatus(500)
		console.log(docs)
	  }
	  else{
		res.send(docs)
		console.log(docs)
	  }
	})  
})

//Appointment posting
router.post("/appointmentposting", function (req, res) {
	var data = {
		firstname:req.body.firstname,
    	date:moment(req.body.date).format("MM-DD-YYYY"),
		email:req.body.email,
    	departement:req.body.departement,
		num:req.body.num,
    	message:req.body.message
	//	action:req.body.action
	}
	appointmentcollection.insert(data, function (docs, error) {
		if(docs){
			res.send(docs)
		}else{
			res.send(error)
		}
	})
})
//Appointment getting
router.get('/getappointmentpatients',function(req, res){
	//console.log(docs)
	appointmentcollection.find({},function(err, docs){
		console.log(docs);
		if(docs){
			res.send(docs)
		}else{
			res.send(err)
		}
	})
})

// Reject Accept posting

// router.post("/acceptrejectposting", function (req, res) {
// 	var data = {
// 		firstname:req.body.firstname,
// 		date:req.body.date,
//     	email:req.body.email,
//       	departement:req.body.departement,
//      	num:req.body.num,
//       	accept:req.body.accept,
// 		reject:req.body.reject
// 	}
// 	acceptrejectcollection.insert(data, function (docs, error) {
// 		if(docs){
// 			res.send(docs)
// 		}else{
// 			res.send(error)
// 		}
// 	})
// })

// update in the database
router.post('/updatepatients',function(req, res){
	console.log(req.body)
	appointmentcollection.update({"_id":req.body._id},{$set:{"Action":"Approved"}},function(err,docs){
		if(docs){

			res.send(docs);
		}
		else{
			res.end(err);
		}
	})

})
router.post('/updatepatientsrej',function(req, res){
	console.log(req.body)
	appointmentcollection.update({"_id":req.body._id},{$set:{"Action":"Rejected"}},function(err,docs){
		if(docs){

			res.send(docs);
		}
		else{
			res.end(err);
		}
	})

})


module.exports = router;
