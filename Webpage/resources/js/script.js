var listOfCandidate;

$.getJSON("https://ywc15.ywc.in.th/api/interview", data => {
  listOfCandidate = data;
  window.getCandidateList("programming");
  console.log(listOfCandidate.length);
});

$(document).ready(function() {
  $("#programming").click(function() {
    window.getCandidateList("programming");
  });

  $("#marketing").click(function() {
    window.getCandidateList("marketing");
  });

  $("#design").click(function() {
    window.getCandidateList("design");
  });

  $("#content").click(function() {
    window.getCandidateList("content");
  });

  $("#search").on
});

function getCandidateList(major = "programming") {
  $("#candidate-list").empty();
  for (var i = 0; i < listOfCandidate.length; i++) {
    if (listOfCandidate[i].major === major) {
      $("#candidate-list").append(
        '<li class="collection-item">' +
          listOfCandidate[i].interviewRef +
          " " +
          listOfCandidate[i].firstName +
          " " +
          listOfCandidate[i].lastName +
          "</li>"
      );  
    }
  }
}
