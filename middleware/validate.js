import Joi from "joi"
import { getOneOrder } from "../model/model.js"

const bookingSchema = Joi.object({
    eventId: Joi.string().required(),
    count: Joi.number() 
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required() 
})

const ticketSchema = Joi.object({
    ticketNumber: Joi.string().required(),
})

export async function validateBooking(req, res, next) {
    try{
        await bookingSchema.validateAsync(req.body)
        next()
    }
    catch(err) {
        res.status(400).json({success: false, msg: err.details[0].message})
    }
}

export async function validateLogin(req, res, next) {
    try{
        await loginSchema.validateAsync(req.body)
        next()
    }
    catch(err) {
        res.status(400).json({success: false, msg: err.details[0].message})
    }
}

export async function validateTicket(req, res, next) {
    try{
        await ticketSchema.validateAsync(req.params)
        let ticket = await getOneOrder(req.params.ticketNumber)
        if(ticket.success !== false) next()
        else res.json(ticket)
    }
    catch(err) {
        res.status(400).json({success: false, msg: err.details[0].message})
    }
}