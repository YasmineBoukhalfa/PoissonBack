import { FastifyInstance } from "fastify";
import {loginHandler, registerUserHandler, getUsersHandler, deleteUsersHandler, updateUserHandler} from './user.controller'
import { $ref } from "./user.schema";
async function userRoutes(server: FastifyInstance){

//register route
server.post('/',{

    schema: {
        body: $ref('createUserSchema'),
        response:{
            201: $ref('createUserResponseSchema')
        }

    }
}, registerUserHandler);


//login route
server.post('/login', {

    schema:{
        body: $ref('loginSchema'),
        response:{
            200:$ref('loginResponseSchema')
        }
    }
}, loginHandler)



//Find users route
server.get('/findUsers', getUsersHandler)

//delete user route
server.delete('/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}, deleteUsersHandler)



//update user route
server.put('/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            }
        },
        body: $ref('updateUserSchema'),
        response: {
            200: $ref('createUserResponseSchema')
        }
    }
}, updateUserHandler);



}

export default userRoutes;