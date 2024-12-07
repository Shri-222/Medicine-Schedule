
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Medicine = require('../models/Medicine');

exports.singup = async (req, res) => {
    try {

        //fetch the data from req body
        const { FirstName, LastName, Email, Password, accountType } = req.body;

        // Validations
        if ( !FirstName || !LastName || !Email || !Password || !accountType ) {
            return res.status(400).json(
                {
                    success: false,
                    massege : "Please provide all fields."
                }
            );
        }

        // Check if user already exists
        const userExists = await User.findOne({ Email });

        if ( userExists ) {
            return res.status(400).json(
                {
                    success: false,
                    massege : "User is already Registered"
                }
            );
        }

        // create the medicine details as an null to create the entry in db

        const medicine = await Medicine.create(
            {
                name : null,
                discription : null,
                createdAt : null,
                updatedAt : null,
                // userId : null
            }
        );

        // Hash the Password 

        console.log(' password ' , Password);
        const hashPassword = await bcrypt.hash(Password, 10);

        console.log('hash password ' , hashPassword);

        // create the User Entry in DB 
        const newUser = await User.create({
                                            FirstName : FirstName,
                                            LastName : LastName,
                                            Email : Email,
                                            accountType : accountType,
                                            Password : hashPassword,
                                            Medicine : medicine._id
                                        })

        // return the response
         res.status(200).json(
            {
                success: true,
                massege : "User registered successfully",
                user : newUser
            }
        );

    } catch (error) {
        
        console.log('Error While Creating account.', error);
        return res.status(500).json(
            {
                success: true,
                massege : "Error While Creating account."
            }
        );
    }
}