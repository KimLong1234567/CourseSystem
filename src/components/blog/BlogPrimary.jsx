import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function BlogPrimary() {
	const dataBlogList = [
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
	];
	return (
		<div className="mt-32 flex gap-5">
			<section className="w-2/3 text-[#282938]">
				<figure>
					<img
						src="https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fHww"
						alt=""
						className="w-full h-[368px] object-cover rounded-lg"
					/>
				</figure>
				<span className=" text-base font-medium pt-8 block">19 Jan 2022</span>
				<h1 className=" text-2xl font-semibold mt-4">
					How to Become a Tech Expert at a Young Age with Minimal Capital
				</h1>
				<p className="text-lg font-normal opacity-70 mt-2">
					See how pivoting to Webflow changed one person’s sales strategy and
					allowed him to attract. See how pivoting to Webflow changed one
					person’s sales strategy
				</p>
				<a
					href="#!"
					className="flex items-center gap-2 mt-12 text-base font-medium "
				>
					Read More
					<FontAwesomeIcon icon={faArrowRight} />
				</a>
			</section>
			<ul className="w-1/3">
				{dataBlogList.map((post, index) => (
					<li
						key={index}
						className="flex justify-between rounded-lg  mb-4 hover:shadow-md"
					>
						<div className="w-72">
							<h2 className="text-[#282938] text-xl font-medium">
								{post.title}
							</h2>
							<span className="text-base font-medium pt-8 block opacity-70">
								{post.date}
							</span>
						</div>
						<figure>
							<img
								src={post.imageUrl}
								alt={post.title}
								className="w-[120px] h-[120px] object-cover rounded-lg"
							/>
						</figure>
					</li>
				))}
			</ul>
		</div>
	);
}

export default BlogPrimary;
