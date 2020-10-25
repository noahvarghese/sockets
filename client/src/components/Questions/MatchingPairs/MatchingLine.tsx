import React from "react";
import "../../../assets/css/Matching.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMatchingProperty, setMatchingValue } from "../../../redux/actions";
import state, { matching } from "../../InterfaceDefaults/StateProps";

export interface MatchingProps {
	matching: matching;
	index: number;
	readOnly?: boolean;
	setProperty: Function;
	setValue: Function;
}

const MatchingLine: React.FC<MatchingProps> = ({
	matching,
	index,
	readOnly,
	setProperty,
	setValue,
}) => {
	const property = matching.properties[index];
	const val = matching.vals[index];
	return (
		<div className="MatchingPair">
			<input
				readOnly={readOnly!}
				type="text"
				name="property"
				aria-label="Matching Key"
				placeholder="A"
				value={property as string}
				onChange={(e) => {
					if (!readOnly) {
						setProperty(e.target.value, index);
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
				value={val as string}
				onChange={(e) => {
					if (!readOnly) {
						setValue(e.target.value, index);
					}
				}}
			/>
		</div>
	);
};

export default connect(
	(state: state) => ({
		matching: state.question.matching,
	}),
	(dispatch) => {
		return {
			setProperty: (property, index) =>
				dispatch(setMatchingProperty(property, index)),
			setValue: (val, index) => dispatch(setMatchingValue(val, index)),
		};
	}
)(MatchingLine);
