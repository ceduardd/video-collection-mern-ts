import { Router } from 'express';
const router = Router();

import * as videosCtrl from '../controllers/videos.controller';

router.get('/', videosCtrl.getVideos);
router.post('/', videosCtrl.createVideo);
router.get('/:videoId', videosCtrl.getVideo);
router.put('/:videoId', videosCtrl.updateVideo);
router.delete('/:videoId', videosCtrl.deleteVideo);

export default router;
