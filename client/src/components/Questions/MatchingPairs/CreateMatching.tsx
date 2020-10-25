import React from "react";
import { connect } from "react-redux";
import { setMatching } from "../../../redux/actions";
import state, { matching } from "../../InterfaceDefaults/StateProps";
import MatchingLine from "./MatchingLine";

interface CreateMatchingProps {
	matching: matching;
	setMatching: Function;
}

const CreateMatching: React.FC<CreateMatchingProps> = ({
	matching,
	setMatching,
}) => {
	console.log(matching);
	return (
		<div>
			{matching.properties.map((_, index) => (
				<MatchingLine key={index} index={index} readOnly={false} />
			))}
			<div className="btnContainer">
				<button
					className="default"
					onClick={() => {
						console.log(matching);
						let newState = {
							properties: [...matching.properties, ""],
							vals: [...matching.vals, ""],
						};
						console.log(newState);
						setMatching(newState);
					}}
				>
					Add
				</button>
				{matching.properties.length > 1 ? (
					<button
						className="secondary"
						onClick={() => {
							let newState = {
								properties: matching.properties.slice(
									0,
									matching.properties.length - 1
								),
								vals: matching!.vals.slice(0, matching.vals.length - 1),
							};
							setMatching(newState);
						}}
					>
						Delete
					</button>
				) : null}
			</div>
		</div>
	);
};

export default connect(
	(state: state) => ({
		matching: state.question.matching,
	}),
	(dispatch) => {
		return {
			setMatching: (matching) => dispatch(setMatching(matching)),
		};
	}
)(CreateMatching);
