import jwt from "jsonwebtoken";

export const createToken = (id, email) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);
    console.log({token});
    return token;
}

// export const verifyToken = async(req,res) => {
//     const getToken = req.cookies.auth_token;
//     console.log({getToken});
// }