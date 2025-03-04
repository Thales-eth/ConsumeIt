import express from 'express';
import { HealthStatus } from '@controllers/health.controller';
const router = express.Router();

router.get('/', HealthStatus);

export const HealthStatusRoute = { path: '/health', router };
