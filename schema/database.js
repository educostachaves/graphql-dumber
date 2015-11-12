function StudyPlan(id, name, urlTitle, description) {
  this.id = id.toString()
  this.name = name
  this.urlTitle = urlTitle
  this.description = description
}

function Module(id, name, description, studyPlanId) {
  this.id = id.toString()
  this.name = name
  this.description = description
  this.studyPlanId = studyPlanId.toString()

}

var studyPlans = [
  new StudyPlan(1, 'Matemática', 'matematica','Matemática para todos'),
  new StudyPlan(2, 'Português', 'portugues','Português para todos'),
  new StudyPlan(3, 'História', 'historia','História para todos')
]

var modules = [
  new Module(1,'Algebra','Um pouco mais sobre Algebra',1),
  new Module(2,'Matriz','Um pouco mais sobre Matriz',1),
  new Module(3,'Logarítmo','Um pouco mais sobre Logaritmo',1),
  new Module(4,'Concordância','Um pouco mais sobre Concordância',2),
  new Module(5,'Sujeito e Predicado','Um pouco mais sobre Sujeito e Predicado',2),
  new Module(6,'Tempos verbais','Um pouco mais sobre Tempos Verbais',2),
  new Module(7,'Colonização Portuguesa','Um pouco mais sobre a Colonização Portuguesa',3),
  new Module(8,'Guerra dos Farrapos','Um pouco mais sobre a Guerra dos Farrapos',3),
  new Module(9,'Independência do Brasil','Um pouco mais sobre a Independência do Brasil',3),
]

module.exports = {
  StudyPlan: StudyPlan,
  Module: Module,
  getStudyPlan: function(id) { return studyPlans.filter(function(s) { return s.id == id })[0] },
  getMathStudyPlan: function() { return studyPlans[0] },
  getAllStudyPlan: function() { return studyPlans },
  getModule: function(id) { return modules.filter(function(m) { return m.id == id })[0] },
  getModulesByStudyPlan: function(studyPlanId) { return modules.filter(function(m) { return m.studyPlanId == studyPlanId }) },
}
