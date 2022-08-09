import verifyAuthToken from '../../middlewares/verifytoken';
import { Router } from 'express';
import {
    index,
    show,
    create,
    update,
    deleteUser,
    authenticate,
} from '../../handlers/users';

const userApi = Router();

userApi.get('/', verifyAuthToken, index);
userApi.get('/:id', verifyAuthToken, show);
userApi.post('/', create);
userApi.put('/:id', verifyAuthToken, update);
userApi.delete('/:id', verifyAuthToken, deleteUser);
userApi.post('/login', authenticate);

export default userApi;
