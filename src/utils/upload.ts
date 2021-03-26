import util from 'util';
import Multer from '../configs/multer';
const upload = Multer.upload;

const uploadMany = upload.array('files', 10);
export const uploadUtil = util.promisify(uploadMany);
