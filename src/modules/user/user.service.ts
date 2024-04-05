import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function CreateUser(input: CreateUserInput){

    const{password, ...rest } = input;
    const {hash, salt} = hashPassword(password)
    
    const user = await prisma.user.create({


    data: { ...rest, salt, password: hash},
})
return user;
}


export async function findUserByEmail(email: string ){

return prisma.user.findUnique({

    where:{
        email,
    },
});
}

export async function findUsers(){

    return prisma.user.findMany({

        select:{
email: true,
name:true,
id:true
        }}
    );
}


// delete user by id
export async function deleteUserById(id: string) {
    return prisma.user.delete({
        where: {
            id
        }
    });
}


//update user by id :

export async function updateUserById(id: string, data: { name?: string, email?: string }) {
    return prisma.user.update({
        where: {
            id
        },
        data
    });
}