const router = require("express").Router();
const {urlClient } = require("../../config/conn.common");
const LoginController = require("../../controllers/ath/login.ct");
const passport = require("passport");

router.post("/email", LoginController.loginEmail);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', (req,res,next)=>{
  passport.authenticate('facebook',(error ,profile)=>{
      if(error){
        console.log("error:: ",error);
        res.status(500).json({
            code: 500,
            message: error
        });
        return;
      }
      req.user = profile;
      next();
  })(req,res,next)
},LoginController.loginFacebook);
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',(req,res,next)=>{
  passport.authenticate('google',{failureRedirect: `${urlClient}/login`},(error,profile)=>{
    if(error){
      console.log("error:: ",error);
      res.status(500).json({
          code: 500,
          message: error
      });
      return;
    }
    req.user = profile;
    next();
  })(req,res,next)
}, LoginController.loginGoogle);
router.get('/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github/callback',(req,res,next)=>{
  passport.authenticate('github',{failureRedirect: `${urlClient}/login`},(error,profile)=>{
    if(error){
      console.log("error:: ",error);
      res.status(500).json({
          code: 500,
          message: error
      });
      return;
    }
    req.user = profile;
    next();
  })(req,res,next)
},LoginController.loginGithub);

router.get("/success/:id", LoginController.LoginSuccess)


module.exports =  router