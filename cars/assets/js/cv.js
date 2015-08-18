var artem_zaborskiy_cv = {

	start : Date.parse("1 August, 2000"),

	contactInfo : {
		location : "St. Petersburg",
		locationLast : "Koh Samui",
		skype : "entity001",
		phone : "+79217531866",
		email : "zaborskiy@protonmail.ch",
		links : [ {
			href : "https://www.facebook.com/zaborskiy",
			name : "facebook.com/zaborskiy",
			iconClass : "az-social-facebook",
		}, {
			href : "https://th.linkedin.com/in/zaborskiy",
			name : "th.linkedin.com/in/zaborskiy",
			iconClass : "az-social-linkedin",
		}, {
			href : "http://www.zaborskiy.org",
			name : "www.zaborskiy.org",
			iconClass : "az-az-logo",
		} ]
	},

	env : "Mac OS, Win, Eclipse, IDEA, Jira, SVN, Perforce",
	summary : "Artem is a Java/Web developer who will always appreciate how IT and science makes the world better. "
			+ "Artem has strong skills in server-side development, UI/UXD, "
			+ "data visualization and analysis, machine learning and predictive analytics.",

	education : [ {
		start : Date.parse("1 September, 1998"),
		stop : Date.parse("1 June, 2000"),
		speciality : "Architect",
		faculty : "Architecture",
		name : "St. Petersburg State University of Architecture and Civil Engineering"
	}, {
		start : Date.parse("1 September, 1995"),
		stop : Date.parse("1 June, 1997"),
		speciality : "Mathematics, Computer Science",
		faculty : "Faculty of Mathematics and Mechanics",
		name : "St. Petersburg State University"
	}, {
		start : Date.parse("1 September, 1993"),
		stop : Date.parse("1 June, 1995"),
		speciality : "Mathematics, Physics, Programming",
		activities : "Computer Graphics, Artificial Intelligence",
		name : "St. Petersburg Physics & Mathematics Lyceum(former school 239)"
	} ],

	positions : [

			{
				start : Date.parse("15 Nov, 2014"),
				stop : new Date(),
				position : "web developer",
				employer : "home",
				customer : "skill2peer",
				project : "skill2peer is an web site for course publishing and registration",
				employerUrl : "http://www.zaborskiy.org/",

				achievments : [ "Designed the entire system architecture",
						"UI/UX prototyping, design and implementations, using AngularJS, HTML and CSS",
						"With Liquibase and Hibernate/JPA, designed the DB and DAO layer",
						"Using Confluence, has provided technical documentaion",
						"Wrote event/calendar management core",
						"Using Spring Social, implemented Login with Twitter and Facebook",
						"Has designed REST API for posting and fetching events and courses data" ],

				technologies : [ "Spring Framework", "Spring Security", "Hibernate", "ehCache", "AngularJS","LESS",
						"Spring Boot", "Liquibase", "Dozer mapper", "JUnit", "DBUnit", "Mockito" ],
				tools : [ "Eclipse", "Jira", "Jenkins", "Sonar", "git", "Confluence", "Maven" ],
				paradigms : [ "REST", "Open Source", "AOP", "OOP" ],
				teamSize : "1 - 3",
				platforms : [ "Heroku", "Tomcat", "Android", "GitHub" ],
				process : "Agile",
				reference : "https://github.com/compartia/skill2peer"
			},

			{
				start : Date.parse("1 March, 2013"),
				stop : Date.parse("21 February, 2015"),
				position : "Lead Java Developer",

				employer : "Return on Intelligence",
				employerDescr : "former Exigen Services",
				employerUrl : "http://www.returnonintelligence.com/",

				process : "Scrum",
				customer : "Carpathia",
				projectUrl : "http://carpathia.com/",
				project : "Carpathia hosting. Inventory management for a large hosting provider.",
				respons : [ "Requirements elicitation and analysis", "Technical design",
						"Business components development", "DB design" ],
				technologies : [ "Spring Framework", "Spring Security", "Hibernate", "ehCache", "AngularJS", "jQuery",
						"Liquibase", "REST", "Dozer mapper", "JUnit", "DBUnit", "Mockito" ],
				tools : [ "Eclipse", "Jira", "Jenkins", "Sonar", "SVN", "Confluence", "Maven" ],
				teamSize : "14 - 30",
				platforms : [ "PostgreSQL", "Tomcat" ],
				paradigms : [ "AOP", "TDD", "BDD", "SDLC", "REST" ]
			},

			{
				start : Date.parse("1 January, 2006"),
				stop : Date.parse("1 December, 2006"),
				position : "Developer / Project owner",

				employer : "home",

				customer : "LjMap.net",
				project : "Own, non-profit effort in Gravitational Sociology and Geographical Semantics, "
						+ "web-visualization and analysis of e-societies. "
						+ "The aim was to find and to visualize clusters of users in social networks like LiveJournal",
				achievments : [ "Idea, research", "Created Google Map-like web-interface",
						"Implemented web crawler for fetching, storing and indexing FOAF data",

						"Math: created the engine for clusterization of 10M+ data records",
						"Optimized heavy calculations on huge amount of data" ],
				technologies : [ "Java", "CSS", "JavaScript", "Servlets/JSP", "JDBC", "Ajax" ],
				teamSize : "2 - 4",
				platforms : [ "Tomcat", "Linux", "Resin", "PostgreSQL" ],
				paradigms : [ "Neural Networks", "Social Networking", "Big Data", "Data Visualization" ]
			},

			{
				start : Date.parse("1 August, 2000"),
				stop : Date.parse("1 April, 2003"),
				position : "Java Developer",

				employer : "NeMo (Neural Modeling)",

				process : "Agile",
				customer : "Outsell, LLC (U.S.)",
				project : "KIBERRY: Building Neural networks based Interactive Virtual Representatives; Web-based dialogue scenarios editor UI.",
				achievments : [ "Designed the product architecture",
						"Led negotiations with U.S. partner companies including Outsell, LLC",
						"Neural Core design and implementation",
						"Has created online dialogue schema editor for designing domain-specific chat bots",
						"Provided technical documentation",
						"Has designed and prototyped the 3D-representation for complex neural networks systems",
						"Designed the KIBERRY brand, the logo and the website" ],
				technologies : [ "JavaScript", "Java", "Applets", "XML", "XSLT", "SWING", "AWT", "JDBC",
						"Servlets/JSP", "C++", "JNI" ],
				teamSize : "4 - 12",
				platforms : [ "Apache", "Tomcat", "Linux", "MySQL" ],

				paradigms : [ "Neural Networks", "Petri net", "AI", "Machine Learning" ]

			},

			{

				start : Date.parse("1 March, 2011"),
				stop : Date.parse("1 March, 2013"),

				position : "Lead Developer",
				employer : "Exigen Services",

				employerUrl : "http://www.returnonintelligence.com/",
				customer : "Thompson Reuters, InPublic/MMI",
				process : "Scrum",
				project : "InPublic/MMI: A JEE web app for Thompson Reuters. The app provides functionality to publish and distribute press releases.",
				respons : [ "Requirements collecting and analysis", "Technical design",
						"Planning and tasks distribution, reporting, peer review, code review",
						"Business components development" ],
				technologies : [ "JEE", "Spring Framework", "Hibernate", "JSF", "GWT", "RichFaces", "Liquibase",
						"Lucene", "JUnit", "CSS", "JavaScript", "WSDL" ],
				tools : [ "Eclipse", "Jira", "TeamCity", "Jenkins", "Sonar", "Perforce", "Maven" ],
				achievments : [ "Has developed the architecture and the framework for the MMI system",
						"Implemented cross-browser UI for MMI using GWT",
						"Integrated with Facebook, LinkedIn, and Twitter.",
						"Developed business components for composing and publishing press releases." ],
				platforms : [ "WebLogic", "OC4J", "Oracle", "SDLC", "REST" ],
				teamSize : "7 - 10",

			},

			{
				featured : "true",
				customer : "http://www.heritagehealthprize.com/c/hhp",
				projectUrl : "http://www.heritagehealthprize.com/c/hhp",
				project : "Heritage Health Prize Competition: to create an algorithm that predicts"
						+ " how many days a patient will spend in a hospital in the next year.",
				start : Date.parse("4 April, 2011"),
				stop : Date.parse("15 April, 2013"),
				achievments : [
						"Has developed the algorithm to identify patients who will be admitted to a hospital"
								+ " within the next year using historical claims data",
						"Has developed own high performant library of machine learning (classification and clustering) "
								+ "algorithms such as Gentle and Ada Boosting, Random Forests, K-Means, Kohonen Networks, Neural Networks, " ],
				awards : "top 10% (116th of 1353)",
				reference : "https://www.kaggle.com/zaborskiy/results"
			},

			{
				start : Date.parse("1 August, 2010 "),
				stop : Date.parse("1 March, 2011"),

				position : "Project Manager",
				employer : "Exigen Services",
				employerDescr : "acquired by Return on Intelligence",
				employerUrl : "http://www.returnonintelligence.com/",
				customer : "T-Mobile, DE",
				project : "eCare --//-- see below",

				respons : [ "Requirements analysis", "Planning and tasks distribution, time tracking, reporting",
						"Interaction with Germany based business analysts",
						"Staffing, team skills development, career development of employees. Coaching and organizing educational activities" ],
				process : "Waterfall",
				tools : [ "MS Project", "Jira" ],
				teamSize : "15 - 25"
			},

			{
				featured : "true",
				start : Date.parse("9 Jan, 2008"),
				stop : Date.parse("1 August, 2010"),

				position : "Lead Java Developer",
				employer : "Exigen Services",
				employerDescr : "acquired by Return on Intelligence",
				employerUrl : "http://www.returnonintelligence.com/",
				customer : "T-Mobile, DE",
				project : "eCare. A distributed JEE app for T-Mobile (DE). The app provides functionality to manipulate customer’s contract data and tariff plans. The services are accessible from web and via web services (B2B SOA interface). One of the challenging things was integration with the number of partner systems.",

				respons : [ "Requirements analysis", "Technical designs",
						"Planning and tasks distribution, tracking, reporting", "Business components development",
						"Interaction with business analysts located in Germany",
						"Staffing, team members skills development" ],

				achievments : [
						"Has built a number of components for a distributed JEE app for T-Mobile (DE), "
								+ "providing functionality for manipulating customer contract data and tariff plans",
						"Developed B2B SOA interfaces", "Integrated with approximately 30 partner systems",
						"Has built the framework for generating PDF reports using iText" ],
				tools : [ "Eclipse", "ClearCase", "Clear DDTS", "Jira", "Checkstyle", "FindBugs", "Sonar", "Hudson",
						"SoapUI" ],
				technologies : [ "JEE", "Spring Framework", "Hibernate", "Axis", "CXF", "XFire", "WSDL", "iText" ],
				platforms : [ "WebLogic", "Oracle" ],
				awards : "2008: Exigen, Best Technical Lead of the year",
				process : "Waterfall",
				teamSize : "15 - 25",
				paradigms : [ "Web Services", "ESB", "OOP", "SOA", "EIP", "SDLC" ]
			},

			{
				start : Date.parse("1 September, 2009"),
				stop : Date.parse("1 September, 2012"),

				position : "Java Developer",
				employer : "youdowell AG",
				employerUrl : "http://www.youdowell.com/",

				customer : "youdowell",
				project : "An online coach for a healthy lifestyle and menu planning",

				achievments : [
						"Designed the system architecture and the system backbone",
						"Consulted on UI and usability",
						"With GWT, developed the back-office application, allowing users to edit recipes and nutrition data",
						"Designed and implemented a number of reusable UI components",
						"Wrote DAOs using Hibernate and EclipseLink" ],
				technologies : [ "Java", "GWT", "Spring Framework", "Lucene", "Compass Search", "EclipseLink",
						"Hibernate" ],
				tools : [ "Maven", "Sonar", "Bamboo" ],
				platforms : [ "PostgreSQL", "MySQL", "Tomcat" ]
			},

			{
				start : Date.parse("1 June, 2008"),
				stop : Date.parse("1 September, 2008"),

				position : "Lecturer",
				employer : "Exigen Services",
				employerUrl : "http://www.returnonintelligence.com/",

				customer : "IT-college",

				achievments : [ "Provided lectures on Java to groups of 20 students" ],
				technologies : [ "Java" ]
			},

			{
				start : Date.parse("1 September, 2008"),
				stop : Date.parse("1 October, 2009"),

				project : "TestBuilder is a web application for designing, publishing and taking quizzes, questionnaires and exams online. "
						+ "The system supports 2 user groups: those who create exams and those who take exams.",
				position : "Project Owner, Developer",
				employer : "home",
				customer : "TestBuilder",

				respons : [
						"Idea and Concepts; Full cycle management; Building the team",
						"System architecture; Technical documentation and user’s guide writing; UI design and code (GWT, CSS); DB design",
						"Public relations, presentations for seed investments" ],

				achievments : [ "Designed and built the entire UI using GWT, HTMl and CSS",
						"Integrated with Facebook, Google gadgets and Google AppEngine",
						"Has built the framework for generating PDF certificates using iText" ],

				technologies : [ "Spring Framework", "JPA", "Hibernate", "Lucene", "Hibernate Search", "GWT",
						"SmartGWT", "iText", "JUnit" ],
				platforms : [ "PostgreSQL", "Tomcat", "Apache" ],
				paradigms : [ "IoC", "AOP", "CI" ],
				tools : [ "SVN", "Cruise control", "Eclipse", "Ant", "Maven", "Track", "Spring Roo" ],

				teamSize : "2 - 6",
				process : "Scrum"

			},

			{
				start : Date.parse("1 September, 2013"),
				stop : Date.parse("1 July, 2015"),

				// employer : "home",
				// employerUrl : "http://www.zaborskiy.org/",

				project : "Color Collection is a native application for Android. It processes images to extract most used colors.",
				projectUrl : "https://play.google.com/store/apps/details?id=org.az.clr",
				position : "Android Developer, Project Owner",

				customer : "Color Collection",

				respons : [ "Idea, UI/UX Design", "System architecture", "Development" ],
				technologies : [ "CSS", "Java", "Servlets/JSP", "Android API" ],
				platforms : [ "Android", "GitHub", "Heroku" ],
				tools : [ "git", "Maven", "Gradle", "Android Studio" ],
				paradigms : [ "Open Source" ],
				// teamSize : "1",
				achievments : [ "Tens of thousands of installations" ]

			}

	]
};
