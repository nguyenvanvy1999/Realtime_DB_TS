export function getAge(DOB: string): number {
	const today = new Date();
	const birthDate = new Date(DOB);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

export function getTime(): string {
	const today = new Date();
	const date = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear();
	const time = today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
	const dateTime = date + '_' + time;
	return dateTime;
}
