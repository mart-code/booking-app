'use server'
import { createAdminClient } from "@/config/appwrite"
import { ID } from "node-appwrite"

async function createUser(previousState){
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if(!email || !name || !password){
        return {
            error: 'Please fill all fields'
        }
    }

    if (password.length < 0){
        return {
            error: 'Password must be at least 8 characters long'
        }
    }

    if(password !== confirmPassword){
        return {
            error: "Passwords don't match"
        }
    }

    const {account} = await createAdminClient();
    try{
        //Create User
        await account.create(ID.unique(), email, password, name)

        return{
            success: true
        }
    }catch(error){
        console.log('Registration error: ', error);
        return{
            error: 'Could not register user'
        }
    }
}

export default createUser;