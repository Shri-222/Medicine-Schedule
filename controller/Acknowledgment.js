
const Medicine = require('../models/Medicine');

exports.Acknowledgment = async ( req, res ) => {
    try {

        // fetch medicine data from req body
        const { MedicineId, status } = req.body;

        // validation
        const medicineDetails = await Medicine.findById(MedicineId);

        if(!medicineDetails) {
            return res.status(404).json(
                {
                    success : false,
                    message : 'Medicine not found'
                }
            );
        }

        // update medicine status
        medicineDetails.status = status;

        await medicineDetails.save();

        res.json(
            {
                success : true,
                message : 'Medicine acknowledgment updated successfully'
            }
        );
        
    } catch (error) {
        
        console.log('Something went wrong while acknowledgment',error);
        res.status(500).json(
            {
                success : false,
                massege : 'Something went wrong while acknowledgment, please try again'
            }
        )
    }
}