import axios from 'axios';

export const userLogin = () => {
    console.log('userLogin')
}

export const userApiSignup = async (name, email, password) => {
    try {
        const response = await axios.post('/user/signup', { name, email, password });
        const data = response.data;
        if (data.status !== 200) {
            throw new Error("unable to signup")
        } 
        return data;
    } catch (error) {
        console.log(error)
    } 
}

export const userApiLogin = async (name, email, password) => {
    try {
        const response = await axios.post('/user/login', { email, password });
        const data = response.data;
        if (data.status !== 200) {
            throw new Error("unable to login")
        } 
        return data;
    } catch (error) {
        console.log(error)
    } 
}