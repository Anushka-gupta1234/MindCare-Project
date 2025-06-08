async function fetchBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (!blogId) {
        document.body.innerHTML = "<h2>Blog not found.</h2>";
        return;
    }

    try {
        // const API_BASE_URL = "https://mindcare-tjew.onrender.com";
        const response = await fetch(`${window.location.origin}/MindCare/writeblog/${blogId}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        const blog = await response.json();

        if (!blog || response.status !== 200) {
            document.body.innerHTML = "<h2>Blog not found.</h2>";
            return;
        }

        // ✅ Format and display blog details
        document.title = blog.title;
        document.getElementById("blog-title").textContent = blog.title;
        document.getElementById("blog-author").textContent = blog.author || "Unknown";

        // ✅ Preserve spaces and line breaks
        document.getElementById("blog-content").innerHTML = blog.content.replace(/\n/g, "<br>");

    } catch (error) {
        console.error("Error fetching blog details:", error);
        document.body.innerHTML = "<h2>Error loading blog.</h2>";
    }
}

// Load blog details when the page loads
document.addEventListener("DOMContentLoaded", fetchBlogDetails);
