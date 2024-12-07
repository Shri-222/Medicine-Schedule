
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
require('dotenv').config();

exports.auth = async (req, res, next) => {

    try {

        //fetch the Token
        const token = req.cookies.token || req.header('authorization') 
                           // .replace('Bearer ', '')
        
        console.log('this is token' , token);

        // validation
        if(!token) {
            return res.status(401).json(
                {
                    success : false,
                    message : 'Token is not provided'
                }
            )
        }

        try {

            // varify the token 
            const decode = jwt.verify(token, process.env.JET_SECRET);
            console.log('thias is Decode ', decode);
            req.user = decode;
            console.log(req.user);
            
        } catch (error) {
            
            console.log('Error while verifying token', error);
            return res.status(403).json(
                {
                    success : false,
                    message : 'Token is not valid'
                }
            );
        }

        res.status(200).json(
            {
                success : true,
                message : 'User is authenticated'
            }
        )

        next();
        
    } catch (error) {
        
        console.log('Something went wrong while Authentication',error);
        res.status(500).json(
            {
                success : false,
                massege : 'Something went wrong while Authentication, please try again'
            }
        )
    }
}


exports.isUser = async ( req, res, next ) => {

    try {

        if(req.user.accountType !== 'User') {
            return res.status(403).json(
                {
                    success : false,
                    message : 'You are Imposter, You are not authorized to access this resource'
                }
            );
        }
        
        next();

    } catch (error) {
        
        console.log("Error While Verifing user Token", error);
        res.status(404).json(
            {
                success : false,
                massege : 'User Token is Invalid'
            }
        );
    }
}



exports.isAdmin = async ( req, res, next ) => {

    try {

        if(req.user.accountType !== 'Admin') {
            return res.status(403).json(
                {
                    success : false,
                    message : 'You are Imposter, You are not authorized to access this resource'
                }
            );
        }
        
        next();
        
    } catch (error) {
        
        console.log("Error While Verifing Admin Token", error);
        res.status(404).json(
            {
                success : false,
                massege : 'Admin Token is Invalid'
            }
        );
    }
}