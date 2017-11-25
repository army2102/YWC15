var listOfCandidate;
var programmingCandidate;
var marketingCandidate;
var designCandidate;
var contentCandidate;
var searchList;

$.getJSON("https://ywc15.ywc.in.th/api/interview", data => {
  listOfCandidate = data;
  initInstance();
});

$(document).ready(function() {
  $(".scrollspy").scrollSpy();

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
    },
    {
      selector: '#section-homework"',
      offset: 0,
      callback: function(el) {
        Materialize.fadeInImage($(el));
      }
    }
  ];
  Materialize.scrollFire(options);

  $("#search").on("keyup", () => {
    var searchValue = $("#search").val();
    if (searchValue != ""){
      searchList = searchCandidate(listOfCandidate, "firstName", searchValue);
      getCandidateList(searchList);
    } else {
      getCandidateList(programmingCandidate);
    }
   
  });
});

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

function getCandidateList(candidateList) {
  $("#candidate-code-list").empty();
  $("#candidate-name-list").empty();
  $("#candidate-major-list").empty();

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
  Materialize.fadeInImage($("#candidate-code-list"));
  Materialize.fadeInImage($("#candidate-name-list"));
  Materialize.fadeInImage($("#candidate-major-list"));
  for (var i = 0; i < candidateList.length; i++) {
    $("#candidate-code-list").append(
      `<li class="collection-item">${candidateList[i].interviewRef}</li>`
    );
    $("#candidate-name-list").append(
      `<li class="collection-item">${candidateList[i].firstName} ${
        candidateList[i].lastName
      }</li>`
    );
    $("#candidate-major-list").append(
      `<li class="collection-item uppercase">${candidateList[i].major}</li>`
    );
  }
}

function searchCandidate(candidateList, searchKey, searchValue) {
  var search = JSON.search(
    candidateList,
    `//*[contains(${searchKey}, "${searchValue}")]`
  );
  return search;
}
