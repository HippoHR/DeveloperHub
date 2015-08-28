describe('job-widget', function() {
  // Object containing all the form fields
  var formFields = {};

  // Object containing all the parameters for the URL
  var params = {
    s: 'vakken vullen',
    p: 'Amsterdam',
    rad: '50',
    r: 'randstad',
    l: '10',
    w: '550'
  };

  // Container div for testing
  var containerTestDiv;

  // Job widget and all its parameters
  // Create a mock uri object and give it to a new jobWidget
  var uriWithParams = createUri(params),
    jobWidget = new JobWidgetForm(uriWithParams),
    scriptUrl = 'http://www.uitzendbureau.nl/tools/vacaturewidget?' + URI.buildQuery(params);

  beforeEach(function() {
    // Prepare the document with a test container
    containerTestDiv = createDOMElement('div', {id: 'testdiv'});
    document.body.appendChild(containerTestDiv);
  });

  afterEach(function() {
    document.body.removeChild(containerTestDiv);
  });

  describe('loadFromUrl', function() {
    it('should get all parameters from the url', function() {
      jobWidget.loadFromUrl();
      expect(jobWidget.recruiter).toEqual(params.r);
      expect(jobWidget.search).toEqual(params.s);
      expect(jobWidget.place).toEqual(params.p);
      expect(jobWidget.radius).toEqual(params.rad);
      expect(jobWidget.nrOfJobs).toEqual(params.l);
      expect(jobWidget.width).toEqual(params.w);
    });

    it('should use empty variables if URL has no parameters', function() {
      var uriWithoutParams = createUri();
      var jobWidgetWithoutParams = new JobWidgetForm(uriWithoutParams);
      jobWidgetWithoutParams.loadFromUrl();
      expect(jobWidgetWithoutParams.recruiter).toEqual('');
      expect(jobWidgetWithoutParams.search).toEqual('');
      expect(jobWidgetWithoutParams.place).toEqual('');
      expect(jobWidgetWithoutParams.radius).toEqual('');
      expect(jobWidgetWithoutParams.nrOfJobs).toEqual('');
      expect(jobWidgetWithoutParams.width).toEqual('');
    });
  });

  describe('fillTheForm', function() {
    /**
     * Test to check if all the form field get filled by the parameters from the URL.
     * Recruiter is excluded from this test. Due to network request
     */
    it('should fill the form with the url params', function() {
      createForm();
      jobWidget.loadFromUrl();
      jobWidget.fillTheForm();
      expect(formFields.search.value).toEqual(params.s);
      expect(formFields.place.value).toEqual(params.p);
      expect(formFields.nrOfJobs.value).toEqual(params.l);
      expect(formFields.width.value).toEqual(params.w);
      expect(formFields.radius.value).toEqual(params.rad);
    });
  });

  describe('getScriptUrl', function() {
    it('should be able to return the correct scriptUrl', function() {
      jobWidget.loadFromUrl();
      var script = jobWidget._getScriptUrl();
      expect(script).toEqual(scriptUrl);
    });
  });

  describe('showTheCode', function() {
    beforeEach(function() {
      this.container = createDOMElement('div', {id: 'code', className: 'hidden'});
      this.codeBody  = createDOMElement('textarea', {id: 'code-body'});
      this.container.appendChild(this.codeBody);
      containerTestDiv.appendChild(this.container);
    });

    it('should start with hidden empty code-body. Then unhide and fill it with the correct code', function() {
      expect(this.container.className).toContain('hidden');
      expect(this.codeBody.value).toEqual('');
    });

    it('should unhide the textview and display the script code', function() {
      jobWidget.loadFromUrl();
      jobWidget.showTheCode();
      expect(this.container.className).not.toContain('hidden');
      expect(this.codeBody.value).toEqual('<script src="' + scriptUrl + '"></script>');
    });
  });

  testRemoveClassName('jobWidget', jobWidget, this.containerTestDiv);

 /**
  * Helper function to create a form that is the same as on the jobwidget page.
  */
  function createForm() {
    // Create the form elements
    var form = createDOMElement('form', {id: 'form'});
    formFields.search = createDOMElement('input', {id: 's'});
    formFields.place = createDOMElement('input', {id: 'p'});
    formFields.recruiter = createDOMElement('input', {id: 'r'});
    formFields.nrOfJobs = createDOMElement('input', {id: 'l'});
    formFields.width = createDOMElement('input', {id: 'w'});
    formFields.radius = createDOMElement('input', {id: 'rad', className: 'radius-selector btn distance'});

    // Append them to the form object
    form.appendChild(formFields.search);
    form.appendChild(formFields.place);
    form.appendChild(formFields.recruiter);
    form.appendChild(formFields.nrOfJobs);
    form.appendChild(formFields.width);
    form.appendChild(formFields.radius);

    // Place the form in the DOM
    containerTestDiv.appendChild(form);
  }
});
