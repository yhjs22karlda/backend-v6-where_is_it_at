import {Router} from 'express'
export const router = Router()
import {getAllEvents, addOrder, addUser, loginUser, verifyTicket} from '../model/model.js'
import {auth} from '../middleware/auth.js'
import {validateBooking, validateLogin, validateTicket} from '../middleware/validate.js'


router.get("/api/events", (req, res) => {
    getAllEvents().then(data => {
        res.json({success: true, data})
    })
})

router.post("/api/booking", validateBooking, async (req, res) => {
    addOrder(req.body).then(data => {
        res.json(data)
    })
})

router.post('/api/createAccount', validateLogin, (req, res) => {
    addUser(req.body.username, req.body.password).then(data => {
        res.json(data)
    })
})

router.post('/api/login', validateLogin, (req, res) => {
    loginUser(req.body.username, req.body.password).then(data => {
        res.json(data)
    })
})

router.get('/api/verify/:ticketNumber', validateTicket, auth, (req, res) => {
    verifyTicket(req.params.ticketNumber).then(data => {
        res.json(data)
    })
})