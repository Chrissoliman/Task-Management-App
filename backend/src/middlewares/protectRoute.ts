import { NextFunction, Request, Response,  } from "express"
import jwtpkg from "jsonwebtoken"
import { ObjectId } from "mongoose"
import User from "../models/User"

interface JwtPayload {
    userId: ObjectId;
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.jwt

        if(!token) {
           return res.status(401).json({error: 'Unauthorized: No token provided'})
        }

        const decoded = jwtpkg.verify(token, process.env.JWT_SECRET as string) as JwtPayload

        if(!decoded) {
            return res.status(401).json({error: 'Unauthorized: Invalid Token'})
        }

        const user = await User.findById(decoded.userId).select('-password')

        if(!user) {
            return res.status(401).json({error: 'User not found'})
        }

        res.locals.user = user
        next()
    } catch (error: any) {
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}