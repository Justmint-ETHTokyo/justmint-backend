import { Router } from 'express';
import auth from '../middlewares/auth';
import { userController } from '../controllers';
import { body, query } from 'express-validator';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.get('/profile', auth, userController.getUserInfo);

router.get('/quest', auth, userController.getQuestInfo);
router.patch('/quest', auth, userController.updateQuestInfo);
router.patch(
  '/secret',
  [body('secret').isString().notEmpty()],
  errorValidator,
  auth,
  userController.updateSecret,
);
router.get('/wallet', auth, userController.getWalletInfo);
router.get(
  '/justmint',
  [query('address').isString().notEmpty()],
  errorValidator,
  userController.checkWallet,
);

router.get('/aaWallet', errorValidator, auth, userController.createWalletOp);
router.post(
  '/aaWallet',
  [body('createOpWithSign').notEmpty()],
  auth,
  userController.handleWalletOp,
);

export default router;
