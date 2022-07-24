export const formatDate = (date) => {
	const d = new Date(date);
	if (Number.isNaN(d)) return "N/A";
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [day, month, year].join("-");
};

export const formatNumber = (num, point = 2) => {
	const formats = String(num);
	if (Number.isNaN(num)) return 0;
	const toFixed = Number.parseFloat(num).toFixed(point);
	const second = String(toFixed).split(".")[1];
	const first = formats.split(".")[0];
	const third = new Intl.NumberFormat().format(Number(first));
	return `${third}.${second}`;
};

export const convertDateToIso = (dateStr) => {
	const date = new Date(dateStr);
	return date.toISOString();
};

export const isEmpty = (obj) => {
	if (obj && Object.entries(obj).length === 0) return true;
	return false;
};

export const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

export const sum = (obj, prop) => {
	return obj.reduce((item, acc) => item + Number(acc[prop]), 0);
};

export const getDateXDaysAgo = (numOfDays, date = new Date()) => {
	const daysAgo = new Date(date.getTime());

	daysAgo.setDate(date.getDate() - numOfDays);

	return daysAgo;
};

export const getDateXDaysFromNow = (numOfDays, date = new Date()) => {
	const daysAgo = new Date(date.getTime());

	daysAgo.setDate(date.getDate() + numOfDays);

	return daysAgo;
};
export const addMinutes = (minutes, date = new Date()) => {
	return new Date(date.getTime() + minutes * 60000);
};

export const addSeconds = (seconds, date = new Date()) => {
	return new Date(date.getTime() + seconds * 1000);
};

export const numberFormatter = (number, float = 2) => {
	if (number) {
		if (Number.isInteger(Number(number))) {
			return Number(number).toLocaleString("en-US");
		}

		if (!Number.isInteger(Number(number))) {
			return Number(number).toLocaleString("en-US", {
				maximumFractionDigits: float,
				minimumFractionDigits: float,
			});
		}
		return number;
	}
	return "";
};

export const discountCalculator = (originalPrice, discountPrice) => {
	const discount =
		(Number(originalPrice) - Number(discountPrice)) / Number(originalPrice);
	return discount * 100;
};
