import { bcrypt , userModel , generateAccessToken , generateRefreshToken, jwt } from '../utils/import.js'
class UserController{

    
 
  getLogin(req,res){
    res.render('login')
  }

  
  getSignup(req,res){
    res.render('signup')
  }
    async postLogin(req,res){
        const username = req.body.username ? req.body.username : ""
        const password = req.body.password ? req.body.password : ""
        let response = {}
        try{
            let user = await userModel.checkEmail(username)
            if(user.length <= 0){
                response.message = `Username is not found`
                return res.json(response)
            }
            user = user[0]
            const match = await bcrypt.compare(password , user?.password)
            if (!match) {
                response.statusCode = 504;
                response.message = "Password is wrong";
                return res.status(504).json(response);
              }
              let payload = {
                id: user.id,
                role: "user",
                type: "Bearear",
                email: user.username,
                name: user.name,
              }

              const accessToken =  generateAccessToken(payload)
              const refreshToken =  generateRefreshToken({
                ...payload , type : "refreshToken"
              })

              if(!accessToken.status && !refreshToken.status){
                response.error = "SOMETHING_WENT_WRONG_TYPE";
                response.errorMessage = "SOMETHING_WENT_WRONG";
                res.statusCode = 405;
                return res.json(response);
              }
              response.tokenType = payload.type
              response.token = {
                accessToken : accessToken.token,
                refreshToken : refreshToken.token
              }
              res.cookie('token', accessToken, { httpOnly: true })
                return res.redirect(`/companies`)
              
              // return res.status(201).json(response)
        }catch(er){
            console.log(`Error in login post API : ${er}`)
            res.statusCode = 504;
            response.message = er.message;
            return res.json(response)

        }
    }

    // call this post signup API to add the user using bcrypt.js
    async postSignup(req,res){    
      let name = req.body.name ? req.body.name : ""
      let username = req.body.username ? req.body.username : ""
      let password = req.body.password ? req.body.password : ""
      let input = { name , username , password }
      
      let response = {}
      try{
          const chEmailRes = await userModel.checkEmail(username)
          if(chEmailRes.length > 0){
              response.message = `User already exists`
              return res.status(504).send(response)
          }
          let hashedPass = await bcrypt.hash(password , 10)
          let usersList = await userModel.fetchUsers()
          const user_id =  usersList.length > 0 ? usersList.length+1 : 1
          input = { ...input , _id : user_id ,  password : hashedPass , role : "user" , isdeleted : 0 , info : new Date().toISOString().split('T')[0] }
          console.log(`just below`)
          console.log(input)
          const addUserAck = await userModel.insertUser(input)
          if(!addUserAck){
              response.status = "ERROR"
              response.status.message = 'Error in signup'
              return res.status(504).send(message)
          }
          console.log(`Signup successfully : ${JSON.stringify(addUserAck)}`)
          let payload = {
              id: addUserAck._id,
              email: input.username,
              name: input.name,
              role: input.role,
              type: "Bearer",
              status: 1,
            };
            const accessToken =  generateAccessToken(payload)
            const refreshToken =  generateRefreshToken({
              ...payload , type : "refreshToken"
            })

            if(!accessToken.status && !refreshToken.status){
              response.error = "SOMETHING_WENT_WRONG_TYPE";
              response.errorMessage = "SOMETHING_WENT_WRONG";
              res.statusCode = 405;
              return res.json(response);
            }
            response.tokenType = payload.type
            response.token = {
              accessToken : accessToken.token,
              refreshToken : refreshToken.token
            }
            res.statusCode = 201;
            res.redirect('/login')
            // res.status(201).json(response)
      }catch(er){
          console.log(er.message)
      }
  }


    async logout(req,res){
      res.clearCookie('token');
      return res.redirect('/login')


    }
}

export default new UserController