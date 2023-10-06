import { Router } from 'express'
import { GET } from '../controllers/user.controllers.js'

const router = Router()

router.get('/', GET)

export default router
