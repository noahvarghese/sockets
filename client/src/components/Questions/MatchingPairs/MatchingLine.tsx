import React, { useState } from "react";
import { setStateFromElementChange } from "../../../Util/Functions";
import MatchingProps from "./MatchingProps";
import "../../../assets/css/Matching.css";

const MatchingLine: React.FC<MatchingProps> = ({
	property,
	value,
	...props
}) => {
	const [state, setState] = useState({
		property: property,
		value: value,
	});

	return (
		<div className="MatchingPair">
			<input
				type="text"
				name="property"
				aria-label="Matching Key"
				placeholder="A"
				value={state.property as string}
				onChange={(e) => setStateFromElementChange(e, setState, state)}
			/>
			<span>=</span>
			<input
				type="text"
				name="value"
				aria-label="Matching Value"
				placeholder="B"
				value={state.value as string}
				onChange={(e) => setStateFromElementChange(e, setState, state)}
			/>
		</div>
	);
};

export default MatchingLine;
