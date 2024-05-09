const express = require('express');
const router = express();
const { join } = require('path');
const Admin = require(join(__dirname, '..', 'schema', 'admin.js'))

const sendMessage = (res, state, message) => {
   res.json({
      state,
      message
   })
}


router.get('/', (req, res) => {
   try {
      if (res.locals.user) {
         return res.redirect('/')
      }

      return res.render('site/login')
   } catch (error) {
      console.log(error)
      return res.redirect('/login')
   }
})

router.post('/', async(req, res) => {
   try {
      if (res.locals.user) {
         return res.redirect('/')
      }

      if (!req.body) {
         return sendMessage(res, false, 'Συμπληρώστε τα κενά πεδία!')
      }

      const {password} = req.body

      if (!password) {
         return sendMessage(res, false, 'Συμπληρώστε τα κενά πεδία!')
      }

      const adminControl = await Admin.find({password}).exec();

      if(adminControl.length === 0){
         return sendMessage(res, false, 'Λάθος Κωδικός')
      }

      let ID = await adminControl[0]._id
      ID = String(ID)
      req.session.userID = ID

      return sendMessage(res, true, 'Επιτυχής σύνδεση 🎉')


   } catch (error) {
      console.log(error)
      return sendMessage(res, false, 'Error!')
   }
})

module.exports = router