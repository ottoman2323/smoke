const express = require('express')
const router = express.Router();



router.post('/', (req, res)=>{
   try {
      req.session.destroy()
      return res.json({
         state:true,
         message:'Çıkış yapıldı'
      })
   } catch (error) {
      console.log(error)
      return res.json({
         state:false,
         message:'bir hata oluştu'
      })
   }
})



module.exports = router