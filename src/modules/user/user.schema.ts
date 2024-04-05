import {z} from 'zod';
import {buildJsonSchemas} from 'fastify-zod'

const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'email must be a string'
        
        
            }).email(),
            name: z.string(),

}



const createUserSchema= z.object({
...userCore,

    password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
        
        
            }),
});

const createUserResponseSchema = z.object({
    id: z.string(),
    ...userCore,
});



const loginSchema = z.object({

    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'email must be a string'
        
        
            }).email(),
            password: z.string(),


});

const loginResponseSchema = z.object({

    accessToken: z.string(),
})


export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email()
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const {schemas: userSchemas, $ref}= buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    updateUserSchema
})