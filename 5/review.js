var $review = $("#review-list");
var $adminReview = $("#admin-review-list");
var $reviewForm = $(".review-form");

function buildReviewList() {
  $review.children().remove();

  $.ajax({
    url: "http://localhost:3000/review",
    dataType: "json",
    success: function(review) {
      review.forEach(function(item) {
        if (item.approved == "true") {
          var $li = $("<li/>");
          var $div = $("<div/>", {
            text: item.name,
            class: "review-item name"
          });
          $li.append($div);
          $div = $("<div/>", {
            text: item.text,
            class: "review-item"
          });

          $li.append($div);
          $review.append($li);
        }
      });
    }
  });
}

function buildAdminReviewList() {
  $adminReview.children().remove();

  $.ajax({
    url: "http://localhost:3000/review",
    dataType: "json",
    success: function(review) {
      review.forEach(function(item) {
        var $li = $("<li/>");
        var $div = $("<div/>", {
          text: item.name,
          class: "review-item name"
        });
        $li.append($div);
        var $div = $("<div/>", {
            text: item.text,
            class: "review-item"
        });

        var $approveButton = $("<button/>", {
            text: "Одобрить",
            class: "approve button"
        }).data(item);

        var $deleteButton = $("<button/>", {
            text: "Удалить",
            class: "delete button"
        }).data(item);

        $li.append($div);
        $li.append($approveButton);
        $li.append($deleteButton);
        $adminReview.append($li);
      });
    }
  });
}

(function($) {
  buildReviewList();
  buildAdminReviewList();

  $reviewForm.on("click", "#review-add", function () {
    var newReview = {};
    newReview.text = $("#review-text").val().replace(/\r?\n/g, "\r\n");
    newReview.name = $("#user-name").val();
    newReview.approved = false;

    $.ajax({
      url: "http://localhost:3000/review",
      type: "POST",
      dataType:"json",
      data: newReview,
      success: function() {
        buildReviewList();
        buildAdminReviewList();
      }
    });
  });

  $adminReview.on("click", ".approve", function() {
    var reviewItem = $(this).data();

    $.ajax({
      url: "http://localhost:3000/review/" + reviewItem.id,
      type: "PATCH",
      dataType: "json",
      data: {approved: true},
      success: function() {
        buildReviewList();
      }
    });
  });

  $adminReview.on("click", ".delete", function() {
    var reviewItem = $(this).data();

    $.ajax({
      url: "http://localhost:3000/review/" + reviewItem.id,
      type: "DELETE",
      success: function() {
        buildReviewList();
        buildAdminReviewList();
      }
    })
  });
})(jQuery);
