import jwt from 'jsonwebtoken'

export default function authenticateToken(req,res,next){
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET
    const user = jwt.verify(token,jwtSecret)
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json(error)
  }
}