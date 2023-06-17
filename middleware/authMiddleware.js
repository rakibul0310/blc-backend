// const jwt = require("jsonwebtoken");
const { verify_jwt } = require("../config/generateToken.js");
const User = require("../models/userModel.js");

   const   verifyJWT= async(req, res, next)=> {
        if (typeof req.headers['authorization'] === 'undefined') {
          res.status(401).send({
            error: {
              message: "Not authorized, cannot find token",
            }})
        } else {
            let token = req.headers['authorization'];
            let decoded = verify_jwt(token);
            if(decoded.status) {
                req.auth = decoded.data;
                next();
            }else{
              res.status(401).send({
                error: {
                  message: "Unauthorized access",
                }})
            }
        }
    }

    const verifyAdmin = async(req, res, next)=> {
        try {
            const requester = req.auth.id;
            const requesterAccount = await User.findOne({ user_id: requester });
          if (requesterAccount?.role === 'admin') {
            next();
          }
          else {
            res.status(401).send({
              error: {
                message: "Not authorized, token failed",
              }
            });
          }
        
        } catch (e) {
          res.status(401).send({
            error: {
              message: e.message,
            }
          });
        }
    }

    const verifyUser = async(req, res, next)=> {
        try {
            const requester = req.auth.id;
            const requesterAccount = await User.findOne({ user_id: requester });
          if (requesterAccount?.role === 'user') {
            next();
          }
          else {
            res.status(401).send({
              error: {
                message: "Not authorized, token failed",
              }
            });
          }
        
        } catch (e) {
          res.status(401).send({
            error: {
              message: e.message,
            }
          });
        }
    }


module.exports = { verifyJWT, verifyAdmin, verifyUser };