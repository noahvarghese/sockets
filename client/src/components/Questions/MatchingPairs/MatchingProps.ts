interface MatchingProps {
	addMatchingProperty?: Function;
	addMatchingValue?: Function;
	matching?: {
		property?: String;
		value?: String;
	};
	index?: Number;
	setMatching?: Function;
	readOnly: boolean | null;
}

export default MatchingProps;
