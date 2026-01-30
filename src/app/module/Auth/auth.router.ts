import { Router } from "express"
import { authController } from "./auth.controller"

const router = Router()

router.post('/createUser',authController.createUser)
router.post('/login',authController.loginUser)
router.get('/getUser',authController.getUser)
router.get('/getSingleUser/:id',authController.getSingleUser)
router.patch('/updateUser',authController.updateUser)



export const authRouter = router