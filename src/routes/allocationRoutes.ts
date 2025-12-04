import express from 'express';
import {
  getAllocations,
  getAllocationsByEmployee,
  createAllocation,
  updateAllocation,
  deleteAllocation,
  deleteEmployeeAllocations
} from '../controllers/allocationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
  .get(getAllocations)
  .post(createAllocation);

router.route('/employee/:employeeName')
  .get(getAllocationsByEmployee)
  .delete(deleteEmployeeAllocations);

router.route('/:id')
  .put(updateAllocation)
  .delete(deleteAllocation);

export default router;
