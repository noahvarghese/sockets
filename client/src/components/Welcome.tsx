import React from "react";

const Welcome = () => {
	return (
		<div className="text-center">
			<h1 className="w-fill text-center">Welcome</h1>
			<h2>Are You A Teacher Or Student?</h2>
			<ul>
				<li>
					<button>Teacher</button>
				</li>
				<li>
					<button>Student</button>
				</li>
			</ul>
		</div>
	);
};

export default Welcome;
