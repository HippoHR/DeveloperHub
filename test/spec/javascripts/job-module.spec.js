describe('job-module', function() {

  var jobModuleForm, URI;
  var recruiterId = '515';

  beforeEach(function() {
    URI = createURI();
    jobModuleForm = new JobModuleForm(URI);
  });

  it('should get the recruiter out of the url', function() {
    jobModuleForm.loadFromUrl();
    expect(jobModuleForm.recruiter).toEqual(recruiterId);
  });

  it('should get an empty variabele recruiter when the recruiterId is not given in the url', function() {
    URI.parseQuery = function() {
      return {otherparameter: 'test'};
    };
    jobModuleForm.loadFromUrl();
    expect(jobModuleForm.recruiter).toEqual('');
  });

  it('should fill the form of step one with the recruiter', function() {
    var select = createDOMElement('select', {id: 'r'});
    document.body.appendChild(select);
    var option = createDOMElement('option', {value: recruiterId});
    select.appendChild(option);
    jobModuleForm.loadFromUrl();
    jobModuleForm.fillTheFormStepOne();
    expect(select.value).toEqual(recruiterId);
    document.body.removeChild(select);
  });

  it('should show the code for the job module', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    document.body.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body', value: ''});
    div.appendChild(textarea);
    jobModuleForm.showTheCode();
    expect(textarea.value).toEqual(jobModuleForm._getTheCode());
    document.body.removeChild(div);
  });

  it('should show the example for the job module', function() {
    var div = createDOMElement('div', {id: 'example', className: 'hidden'});
    document.body.appendChild(div);
    var examplebody = createDOMElement('div', {'id': 'example-body', value: ''});
    div.appendChild(examplebody);
    jobModuleForm.showTheExample();
    expect(examplebody.innerHTML).not.toEqual('');
    document.body.removeChild(div);
  });

  function createURI() {
    var URI = {};
    URI.parseQuery = function() {
      return {r: recruiterId};
    };
    return URI;
  }
});
