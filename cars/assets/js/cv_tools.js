function collectAllSkills() {
	var az_skills = new Array();

	for (var i = 0; i < artem_zaborskiy_cv.positions.length; i++) {

		var pos = artem_zaborskiy_cv.positions[i];

		collectSkills(pos.platforms, "platforms", az_skills);
		collectSkills(pos.technologies, "technologies", az_skills);
		collectSkills(pos.tools, "tools", az_skills);
		collectSkills(pos.paradigms, "paradigms", az_skills);
	}

	return az_skills;
}

function calculateDurations() {
	var start = new Date();
	var years = (1000 * 60 * 60 * 24 * 365.0);
	var totalDuration = Math.abs((start.getTime() - artem_zaborskiy_cv.start)) / years;

	for (var i = 0; i < artem_zaborskiy_cv.positions.length; i++) {

		var pos = artem_zaborskiy_cv.positions[i];

		var timeDiff = Math.abs(pos.start - pos.stop) / years;
		// pos.duration = timeDiff;
		pos.startPercent = 100 * Math.abs((pos.start - artem_zaborskiy_cv.start) / years) / totalDuration;
		pos.durationPercent = 100 * timeDiff / totalDuration;
	}
}

// artem_zaborskiy_cv.duration

function collectSkills(project, skillType, az_skills) {
	if (project) {

		for (var skill = 0; skill < project.length; skill++) {
			var name = project[skill];
			var obj = az_skills[name];
			if (obj) {
				obj.count++;
			} else {
				az_skills[name] = {
					name : name,
					count : 1,
					skillType : skillType
				}
			}

		}
	}
}
