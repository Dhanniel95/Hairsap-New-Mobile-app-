const numberWithCommas = (x: any) => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};

const formatCurrency = (value: any) => {
	let number = value || 0;
	return Number(number)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export { formatCurrency, numberWithCommas };
