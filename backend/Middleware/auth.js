import { User } from "../Models/User.js";
 export const authenticate = async(req,res)=>{
    try {
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
}