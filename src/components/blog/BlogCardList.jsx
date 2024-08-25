import React, { useState, useEffect, useMemo } from "react";

function BlogCardList() {
	const blogsPerPage = 3;

	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const blogData = useMemo(
		() => [
			{
				title: "How to build a responsive website from scratch",
				date: "15 March 2023",
				imageUrl:
					"https://images.unsplash.com/photo-1501556466850-7c9fa1fccb4c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y291cnNlfGVufDB8fDB8fHww",
			},
			{
				title: "10 Tips for Improving Your Website's SEO",
				date: "22 April 2023",
				imageUrl:
					"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VvfGVufDB8fDB8fHw&h=300",
			},
			{
				title: "Understanding the Basics of Web Hosting",
				date: "30 May 2023",
				imageUrl:
					"https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cnNlfGVufDB8fDB8fHww",
			},
			{
				title: "Easy to create a website without coding",
				date: "1 February 2022",
				imageUrl:
					"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHwww",
			},
		],
		[]
	);

	useEffect(() => {
		if (blogData && blogData.length > 0) {
			setLoading(false);
		}
	}, [blogData]);

	const indexOfLastBlog = currentPage * blogsPerPage;
	const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
	const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
	const totalPages = Math.ceil(blogData.length / blogsPerPage);

	const imgPathDemo =
		"https://plus.unsplash.com/premium_photo-1661596686441-611034b8077e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	return (
		<>
			{loading ? (
				<div className="flex flex-col justify-center items-center pt-10">
					<p className="text-lg font-medium pt-4">Loading .....</p>
				</div>
			) : (
				<>
					<div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{currentBlogs.map((blog, index) => (
							<div key={index} className="w-full shadow-lg rounded-sm">
								<div className="w-full rounded-t-lg">
									<img
										className="w-full h-52 object-cover rounded-t-lg"
										src={blog.imageUrl ? blog.imageUrl : imgPathDemo}
										alt={blog.title}
									/>
								</div>
								<div className="px-4 py-4">
									<p className="text-sm text-gray-600">{blog.date}</p>
									<h2 className="text-xl font-semibold text-gray-800 mt-2">
										{blog.title}
									</h2>
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-center items-center space-x-2">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-yellow-300"
						>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(page, index) => (
								<button
									key={index}
									onClick={() => setCurrentPage(page)}
									className={`px-4 py-2 rounded-sm ${
										page === currentPage
											? "bg-[#FCD980] text-[#282938]"
											: "bg-gray-200 hover:bg-yellow-300"
									}`}
								>
									{page}
								</button>
							)
						)}
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-yellow-300"
						>
							Next
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default BlogCardList;
