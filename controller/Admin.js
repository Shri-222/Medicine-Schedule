
const User = require('../models/User');
const Medicine = require('../models/Medicine');

exports.allUsers = async ( req, res ) => {

    try {

        const allUsers = await  User.find({}).populate('Medicine').exec();

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json(
                {
                    success : false,
                    message : 'No users found'
                }
            );
        }

        return res.status(200).json(
            {
                success : true,
                data : allUsers
            }
        );
        
    } catch (error) {
        
        console.log('Error while checking admin role.', error);
        res.status(500).json(
            {
                success : false,
                message : 'Error while checking admin role.'
            }
        );
    }
}



exports.specificUsers = async ( req, res ) => {
    try {

        const { startAt , endAt } = req.body;

        if ( !{startAt} || !{endAt} ) {
            return res.status(400).json(
                {
                    success : false,
                    message : 'Please provide startAt or endAt dates'
                }
            );
        }

        const medicine = await Medicine.find( {startAt} || {endAt} );

        res.status(200).json(
            {
                success : true,
                data : medicine
            }
        )
        
    } catch (error) {
        
        console.log('Error while fetching data', error);
        res.status(500).json(
            {
                success : false,
                message : 'Error while Fetching data, please try angin later'
            }
        );
    }
}