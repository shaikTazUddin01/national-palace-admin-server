import { Auth } from '../module/Auth/auth.model';
import { IAuth } from '../module/Auth/auth.interface';


export async function createAdminIfNotExists() {
    const adminExists = await Auth.findOne({ role: 'Admin' });

    if (!adminExists) {
        const adminData: IAuth = {
            name: 'admin',
            email: 'admin@gmail.com',
            number: 1234567890,
            address:'Jessore,Bangladesh',
            password: '123456',
            role: 'Admin',
        };


        
        await Auth.create(adminData);
      
    } 
}