
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
require('dotenv').config();

exports.Login = async ( req, res ) => {

    try {

        // fetch data from req body
        const { Email, Password } = req.body;

        // validation
        if( !Email || !Password ){
            return res.status(400).json(
                {
                    success : false,
                    messege : 'Please provide email and password'
                }
            );
        }

        const user = await User.findOne({Email});

        console.log( " user :- ", user);

        if ( !user ) {
            return res.status(404).json(
                {
                    success : false,
                    messege : 'User not found'
                }
            );
        }

       const storedPassword = user.Password || user.password; 

       console.log( " stored password : ", storedPassword);

    //    if (!storedPassword) {
    //     return res.status(400).json({
    //       success: false,
    //       message: 'Password field not found in user document'
    //     });
    //   }

        // Decript the password

        const isMatch =  bcrypt.compare( Password, user.Password );
        
        console.log(isMatch);
            
            if ( isMatch ) {

                // create playload and share into JWT
                const plyload = {
                    id : user._id,
                    email : user.Email,
                    accountType : user.accountType
                }

                console.log( 'this is playlode' ,plyload);
    
                // Gearet thhe Token
                const token = jwt.sign(plyload, process.env.JET_SECRET, { expiresIn : '3h'});
    
                user.Token = token;
                user.Password = undefined;
    
                // genaret the cookies
    
                const options = {
                    expiresIn : Date.now() + 3*24*60*60*1000,
                    httpOnly : true
                };
                
                res.cookie('token', token, options).status(200).json({
                    success : true,
                    massege : 'User Login Success',
                    token,
                    user
                });
    
            } else {
                return res.status(401).json(
                    {
                        success : false,
                        messege : 'Password is Incorrect, Please Enter Password Correctly'
                    }
                );
            } 

        console.log( " is match :- ", isMatch);

        
        
        
    } catch (error) {
        
        console.log('Error While Login', error);
        res.status(500).json(
            {
                success : false,
                massege : 'Error While Login'
            }
        );
    }
}
