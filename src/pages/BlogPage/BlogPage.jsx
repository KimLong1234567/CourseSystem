import React from "react";
import BlogPrimary from "../../components/blog/BlogPrimary";
import BlogCardList from "../../components/blog/BlogCardList";

export default function BlogPage() {
	const sampleBlogs = [
		{
			id: 1,
			title: "Cara Mudah Untuk Memulai Belajar Programming",
			date: "19 Jan 2022",
			imageUrl:
				"https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdXJzZSUyMGNsYXNzfGVufDB8fDB8fHww",
		},
		{
			id: 2,
			title: "Tips Membuat Website Landing Page Bussines",
			date: "19 Jan 2022",
			imageUrl:
				"https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvdXJzZSUyMGNsYXNzfGVufDB8fDB8fHww",
		},
		{
			id: 3,
			title: "Cara Installasi Wordpress Untuk Pemula",
			date: "19 Jan 2022",
			imageUrl:
				"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvdXJzZSUyMGNsYXNzfGVufDB8fDB8fHww",
		},
	];

	return (
		<main className="max-w-screen-xl mx-auto px-4 sm:px-12 py-7">
			<SearchCourse />
			{/* blog */}
			<BlogPrimary />
			{/* Blog list card */}
			<div className="App">
				<BlogCardList blogData={sampleBlogs} blogsPerPage={3} />
			</div>
		</main>
	);
}

function SearchCourse() {
	const dataCategoryBlog = [
		"Tips & Tricks",
		"Event",
		"News",
		"Soft Skill",
		"Tech",
		"Design",
	];
	return (
		<div className="pt-10 w-full flex items-center justify-center flex-col gap-12">
			<input
				className="py-4 px-10 min-w-[746px] rounded-lg border-[1.5px] border-[#28293899A]"
				type="text"
				placeholder="Searching ...."
			/>
			<ul className="flex justify-center items-center gap-10 text-[#282938] text-lg">
				{dataCategoryBlog.map((category) => (
					<li key={category} className="px-2 text-sm">
						<a
							href="/blogPage"
							className="text-gray-500 border-white hover:text-[#2405F2]"
						>
							{category}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
