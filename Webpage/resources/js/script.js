var listOfCandidate;
var programmingCandidate;
var marketingCandidate;
var designCandidate;
var contentCandidate;
var searchList;

// Load data from API
$.getJSON("https://ywc15.ywc.in.th/api/interview", data => {
  listOfCandidate = data;
  initInstance();
});

// Set animation & search
$(document).ready(function() {
  // Activate scrollSpy
  $(".scrollspy").scrollSpy();

  // Activate fadeIn anim
  var options = [
    {
      selector: "#section-announce",
      offset: 0,
      callback: function(el) {
        Materialize.fadeInImage($(el));
      }
    },
    {
      selector: "#section-interviewer-list",
      offset: 0,
      callback: function(el) {
        Materialize.fadeInImage($(el));
      }
    }
  ];
  Materialize.scrollFire(options);

  // Search candidate list
  $("#search").on("keyup", () => {
    var searchValue = $("#search").val();
    if (searchValue != "") {
      searchList = searchCandidate(listOfCandidate, "firstName", searchValue);
      getCandidateList(searchList);
    } else {
      getCandidateList(programmingCandidate);
    }
  });
});

// default setting when refresh page
function initInstance() {
  programmingCandidate = searchCandidate(
    listOfCandidate,
    "major",
    "programming"
  );
  marketingCandidate = searchCandidate(listOfCandidate, "major", "marketing");
  designCandidate = searchCandidate(listOfCandidate, "major", "design");
  contentCandidate = searchCandidate(listOfCandidate, "major", "content");

  major = "programming";
  getCandidateList(programmingCandidate);
}

// fucntion: show candidate list
function getCandidateList(candidateList) {
  // Add fadeIn animation
  Materialize.fadeInImage($("#candidate-code-list"));
  Materialize.fadeInImage($("#candidate-name-list"));
  Materialize.fadeInImage($("#candidate-major-list"));
  // Clear element
  $("#candidate-code-list").empty();
  $("#candidate-name-list").empty();
  $("#candidate-major-list").empty();

  // Sort object by
  candidateList.sort(function(a, b) {
    var x = a.interviewRef.toLowerCase();
    var y = b.interviewRef.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < candidateList.length; i++) {
    $("#candidate-code-list").append(
      `<li class="collection-item ">${candidateList[i].interviewRef}</li>`
    );
    $("#candidate-name-list").append(
      `<li class="collection-item ">${candidateList[i].firstName} ${
        candidateList[i].lastName
      }</li>`
    );
    $("#candidate-major-list").append(
      `<li class="collection-item uppercase ">${candidateList[i].major}</li>`
    );
  }
}

// fucntion: search candidate list
function searchCandidate(candidateList, searchKey, searchValue) {
  var search = JSON.search(
    candidateList,
    `//*[contains(${searchKey}, "${searchValue}")]`
  );
  return search;
}
