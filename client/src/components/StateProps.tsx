interface info {
	name: String;
	role: String;
	server: String;
}
interface quizInfo {
	time: Number;
	score: Number;
	type: String;
}
interface question {
	info: quizInfo;
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
