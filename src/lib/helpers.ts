import bcrypt from 'bcryptjs';

async function encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function matchPassword(password: string, savedPassword: string) {
    return await bcrypt.compare(password, savedPassword).catch(e => console.log(e));
}

export default {
    matchPassword,
    encryptPassword
};
