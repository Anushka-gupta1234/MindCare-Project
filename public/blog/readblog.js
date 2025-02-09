
let blogs = []; // Store fetched blogs globally

// Fetch all blogs from API
async function fetchBlogs() {
    try {
        const response = await fetch("http://localhost:3000/MindCare/writeblog/all"); // Adjusted API endpoint
        blogs = await response.json(); // Store blogs globally

        displayBlogs(blogs); // Display all blogs initially
    } catch (error) {
        console.error("Error fetching blogs:", error);
        document.querySelector(".blog-container").innerHTML = "<p>Error loading blogs.</p>";
    }
}

// Function to display blogs dynamically
function displayBlogs(blogList) {
    const blogContainer = document.querySelector(".blog-container");
    blogContainer.innerHTML = ""; // Clear previous results

    if (blogList.length === 0) {
        blogContainer.innerHTML = "<p>No matching blogs found.</p>";
        return;
    }

    // Dynamically create blog cards
    blogList.forEach(blog => {
        const blogElement = document.createElement("div");
        blogElement.classList.add("blog-card");

        blogElement.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content.substring(0, 100)}...</p> <!-- Show only first 100 chars -->
            <a href="blogdetails.html?id=${blog._id}" class="read-more">Read More →</a>
        `;

        blogContainer.appendChild(blogElement);
    });
}

// Function to filter blogs based on search input
function filterBlogs() {
    const searchText = document.getElementById("searchBar").value.toLowerCase().trim();

    if (searchText === "") {
        // If search bar is empty, show all blogs
        displayBlogs(blogs);
    } else {
        // Filter blogs based on title or author
        const filteredBlogs = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchText) ||
            (blog.author && blog.author.toLowerCase().includes(searchText))
        );

        displayBlogs(filteredBlogs);
    }
}

// Attach search function to input field
document.getElementById("searchBar").addEventListener("input", filterBlogs);

// Load blogs when the page loads
document.addEventListener("DOMContentLoaded", fetchBlogs);
