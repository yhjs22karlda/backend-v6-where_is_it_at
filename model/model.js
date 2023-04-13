import Datastore from "nedb-promises";
import {v4 as uuidv4} from 'uuid'
let events = Datastore.create('db/events.db')
let orders = Datastore.create('db/orders.db')
let users = Datastore.create('db/users.db')

export function getAllEvents() {
    return events.find({})
}

export async function getOneEvent(id) {
    let event = await events.findOne({_id: id})
    if(event) {
        return event
    } else {
        return {success: false, msg: "No such ID!"}
    }
}

export async function addOrder(order) {
    let event = await getOneEvent(order.eventId)
    if(event.success === false) return (event)
    let orderNumber = uuidv4()
    await orders.insert({
        user: order.user || null,
        event: event._id,
        count: order.count,
        orderNumber,
        verified: false
    })
    return({
        success: true,
        msg: "Tickets ordered",
        details: event,
        count: order.count,
        orderNumber
    })
}

export async function getOneOrder(orderNumber) {
    let order = await orders.findOne({orderNumber})
    if(order) return order
    else return {success: false, msg: "No order with that number exists!"}
}

export async function addUser(username, password) {
    const user = await users.findOne({username})
    let apiKey = uuidv4()
    if(user) {
        return {success: false, msg: "User already exists"}
    } else {
        await users.insert({username, password, apiKey})
        return {success: true, msg: "User added", apiKey}
    }
}

export async function getOneUser(apiKey) {
    let user = await users.findOne({apiKey})
    if(user) return user
    else return {success: false, msg: "Wrong API-Key"}
}

export async function loginUser(username, password) {
    //TODO login
    return {success: false, msg: "Under construction"}
}

export async function verifyTicket(nr) {
    let ticket = await orders.findOne({orderNumber: nr})
    if(ticket.verified === false) {
        ticket.verified = true
        await orders.update({orderNumber: nr}, ticket)
        return {success: true, msg: "Ticket verified"}
    } else {
        return {success: false, msg: "Ticket has already been verified"}
    }
}