const express = require('express');
const router = express();
const {join} = require('path');
const Users = require(join(__dirname, '..', 'schema', 'users.js'))


router.get('/', (req, res) => {
   try {
      if (!res.locals.user) {
         return res.redirect('/login')
      }

      return res.render('site/index')
   } catch (error) {
      console.log(error)
      return res.redirect('/login')
   }
})



router.post('/', async(req, res)=>{
   try {
      if(!res.locals.user){
         return res.redirect('/login')
      }
      let findData = await Users.find().exec()
      findData = findData.reverse()
      return res.json(findData)
   } catch (error) {
      console.log(error)
      return res.json({
         message:'hata!'
      })
   }
})

module.exports = router