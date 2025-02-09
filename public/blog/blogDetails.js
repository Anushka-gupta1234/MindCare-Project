// async function fetchBlogDetails() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const blogId = urlParams.get("id");

//     if (!blogId) {
//         document.body.innerHTML = "<h2>Blog not found.</h2>";
//         return;
//     }

    
//     try {
//         const response = await fetch(`/MindCare/writeblog/${blogId}`);
//         const blog = await response.json();

//         document.getElementById("blog-title").textContent = blog.title;
//         document.getElementById("blog-content").textContent = blog.content;
//         document.getElementById("blog-author").textContent = blog.author || "Unknown";
        

//     } catch (error) {
//         console.error("Error fetching blog details:", error);
//         document.body.innerHTML = "<h2>Error loading blog.</h2>";
//     }
// }

// // Load blog details when the page loads
// document.addEventListener("DOMContentLoaded", fetchBlogDetails);


async function fetchBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (!blogId) {
        document.body.innerHTML = "<h2>Blog not found.</h2>";
        return;
    }

    try {
        const response = await fetch(`/MindCare/writeblog/${blogId}`);
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
