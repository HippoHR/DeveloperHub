(function(UitzendbureauNLAPI) {
  var uitzendbureauNLAPI = new UitzendbureauNLAPI();

  var Branches = function() {}

  Branches.getAll = function(recruiter, done) {
      return uitzendbureauNLAPI.getBranches(recruiter, function(branches) {
        return done(branches);
      });
  };
  window.Branches = Branches;
})(UitzendbureauNLAPI);
