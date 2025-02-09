document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const author = document.getElementById("author-name").value.trim();
        const email = document.getElementById("author-email").value.trim();
        const title = document.getElementById("blog-title").value.trim();
        const content = document.getElementById("blog-content").value.trim();

        // Debugging - Log the values
        console.log("📩 Sending Blog Data:", { author, email, title, content });

        if (!author || !email || !title || !content) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch("/MindCare/writeblog/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ author, email, title, content })
            });

            const data = await response.json();
            console.log("✅ Server Response:", data);

            if (response.ok) {
                alert("🎉 Blog published successfully!");
                window.location.href = "/MindCare/blog/readblog.html"; // Redirect to the blog list
            } else {
                alert(`❌ Error: ${data.message || "Failed to publish blog."}`);
            }
        } catch (error) {
            console.error("❌ Error submitting blog:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
