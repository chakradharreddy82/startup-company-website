(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();
    // Back to top button
  $("#searchButton").on("click", async function () {
    const keyword = $("#searchInput").val().trim();
    const $results = $("#searchResults");
    $results.empty(); // Clear previous results

    if (!keyword) {
      alert("Please enter a search keyword.");
      return;
    }

    try {
      const response = await $.get(`${BASE_URL}/api/search`, { key: keyword });
 // Quotes
      if (Array.isArray(response?.quotes) && response?.quotes.length > 0) {
        response.quotes.forEach((item) => {
          $results.append(`
 <div class="card mb-3 shadow-sm"
    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p><strong>Email:</strong> ${item.email}</p>
      <p><strong>Service:</strong> ${item.service}</p>
      <p><strong>Message:</strong> ${item.message}</p>
      <small class="text-muted" style="color: rgba(255,255,255,0.5) !important;">
        Created At: ${new Date(item.createdAt).toLocaleString()}
      </small>
    </div>
  </div>
        `);
        });
      }

      // Contacts
      if (Array.isArray(response?.contacts) && response?.contacts.length > 0) {
        response.contacts.forEach((item) => {
          $results.append(`
 <div class="card mb-3 shadow-sm"
    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p><strong>Email:</strong> ${item.email}</p>
      <p><strong>Service:</strong> ${item.service}</p>
      <p><strong>Message:</strong> ${item.message}</p>
      <small class="text-muted" style="color: rgba(255,255,255,0.5) !important;">
        Created At: ${new Date(item.createdAt).toLocaleString()}
      </small>
    </div>
  </div>
        `);
        });
      }
    } catch (err) {
      console.error("Search API error:", err);
      alert("Something went wrong while searching.");
    }
  });

  $("#searchInput").on("keypress", function (e) {
    if (e.which === 13) {
      $("#searchButton").click(); // Trigger search
    }
  });
  // Contact Form Submission
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const name = $('input[placeholder="Your Name"]').val().trim();
    const email = $('input[placeholder="Your Email"]').val().trim();
    const subject = $('input[placeholder="Subject"]').val().trim();
    const message = $('textarea[placeholder="Message"]').val().trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    $.ajax({
      url: `${BASE_URL}/api/contact`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name, email, subject, message }),
      success: function (res) {
        alert("Message sent successfully!");
        $("#contactForm")[0].reset(); // Clear form
      },
      error: function (err) {
        alert("Failed to send message. Please try again.");
        console.error(err);
      },
    });
  });
  $("#quoteForm").on("submit", function (e) {
    e.preventDefault();

    const name = $('[name="name"]').val().trim();
    const email = $('[name="email"]').val().trim();
    const service = $('[name="service"]').val();
    const message = $('[name="message"]').val().trim();

    if (!name || !email || !service || !message || service === "") {
      alert("Please fill in all fields.");
      return;
    }

    $.ajax({
      url: `${BASE_URL}/api/quote`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name, email, service, message }),
      success: function (res) {
        alert("Message sent successfully!");
        $("#quoteForm")[0].reset();
      },
      error: function (err) {
        alert("Failed to send message. Please try again.");
        console.error(err);
      },
    });
  });

  //get my location
  $("#getLocationBtn").on("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // Open location in Google Maps
          window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
        },
        function (error) {
          alert("Unable to retrieve location. Please allow location access.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 45,
    dots: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 4,
      },
      768: {
        items: 6,
      },
      992: {
        items: 8,
      },
    },
  });
})(jQuery);
