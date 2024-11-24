import { jwt } from '../utils/import.js'


const generateAccessToken = (payload) => {
    try{
        const accessToken = jwt.sign( payload , process.env.JWT_access_key , {expiresIn: "2h"} )
        return { 
            token : accessToken,
            expiresIn : "2h",
            status : true
         }
    }catch(er){
        console.log(`Error in jwt access token`)
        return {
            token : "",
            status : false,
            expiresIn : '2h'
        }
    }
}
const generateRefreshToken = (payload) => {
    try{
        const refreshToken = jwt.sign( payload , process.env.JWT_refresh_key , {expiresIn : '12h'} )
        return {
            token : refreshToken,
            expiresIn : '12h',
            status : true
        }
    }catch(er){
        console.log(`Error in generte refresh token : ${er}`)
        return {
            token : "",
            expiresIn : '12h',
            status : false
        }

    }
}



const verifyAuth = async(req,res,next) => {
    let response = {}
    try{

        const token = req.cookies.token; // Access token from cookies  
        if(token === ""){
            response.status = 404
            response.message = `Token is not available`
            return res.json(response)
        }
        jwt.verify(token.token, process.env.JWT_access_key, async (error, decoded) => {
            if(error){
                response.status = 404
                response.message = `Token is not valid`
                return res.json(response)
            }
            if(decoded){
                res.locals.userData = decoded;
                req.userData = decoded;
                next()
            }else{
                response.status = 404
                response.message = `Token is invalid`
                return res.json(response)
            }
        })
    }catch(er){
        console.log(`error in auth ${er}`)
        response.status = 500
        response.message = `Internal server error`
        return res.redirect('/login')
        // return res.json(response)
    }

}

export { generateAccessToken , generateRefreshToken , verifyAuth }