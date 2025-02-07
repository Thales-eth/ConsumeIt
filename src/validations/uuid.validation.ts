import { validate as uuidValidate } from 'uuid';

export const uuidValidation = (uuid: string) => {
	if (!uuid) throw new Error('UUID is required');
	if (!uuidValidate(uuid)) throw new Error('Invalid UUID');
};
