
const Medicine = require('../models/Medicine');
const User = require('../models/User');
const cookies = require('cookie-parser')


exports.createMedicine = async ( req, res ) => {

    try {

        // fetch the data from req body
        const { mName, mDiscription, mTime, Mdocess } = req.body;

        // validation 
        if( !mName || !mDiscription || !mTime || !Mdocess ){
            return res.status(400).json(
                {
                    success : false,
                    messege : 'Please provide all fields'
                }
            );
        }

        // fetch user ID
        const userID = req.user.id;
                       
        console.log(userID);

        // find user details
        const userDetails = await User.findById(userID);
        console.log(userDetails);
        // find medicine Id 
        const madicineId =  userDetails.Medicine
        // get madicine details
        const medicineDetails = await Medicine.findById(madicineId);

        // create an entry

        const medicineEntry = await Medicine.create({
            name : mName,
            discription : mDiscription,
            time : mTime,
            doctor : Mdocess,
        })

        res.status(200).json(
            {
                success: true,
                massage : "Medicine Entry created Successfully"
            }
        )

    }catch (error) {
        
        console.log('Something went wrong while creating Enty of Medicine', error);
        return res.status(404).json(
            {
                success: false,
                massage : "Something went wrong while creating Enty of Medicine"
            }
        );
    }
}


exports.updateMedicine = async ( req, res ) => {

    try {

        // fetch the data 
        const { mName, mDiscription, mTime, Mdocess, madicineId} = req.body;

        // validation
        if(!mName ||!mDiscription ||!mTime ||!Mdocess){
            return res.status(400).json(
                {
                    success : false,
                    messege : 'Please provide all fields'
                }
            );
        }

        const upadatedMedicine = await Medicine.findByIdAndUpdate(
                                                                   { _id : madicineId},
                                                                    {
                                                                         name : mName,
                                                                         discription : mDiscription,
                                                                         time : mTime,
                                                                         doctor : Mdocess
                                                                    },
                                                                    {
                                                                        new : true
                                                                    }
                                                                    );

        console.log(upadatedMedicine);

        // return respins
        res.status(200).json(
            {
                success: true,
                massage : "Medicine Entry updated Successfully",
                medicine : upadatedMedicine
            }
        );

        
    } catch (error) {
        
        console.log('Something went wrong while Updating the Medicine ', error);
        return res.status(404).json(
            {
                success: false,
                massage : "Something went wrong while Updating the Medicine "
            }
        );
    }
}



exports.getMedicine = async ( req, res ) => {

    try {

        const allMedicine = await Medicine.find({});

        res.status(200).json(
            {
                success: true,
                data: allMedicine
            }
        );
        
    } catch (error) {
        
        console.log('Something went wrong while fetching the Medicine data', error);
        return res.status(404).json(
            {
                success: false,
                massage : "Something went wrong while fetching the Medicine data"
            }
        );
    }
}



exports.deleteMedicine = async ( req, res ) => {
    try {

        const { madicineId } = req.body;

        const deletedMedicine = await Medicine.findByIdAndDelete(madicineId);

        const user = await User.findOne(madicineId);

        user.Medicine = null;

        res.status(200).json(
            {
                success: true,
                massage : "Medicine Entry deleted Successfully",
                medicine : deletedMedicine
            }
        );
        
    } catch (error) {
        
        console.log('Something went wrong while Deleting the Medicine data', error);
        return res.status(404).json(
            {
                success: false,
                massage : "Something went wrong while Deleting the Medicine data"
            }
        );
    }
}