import React from "react";
import { connect } from "react-redux";
import { setMatchingAnswers } from "../../../redux/actions";
import state from "../../InterfaceDefaults/StateProps";

const DisplayMatching = ({ matching, matchingAnswers, setMatchingAnswers }) => {
	return (
		<>
			<h3>Matching Pairs</h3>
			{matching.properties.map((property, index) => {
				return (
					<div key={index}>
						<input
							aria-label="key"
							type="text"
							value={property as string}
							key={index}
							readOnly={true}
						/>
						<select
							aria-label="values"
							onChange={(e) => {
								setMatchingAnswers(e.target.value, index);
							}}
							value={((): string => {
								return matchingAnswers[index] as string;
							})()}
						>
							<option></option>
							{matching.vals.map((val, i) => (
								<option key={i}>{val}</option>
							))}
						</select>
					</div>
				);
			})}
		</>
	);
};

export default connect(
	(state: state) => ({
		matching: state.question.matching,
		matchingAnswers: state.matchingAnswers,
	}),
	(dispatch) => ({
		setMatchingAnswers: (value, index) =>
			dispatch(setMatchingAnswers(value, index)),
	})
)(DisplayMatching);
