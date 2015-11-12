function StudyPlan(id, name) {
  this.id = id.toString()
  this.name = name
}

function Module(id, studyPlanId, name) {
  this.id = id.toString()
  this.studyPlanId = studyPlanId.toString()
  this.name = name
}

var studyPlans = [
  new StudyPlan(1, 'Matemática')
]

var modules = [
  new Module(1, 1, 'Algebra'),
  new Module(2, 1, 'Matriz'),
  new Module(3, 1, 'Logarítmo'),
]

module.exports = {
  StudyPlan: StudyPlan,
  Module: Module,
  getStudyPlan: function(id) { return studyPlans.filter(function(s) { return s.id == id })[0] },
  getMathStudyPlan: function() { return studyPlans[0] },
  getModule: function(id) { return modules.filter(function(m) { return m.id == id })[0] },
  getModulesByStudyPlan: function(studyPlanId) { return modules.filter(function(m) { return m.studyPlanId == studyPlanId }) },
}
