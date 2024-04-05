import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, findUserByEmail, findUsers, deleteUserById, updateUserById  } from "./user.service";
import { CreateUserInput, LoginInput, UpdateUserInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";


//register user
export async function registerUserHandler(
request: FastifyRequest<{
Body: CreateUserInput;

}>,
reply: FastifyReply)
{

    const body = request.body

    try {
        
        const user = await CreateUser(body);
    return reply.code(201).send(user);
    
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

//login 
export async function loginHandler(request: FastifyRequest<{
Body: LoginInput

}>, reply: FastifyReply){

    const body = request.body

//find a user by email
const user = await findUserByEmail(body.email)

if (!user){
    return reply.code(401).send({
        message: "INVALID email or password",
    })
}




//verify password

const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
})

if (correctPassword){
    const {password, salt, ...rest}= user;

    return{accessToken: server.jwt.sign(rest)};
}

return reply.code(401).send({
    message: "INVALID email or password",});


   
}

//list users
export async function getUsersHandler(){
    const users = await findUsers();

    return users;
}

//delete user
export async function deleteUsersHandler(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    
    try {
        await deleteUserById(id);
        reply.code(200).send({ message: "User deleted successfully" });
    } catch (error) {
        reply.code(500).send({ message: "Failed to delete user" });
    }
}

//update user by id :

export async function updateUserHandler(request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserInput }>, reply: FastifyReply) {
    const { id } = request.params;
    const { name, email } = request.body;
    
    try {
        const updatedUser = await updateUserById(id, { name, email });
        reply.code(200).send(updatedUser);
    } catch (error) {
        reply.code(500).send({ message: "Faileeeed to update user" });
    }
}