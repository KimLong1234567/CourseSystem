import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../service/login";

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

function LogInPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "nguyenhakien99@gmail.com",
			password: "87f7f84649c7",
		},
	});

	const onSubmit = async (data) => {
		try {
			console.log(data);
			await login(data);
			navigate("/admin/users");
		} catch (error) {
			console.error("Error login:", error);
		}
	};

	return (
		<>
			<header></header>
			<main className="px-16 py-14 flex flex-col justify-center h-screen overflow-hidden max-lg:px-5 max-md:h-auto">
				<div className="items-center flex mb-11 space-x-2">
					<FontAwesomeIcon
						icon={faArrowLeft}
						className="text-gray-600 text-2xl"
					/>
					<Link
						to="/"
						className="text-gray-600 font-medium text-2xl hover:text-gray-800"
					>
						Homepage
					</Link>
				</div>
				<div className="flex bg-white shadow-lg overflow-hidden h-full w-full max-md:flex-col">
					<div className="w-1/2 relative max-md:w-full">
						<img
							src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=3062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-0 left-0 w-full h-full bg-[#1C1E53]/60"></div>
						<div className="font-mono absolute top-20 left-20 md:pl-0">
							<h1 className="text-[50px] font-semibold text-white">
								Course System
							</h1>
							<p className="mt-4 pl-5 text-xl max-w-[417px] text-white leading-7">
								Course management system for many companies with many features
								and modern technology.
							</p>
						</div>
					</div>
					<div className="w-1/2 p-8 bg-[#1C1E53] text-white max-md:w-full">
						<div className="pt-[75px] px-10 md:pt-4 max-lg:px-2">
							<h2 className="text-5xl font-semibold">Login</h2>
							<p className="mt-4 font-normal text-white text-lg">
								Prepare yourself for a starry future
							</p>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="mt-6"
								noValidate
							>
								<InputField
									id="username"
									type="email"
									label="Email"
									register={register}
									error={errors.email}
									placeholder="Enter your email"
								/>
								<InputField
									id="password"
									type="password"
									label="Password"
									register={register}
									error={errors.password}
									placeholder="Enter your password"
								/>
								<button
									type="submit"
									className="w-full px-44 py-4 text-sm font-medium text-blue-900 bg-[#FCD980] rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 max-xl:px-0"
								>
									LogIn
								</button>
							</form>
							<p className="mt-4 text-sm">
								{"Don't have account ?"}{" "}
								<Link
									to="/register"
									className="text-yellow-400 hover:underline"
								>
									Sign In
								</Link>
							</p>
							<p className="mt-4 text-sm">
								{"Forgot password ?"}{" "}
								<Link
									to="/teacher/resetPassword"
									className="text-yellow-400 hover:underline"
								>
									Reset Password
								</Link>
							</p>
						</div>
					</div>
				</div>
			</main>
			<footer></footer>
		</>
	);
}
export default LogInPage;
