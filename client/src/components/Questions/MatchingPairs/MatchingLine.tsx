import React, { useState } from "react";
import { setStateFromElementChange } from "../../../Util/Functions";
import MatchingProps from "./MatchingProps";
import "../../../assets/css/Matching.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMatchingProperty, addMatchingValue } from "../../../redux/actions";

const MatchingLine: React.FC<MatchingProps> = ({
	addMatchingProperty,
	addMatchingValue,
	matching,
	index,
	setMatching,
	readOnly,
	...props
}) => {
	const [state, setState] = useState({
		property:
			matching !== undefined && matching.property !== undefined
				? matching.property
				: "",
		value:
			matching !== undefined && matching.value !== undefined
				? matching.value
				: "",
	});

	console.log(state);

	return (
		<div className="MatchingPair">
			<input
				readOnly={readOnly!}
				type="text"
				name="property"
				aria-label="Matching Key"
				placeholder="A"
				value={state.property as string}
				onChange={(e) => {
					setStateFromElementChange(e, setState, state);
					if (!readOnly) {
						addMatchingProperty!(state.property);
						setMatching!({ property: e.target.value, val: state.value }, index);
					}
				}}
			/>
			<span>=</span>
			<input
				readOnly={readOnly!}
				type="text"
				name="value"
				aria-label="Matching Value"
				placeholder="B"
				value={state.value as string}
				onChange={(e) => {
					if (!readOnly) {
						setStateFromElementChange(e, setState, state);
						addMatchingValue!(state.value);
						setMatching!(
							{ property: state.property, val: e.target.value },
							index
						);
					}
				}}
			/>
		</div>
	);
};

export default connect(
	(state) => state.question.matching,
	(dispatch) =>
		bindActionCreators(
			{
				addMatchingProperty: addMatchingProperty,
				addMatchingValue: addMatchingValue,
			},
			dispatch
		)
)(MatchingLine);
