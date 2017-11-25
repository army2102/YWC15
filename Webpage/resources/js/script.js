var listOfCandidate;
var programmingCandidate;
var marketingCandidate;
var designCandidate;
var contentCandidate;
var searchList;
var major;

$.getJSON("https://ywc15.ywc.in.th/api/interview", data => {
  listOfCandidate = data;
  if (data != null) {
    initInstance();
    major = "programming";
    getCandidateList(programmingCandidate);
    console.log(listOfCandidate.length);
  }
});

$(document).ready(function() {
  $("#programming").click(function() {
    major = "programming";
    getCandidateList(programmingCandidate);
  });

  $("#marketing").click(function() {
    major = "marketing";
    getCandidateList(marketingCandidate);
  });

  $("#design").click(function() {
    major = "design";
    getCandidateList(designCandidate);
  });

  $("#content").click(function() {
    major = "design";
    getCandidateList(contentCandidate);
  });

  $("#search").on("keyup", () => {
    var searchValue = $("#search").val();
    if (searchValue != "") {
      switch (major) {
        case "programming":
          searchList = searchCandidate(
            programmingCandidate,
            "firstName",
            searchValue
          );
          break;
        case "marketing":
          searchList = searchCandidate(
            marketingCandidate,
            "firstName",
            searchValue
          );
          break;
        case "design":
          searchList = searchCandidate(
            designCandidate,
            "firstName",
            searchValue
          );
          break;
        case "content":
          searchList = searchCandidate(
            contentCandidate,
            "firstName",
            searchValue
          );
          break;
      }
      getCandidateList(searchList);
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
}
function getCandidateList(candidateList) {
  $("#candidate-list").empty();
  candidateList.sort(function(a, b){
    var x = a.interviewRef.toLowerCase();
    var y = b.interviewRef.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
  for (var i = 0; i < candidateList.length; i++) {
    $("#candidate-list").append(
      '<li class="collection-item">' +
        candidateList[i].interviewRef +
        " " +
        candidateList[i].firstName +
        " " +
        candidateList[i].lastName +
        "</li>"
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
