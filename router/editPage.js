const express = require('express')
const router = express.Router()
const { join } = require('path')
const Users = require(join(__dirname, '..', 'schema', 'users.js'))
const {validateAFM} = require(join(__dirname, '..', 'help', 'control.js'))


// Helper method
const sendMessage = (res, state, message) => {
   res.json({
      state,
      message
   })
}


router.post('/', async(req, res) => {
   try {
      if(!res.locals.user){
         return sendMessage(res, false, 'Μη εξουσιοδοτημένη πρόσβαση!')
      }
      if (!req.body) {
         return sendMessage(res, false, 'Συμπληρώστε τα κενά πεδία!')
      }

      const { name, lastName, email, phone, taxNO, idNO, IBAN, motherName, fatherName, birthDay, address, county, city, postCode, id } = req.body

      if (!name || !lastName || !email || !phone || !taxNO || !idNO || !IBAN || !motherName || !fatherName || !birthDay || !address || !county || !city || !postCode) {
         return sendMessage(res, false, 'Συμπληρώστε τα κενά πεδία!')
      }

      if (!validateAFM(taxNO)) {
         return sendMessage(res, false, 'Ο ΑΦΜ δεν είναι σωστός!')
      }

      if(id.length !== 24){
         return sendMessage(res, false, 'Το άτομο δεν βρέθηκε!')
      }

      const userControl = await Users.findById(id).exec();

      if(userControl === null){
         return sendMessage(res, false, 'Το άτομο δεν βρέθηκε!')
      }

      Users.findByIdAndUpdate(id, {
         $set:{
            ...req.body
         }
      }).then(()=>{
         return sendMessage(res, true, 'Η επαφή ενημερώθηκε με επιτυχία 🎉')
      }).catch((err)=>{
         console.log(err);
         return sendMessage(res, false, 'Κάτι πήγε στραβά!')
      })

   } catch (error) {
      console.log(error)
      return sendMessage(res, false, 'Error!')
   }
})




module.exports = router