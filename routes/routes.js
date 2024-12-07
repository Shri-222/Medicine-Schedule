
const express = require('express');

const router = express.Router();

const Singup = require('../controller/singup');
const Login = require('../controller/Login');
const { createMedicine, updateMedicine, getMedicine, deleteMedicine} = require('../controller/Medicine');
const Acknowledgment = require('../controller/Acknowledgment');
const {specificUsers, allUsers} = require('../controller/Admin');
const { auth, isUser, isAdmin } = require('../middlaware/auth');

router.post('/register', Singup.singup);
router.post('/login', Login.Login);

router.post('/isUser', auth, isUser);
router.post('/isAdmin', auth, isAdmin);

router.post('/createMed', createMedicine);
router.put('/updateMed/:id', updateMedicine);
router.delete('/deleteMed/:id', deleteMedicine);
router.get('/getmed', getMedicine);

router.post('/acknowledgment', Acknowledgment.Acknowledgment);

router.get('/all-Users', allUsers);
router.get('/Spec-Users', specificUsers);


module.exports = router;



