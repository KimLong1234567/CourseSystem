import React from "react";
import { useForm } from "react-hook-form";
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
export default function RegisterHomepage({ course, imgPathDemo }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		toast.success("You have successfully registered for the course!");
		console.log(data);
	};

	return (
		<div id="contact" className="max-w-screen-xl mx-auto py-40">
			<div className="flex bg-white shadow-lg overflow-hidden h-full w-full rounded-lg">
				<div className="w-1/2 relative max-lg:hidden">
					<img
						src="https://plus.unsplash.com/premium_photo-1661410866488-f9c16c7c46aa?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
						className="w-full h-full object-cover"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-[#1C1E53]/60"></div>
					<div className="font-mono absolute top-20 left-20">
						<h1 className="text-4xl font-semibold text-white">
							Unlock Your Potential with Our Courses
						</h1>
						<p className="text-xl pr-32 pt-5 text-white leading-7">
							Start your learning journey with us and unlock your full
							potential.
						</p>
					</div>
				</div>
				<div className="w-1/2 p-8 bg-[#1C1E53] text-white max-lg:w-full ">
					<div className="py-7 px-5">
						<h2 className="text-5xl font-semibold">Let's start</h2>
						<p className="mt-4 font-normal text-white text-lg">
							Register now and start your learning journey!
						</p>
						<form onSubmit={handleSubmit(onSubmit)} className="mt-6" noValidate>
							<InputField
								id="name"
								type="text"
								label="Name"
								register={register}
								error={errors.name}
								placeholder="Enter your name"
							/>
							<InputField
								id="email"
								type="email"
								label="Email"
								register={register}
								error={errors.email}
								placeholder="Enter your email"
							/>
							<InputField
								id="phone"
								type="Number"
								label="Phone"
								register={register}
								error={errors.phone}
								placeholder="Enter your phone number"
							/>

							<button
								type="submit"
								className="w-full px-44 py-4 text-sm font-medium text-blue-900 bg-[#FCD980] rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 max-lg:px-10"
							>
								Register
							</button>
							<p className="mt-4 font-normal text-white text-lg text-center">
								Or phone: <a href="tel:0987654321">0987654321</a> to register
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
