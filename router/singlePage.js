const express = require('express')
const router = express()
const {join} = require('path')
const Users = require(join(__dirname, '..', 'schema', 'users.js'))



router.get('/:id', async(req, res)=>{
   try {
      if(!res.locals.user){
         return res.redirect('/login')
      }
      const {id} = req.params
      if(!id){
         return res.redirect('/error')
      }
      if(id.length !== 24){
         return res.redirect('/error')
      }


      const userControl = await Users.findById(id).exec();

      
      return res.render('site/single', {
         data:userControl.toJSON()
      });
      
   } catch (error) {
      console.log(error)
      return res.redirect('/error')
   }
})



module.exports = router