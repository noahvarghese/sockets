interface info {
	name: String;
	role: String;
	server: String;
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
	multipleChoice: mc;
	matching: matching;
}

export default state;
