  import { Router } from 'express';

  import {
    createMachine,
    deleteMachine,
    getMachines,
    updateMachine
  } from '../controllers/machines.controller.js';

  import { requireAdmin } from '../middleware/auth.middleware.js';

  const router = Router();

  router.get('/', getMachines);

  router.post('/', requireAdmin, createMachine);

  router.patch('/:id', requireAdmin, updateMachine);

  router.delete('/:id', requireAdmin, deleteMachine);

  export default router;