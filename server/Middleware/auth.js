const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

exports.auth = async (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        console.log("Unauthorized")
        return (
            res.status(401).json({ message: "Unauthorized" })
        )
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userName = decoded.userName; // สมมติว่า token มีฟิลด์ userName
        next();
    }catch(err){
        console.log("Invalid token")
        res.status(401).json({ message: "Invalid token" })
    }
};