interface info {
	name: String;
	role: String;
	server: String;
}
interface question {
	type: String;
	time: Number;
	score: Number;
	matching: matching;
	multipleChoice: mc;
}

interface mc {
	question: String;
	answers: String[];
}

interface matching {
	properties: String[];
	vals: String[];
}

interface state {
	info: info;
	question: question;
}

export default state;
