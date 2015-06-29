(function(UitzendbureauNLAPI) {
  var uitzendbureauNLAPI = new UitzendbureauNLAPI();

  var Recruiter = function() {}

  Recruiter.Cache = window.sessionStorage;

  Recruiter.getAll = function(done) {
    var recruiters = Recruiter.Cache.getItem('recruiters');
    if(recruiters) {
      return done(JSON.parse(recruiters));
    } else {
      return uitzendbureauNLAPI.getRecruiters(function(recruiters) {
        Recruiter.Cache.setItem('recruiters', JSON.stringify(recruiters));
        return done(recruiters);
      });
    }
  };


  window.Recruiter = Recruiter;
})(UitzendbureauNLAPI);
