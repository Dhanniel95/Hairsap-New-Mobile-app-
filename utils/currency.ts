const numberWithCommas = (x: any) => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};

const formatCurrency = (value: any) => {
	let number = value || 0;
	return Number(number)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const formatCommas = (value: any) => {
	value = value?.toString() || "0";
	let numerics =
		value.includes(".") == true ? value.split(".") : [value, null];
	let worker = (num: any, equiv: any) => {
		num = num.split("");
		let prepend = "";
		if (num[0] == "-") {
			prepend = "-";
			num.shift();
		}
		let index = 0;
		let result = [];
		for (let i = num.length - 1; i >= 0; i--) {
			index++;
			if (index % 3 == 0) {
				result.push(num[i]);
				if (index != num.length) {
					result.push(",");
				}
			} else {
				result.push(num[i]);
			}
		}
		let number = result.reverse().join("").trim().split("");
		if (number[0] == ",") {
			number.shift();
		}
		let final = number.join("");
		if (equiv == null) {
			final = final;
		} else {
			final = final + "." + (equiv.length == 1 ? equiv + "0" : equiv);
		}
		return prepend + final;
	};
	return worker(numerics[0], numerics[1] == undefined ? null : numerics[1]);
};

export { formatCommas, formatCurrency, numberWithCommas };
