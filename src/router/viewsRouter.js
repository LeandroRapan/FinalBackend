import { Router } from "express";
const router = Router();

router.get('/', (req,res)=>{
    res.render('vista1')
})
router.get('/view2', (req,res)=>{
    res.render('vista2')
})
export default router