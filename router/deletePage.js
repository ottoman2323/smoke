const express = require('express');
const router = express.Router()
const {join} = require('path')
const Users = require(join(__dirname, '..', 'schema', 'users.js'))


const sendMessage = (res, state, message) => {
   res.json({
      state,
      message
   })
}


router.get('/:id', async(req, res) => {
   try {
      if(!res.locals.user){
         return sendMessage(res, false, 'μη εξουσιοδοτημένη πρόσβαση!')
      }
      if(!req.params){
         return sendMessage(res, false, 'Data not sending!')
      }
      const {id} = req.params 

      if(!id){
         return sendMessage(res, false, 'Data not sending!')
      }

      const userControl = await Users.findById(id).exec();


      if(userControl === null){
         return sendMessage(res, false, 'Person not found!')
      }

       Users.findByIdAndDelete(id).then(()=>{
         return sendMessage(res, true, 'Deleted!')
      }).catch((error)=>{
         console.log(error)
         return sendMessage(res, false, 'Error!')
      })


   } catch (error) {
      console.log(error);
      sendMessage(res, false, 'hata!')
   }
})

module.exports = router