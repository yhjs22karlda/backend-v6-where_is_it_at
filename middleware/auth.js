import { getOneUser } from "../model/model.js"

export async function auth(req, res, next) {
    let ticket = await getOneUser(req.headers['api-key'])
    if(ticket.success !== false) next()
    else res.json(ticket)
}