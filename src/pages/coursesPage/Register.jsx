import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleExclamation,
	faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { createStudent } from "../../service/student";
import { toast } from "react-toastify";

function InputField({ id, type, label, register, error, placeholder }) {
	return (
		<div className="mb-4">
			<input
				type={type}
				id={id}
				{...register(id, { required: `${label} is required` })}
				className="w-full px-8 py-4 mt-2 bg-transparent text-[#F4F6FC] text-lg border-[1px] border-[#FFFFFF1A] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
				placeholder={placeholder}
			/>
			{error && <span className="text-red-500 text-sm">{error.message}</span>}
		</div>
	);
}

export default function Register() {
	const location = useLocation();
	const navigate = useNavigate();
	const { course } = location.state || {};
	console.log(course);
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const courseData = {
			id_course: course.id,
			...data,
		};
		createStudent(courseData);
		navigate("/RegisterSuccess", { state: { courseData } });
		toast.success("Register successfully!");
	};

	const imgPathDemo =
		"https://plus.unsplash.com/premium_photo-1661596686441-611034b8077e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	return (
		<>
			<main className="px-16 py-10 flex flex-col justify-center min-h-screen max-h-[1100px] overflow-hidden">
				<div className="flex bg-white shadow-lg overflow-hidden h-full w-full">
					<div className="w-2/3 relative">
						<img
							src={course.image === null ? imgPathDemo : course.image}
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-0 left-0 w-full h-full bg-[#1C1E53]/60"></div>
						<div className="font-mono absolute top-20 left-20">
							<h1 className="text-4xl font-semibold text-white py-6">
								<FontAwesomeIcon icon={faBullseye} /> CATEGORY:{" "}
								{course.category.name}
							</h1>
							<p></p>
							<h2 className="text-3xl font-semibold text-white">
								COURSES: {course.name}
							</h2>
							<p className="mt-4 pl-5 pr-28 text-xl text-white leading-7">
								{course.description}
							</p>
							<p className="mt-4 pl-5 pr-28 text-xl text-white leading-7 font-bold">
								Start: {course.startDate} - End: {course.endDate}
							</p>
							<h2 className="text-3xl font-semibold text-white pt-6">
								INFORMATION OF COMPANY:
							</h2>
							<p className="mt-4 pl-5 pr-28 text-xl text-white leading-7">
								Name: {course.company.name}
							</p>
							<p className="mt-4 pl-5 pr-28 text-xl text-white leading-7">
								Address: {course.company.address}
							</p>
							<p className="mt-4 pl-5 pr-28 text-xl text-white leading-7">
								Phone: {course.company.phone} - Email: {course.company.email}
							</p>
							<div className="flex flex-col justify-between mt-10">
								<h3 className="flex items-center gap-3 text-2xl text-white leading-7 font-bold">
									<FontAwesomeIcon icon={faCircleExclamation} />
									Note:
								</h3>
								<ul>
									<li className="mt-4 pl-10 pr-28 text-xl text-white leading-7">
										You will be able to access the course after the teacher
										approves your request.
									</li>
									<li className="mt-4 pl-10 pr-28 text-xl text-white leading-7">
										Be sure to complete all prerequisites before starting the
										course.
									</li>
									<li className="mt-4 pl-10 pr-28 text-xl text-white leading-7">
										Keep track of the course schedule for any important updates.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="w-1/3 p-8 bg-[#1C1E53] text-white">
						<div className="pt-[75px] px-5">
							<h2 className="text-5xl font-semibold">Register Courses</h2>
							<p className="mt-4 font-normal text-white text-lg">
								Let's join the community and get access to the latest courses
							</p>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="mt-6"
								noValidate
							>
								<InputField
									id="stu_name"
									type="text"
									label="Name"
									register={register}
									error={errors.stu_name}
									placeholder="Enter your name"
								/>
								<div className="mb-4">
									<select
										name="stu_gender"
										id="stu_gender"
										{...register("stu_gender", {
											required: "Gender is required",
										})}
										className="w-full px-8 py-4 mt-2 bg-transparent text-[#F4F6FC] text-lg border-[1px] border-[#FFFFFF1A] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg placeholder-gray-500"
									>
										<option value="" className="text-gray-500">
											Select Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
									{errors.stu_gender && (
										<span className="text-red-500 text-sm">
											{errors.stu_gender.message}
										</span>
									)}
								</div>

								<div className="mb-4">
									<input
										type="date"
										id="stu_birthday"
										{...register("stu_birthday", {
											required: "Birthday is required",
										})}
										className="w-full px-8 py-4 mt-2 bg-transparent text-[#F4F6FC] text-lg border-[1px] border-[#FFFFFF1A] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
										style={{ colorScheme: "dark" }}
									/>
									{errors.stu_birthday && (
										<span className="text-red-500 text-sm">
											{errors.stu_birthday.message}
										</span>
									)}
								</div>

								<InputField
									id="stu_email"
									type="email"
									label="Email"
									register={register}
									error={errors.stu_email}
									placeholder="Enter your email"
								/>
								<InputField
									id="stu_phone"
									type="tel"
									label="Phone"
									register={register}
									error={errors.stu_phone}
									placeholder="Enter your phone number"
								/>
								<InputField
									id="stu_address"
									type="text"
									label="Address"
									register={register}
									error={errors.stu_address}
									placeholder="Enter your address"
								/>
								<button
									type="submit"
									className="w-full px-44 py-4 text-sm font-medium text-blue-900 bg-[#FCD980] rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
