const trainingLocators = {
  // ---------- Navigation: Agents > Training > Manage Training ----------
  agentsTab: (page) => page.getByRole('link', { name: /^Agents/i }).first(),
  trainingMenuItem: (page) => page.locator('a[data-filter-tags="Agents Training"]').first(),
  manageTrainingMenuItem: (page) => page.locator('a[data-filter-tags="Agents Training Manage Training"]').first(),

  manageTrainingHeading: (page) => page.getByRole('heading', { name: /^Manage Training$/i }),

  // ---------- Manage Training: list & search ----------
  addProgramButton: (page) => page.getByRole('button', { name: /^Add Program$/i }).first(),
  programSearchInput: (page) => page.locator('#txtProgramSearch'),
  searchProgramButton: (page) => page.getByRole('button', { name: /^Search$/i }).first(),
  programPanel: (page) => page.locator('#dvProgramPanel'),
  programRowByName: (page, programName) => page.locator('#dvProgramPanel .card').filter({ hasText: programName }),

  // ---------- Add Program modal ----------
  addProgramModal: (page) => page.locator('#addprogram'),
  addProgramModalHeading: (page) => page.locator('#headingAddProgream'),
  programNameInput: (page) => page.locator('#txtProgramName'),
  programDescriptionInput: (page) => page.locator('#txtProgramDesc'),
  programEstimatedTimeInput: (page) => page.locator('#txtEstimateTime'),
  programStartDateInput: (page) => page.locator('#dtProgramStartDate'),
  programEndDateInput: (page) => page.locator('#dtProgramEndDate'),
  allowTopicGroupCheckbox: (page) => page.locator('#chkProgramAllowGroupCreation'),
  assessmentRequiredCheckbox: (page) => page.locator('#chkProgramIsAssessmentRequired'),
  allowDownloadCheckbox: (page) => page.locator('#chkProgramAllowDownload'),
  saveProgramButton: (page) => page.locator('#btnSaveProgram'),
  cancelProgramButton: (page) => page.locator('#addprogram button[data-dismiss="modal"]'),
};

module.exports = trainingLocators;
