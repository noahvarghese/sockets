import React from "react";
import { connect } from "react-redux";
import state from "../../InterfaceDefaults/StateProps";

const DisplayMatching = ({ matching }) => {
	return matching.properties.map((property, index) => (
		<div>
			<input
				type="text"
				value={property as string}
				key={index}
				readOnly={true}
			/>
			<select>
				<option></option>
				{matching.vals.map((val, index) => (
					<option key={index}>{val}</option>
				))}
			</select>
		</div>
	));
};

export default connect(
	(state: state) => ({
		matching: state.question.matching,
	}),
	(_) => ({})
)(DisplayMatching);
