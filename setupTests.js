expect.extend({
	/**
	 * @param {*} received
	 * @param {string|string[]} arg
	 * @return {{pass:boolean,message:(function():string)}}
	 */
	toBeType(received, arg) {
		const isCorrectType = (arg) => {
			const receivedType = typeof received;

			const checkForSingle = (arg) => {
				const type = receivedType === 'object' ? (Array.isArray(received) ? 'array' : receivedType) : receivedType;

				return type === arg;
			};

			const checkForArr = (arg) => {
				const reducer = (prev, curr) => prev || isCorrectType(curr).isCorrect;

				return arg.reduce(reducer, false);
			};

			return {
				receivedType,
				isCorrect: Array.isArray(arg) ? checkForArr(arg) : checkForSingle(arg),
			};
		};

		const { isCorrect, receivedType } = isCorrectType(arg);

		return {
			pass: isCorrect,
			message: () => {
				const toBe = Array.isArray(arg) ? arg.join(`' or '`) : arg;

				return `Expected '${received}' of '${receivedType}' type to be of '${toBe}' type(s)`;
			},
		};
	},
});
