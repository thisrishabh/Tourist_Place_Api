const express=require('express')
const router=express.Router()
const UserController=require('../controllers/userController')



router.post('/state', UserController.state )
router.post('/city', UserController.city )
router.post('/place',UserController.search)
router.get('/', UserController.india)

router.get('/place/:state_name', UserController.states)

router.get('/:state_name/:city_name', UserController.stateCity)

router.get('/:state_name/:city_name/:tourist_place',UserController.stateCityTourist)




module.exports=router