const mysql=require('mysql2');
const { faker } = require('@faker-js/faker');
const express =require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const { Console } = require('console');




const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'parctice_with_node',
    password:'AbhayM@180107'
})                                             //Made the connection with MySql with Database 'parctice_with_node'


// try{
//     connection.query("SHOW TABLES",(err,res)=>{
//         if (err) throw err;
//         console.log(res)                //we will get the result in arr form [ { Tables_in_parctice_with_node: 'users' } ]
//     })
//     }catch(err){
//         console.log(err)
//     }

//connetion.end(); //end connection

 


// try{
// connection.query("SHOW TABLES",(err,res)=>{
//     if (err) throw err;
//     console.log(res)                //we will get the result in arr form [ { Tables_in_parctice_with_node: 'users' } ]
// })
// }catch(err){
//     console.log(err)
// }


//now to insert data in this table 

// let q='INSERT INTO users VALUES ? '
// let arr=[[6,'abhhaygmnbk','abhajychjchja@gamil','qbvhhvey4'],[7,'abhajhhgfykd','abhagghgyb@gamil','qegjychg4']];

// try{
//     connection.query(q,[arr],(err,res)=>{
//         if (err) throw err;
//         console.log(res)                
//     })
//     }catch(err){
//         console.log(err)
//     }


//insert 100 data by creating faker data


// let data=[];
// for(i=0;i<=100;i++){
//     data.push([faker.datatype.uuid(),faker.internet.userName(),faker.internet.email(),faker.internet.password()])
// }



// //insert 
// let q='INSERT INTO users VALUES ? '
// try{
// connection.query(q,[data],(err,res)=>{
//     if(err) throw err
//     console.log(res)
// });
// }catch(err){
//     console.log(err)
// }


// let q='SELECT * FROM users'
// try{
// connection.query(q,(err,res)=>{
//     if(err) throw err
//     console.log(res)
// });
// }catch(err){
//     console.log(err)
// }


//NOW make rest full apis to CRUD by express;          //from here express
app.set("view engine", "ejs"); // set ejs
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}))
let port=8080;

app.listen(port,()=>{
    console.log(`app is working on port ${port}`)
});

// route / to get the count of all users

app.get("/",(req,res)=>{
    let q='SELECT COUNT(*) FROM users'
    try{
    connection.query(q,(err,result)=>{
        if(err) throw err
        let count=result[0]["COUNT(*)"]
        res.send(`Count of all users is : ${count}`)
    })
}catch(err){
    console.log(err)
}
});

// route /users display all users

app.get('/users',(req,res)=>{
    let q ='SELECT * FROM users'
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err
            let data = result
            res.render('show.ejs',{data})
        })
    }catch(err){
        console.log(err)
    }
});

// route /users/:id/edit

app.get('/users/:id/edit',(req,res)=>{
    let {id}=req.params
    let q=`SELECT * FROM users WHERE id='${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err
            let user=result[0]
            console.log(user)
            res.render('edit.ejs',{user})
        })
    }catch(err){
        console.log(err)
    }
});

// route /users/:id 
app.patch('/users/:id',(req,res)=>{
    let{id} =req.params
    let {NewName,password}=req.body;
    let q=`SELECT * FROM users WHERE id='${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err
            let user=result[0]
            console.log(user)
            console.log(user.Password)
            console.log(password)

            if(password==user.Password){
                let q2=`UPDATE users SET Name='${NewName}' WHERE id='${id}'`
                try{
                    connection.query(q2,(err,result)=>{
                        if(err) throw err
                        res.redirect('/users')
                    })
                }catch(err){
                    console.log(err)
                }
            }else{
                res.send("wrong password")
            }
        })
    }catch(err){
        console.log(err)
    }

});
    //DELECT form route
    app.get('/users/:id/delete',(req,res)=>{
        let {id}=req.params
        let q=`SELECT * FROM users WHERE id='${id}'`
        try{
            connection.query(q,(err,result)=>{
                if(err) throw err
                let user=result[0]
                console.log(user)
                res.render('delete.ejs',{user})
            })
        }catch(err){
            console.log(err)
        }
    });


//DELETE route

  app.delete('/users/:id',(req,res)=>{
    let {id} =req.params;
   let{password}=req.body;
    console.log(id);
    
     let q=`SELECT * FROM users WHERE id='${id}'`
     try{
     connection.query(q,(err,result)=>{
        if(err) throw err
        console.log(result[0].Password)
        let UserPassword=result[0].Password
        if(password===UserPassword){
            let q2=`DELETE FROM users WHERE id='${id}'`
            try{
            connection.query(q2,(err,result)=>{
                if(err) throw err
                 res.redirect('/users')
            })
        }catch(err){
            console.log(err)
        }
        }else{
            res.send('Wrong password')
        }
     })
     }catch(err){
        console.log(err)
     }
    });

////To Add User
//create form
app.get('/users/add',(req,res)=>{
    res.render('Add.ejs')
})

//App user
app.post('/users/Add',(req,res)=>{
    let {Name,Email,password}=req.body
    q='INSERT INTO users VALUES (?,?,?,?)'
    let arr=[faker.string.uuid(),Name,Email,password]
    try{
        connection.query(q,arr,(err,result)=>{
         if(err) throw err
         res.redirect('/users')
    })
    }catch(err){
        console.log(err)
    }
})


//>>>>>>>>>>>>>>>>>>>>>>>>>>>> Done :) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    







